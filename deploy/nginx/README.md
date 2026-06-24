# Edge nginx

This compose layer runs nginx in front of the Next.js app container.

The app can still be deployed independently:

```sh
docker compose pull app
docker compose up -d --no-deps app
```

nginx only needs to be started or reloaded when its config or TLS certificates change.

## DNS

Point all hostnames directly to the Timeweb server IP:

```text
kavkazart.ru       A  72.56.14.98
www.kavkazart.ru   A  72.56.14.98
kavkazart.com      A  72.56.14.98
www.kavkazart.com  A  72.56.14.98
```

If Cloudflare is used only for DNS, keep these records in `DNS only` mode.

## Certificates

The nginx config expects two certificates:

```text
/etc/letsencrypt/live/kavkazart.ru
/etc/letsencrypt/live/kavkazart.com
```

Issue them if they do not already exist:

```sh
sudo mkdir -p /var/www/certbot
sudo certbot certonly --standalone \
  --cert-name kavkazart.ru \
  -d kavkazart.ru \
  -d www.kavkazart.ru

sudo certbot certonly --standalone \
  --cert-name kavkazart.com \
  -d kavkazart.com \
  -d www.kavkazart.com
```

If host nginx is already running on ports 80/443, stop it before issuing the
first standalone certificate:

```sh
sudo systemctl stop nginx
sudo systemctl disable nginx
```

## Start edge nginx

From the deploy directory, for example `/opt/dag-gallery`:

```sh
docker compose -f docker-compose.yml -f docker-compose.edge.yml up -d app nginx
```

The containers already have `restart: unless-stopped`, so Docker will normally
bring them back after a server reboot. To make startup explicit through systemd,
install the unit:

```sh
sudo install -m 644 deploy/systemd/dag-gallery.service /etc/systemd/system/dag-gallery.service
sudo systemctl daemon-reload
sudo systemctl enable dag-gallery.service
sudo systemctl start dag-gallery.service
```

Check it:

```sh
sudo systemctl status dag-gallery.service
docker compose -f docker-compose.yml -f docker-compose.edge.yml ps
```

The systemd unit uses `--pull never`; deploys are still responsible for pulling
new app images, while reboot startup only starts the image that is already on
the server.

## Switch renewal to webroot

After the nginx container is running, switch the certificate renewal to webroot.
This intentionally renews the certificate once so future automatic renewals use
the webroot served by nginx instead of standalone port binding:

```sh
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  --cert-name kavkazart.ru \
  --force-renewal \
  -d kavkazart.ru \
  -d www.kavkazart.ru

sudo certbot certonly --webroot \
  -w /var/www/certbot \
  --cert-name kavkazart.com \
  --force-renewal \
  -d kavkazart.com \
  -d www.kavkazart.com
```

Install the deploy hook:

```sh
sudo install -m 755 deploy/nginx/reload-after-certbot.sh \
  /etc/letsencrypt/renewal-hooks/deploy/reload-dag-gallery-nginx.sh
```

Test renewal:

```sh
sudo certbot renew --dry-run --no-random-sleep-on-renew --cert-name kavkazart.ru
sudo certbot renew --dry-run --no-random-sleep-on-renew --cert-name kavkazart.com
```

## Check

```sh
curl -I https://kavkazart.ru/
curl -I https://www.kavkazart.ru/test
curl -I https://kavkazart.com/test
curl -I https://www.kavkazart.com/test
```

Expected redirects:

```text
www.kavkazart.ru/*  -> https://kavkazart.ru/*
kavkazart.com/*     -> https://kavkazart.ru/*
www.kavkazart.com/* -> https://kavkazart.ru/*
```
