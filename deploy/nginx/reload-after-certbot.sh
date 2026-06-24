#!/usr/bin/env sh
set -eu

APP_DIR="${APP_DIR:-/opt/dag-gallery}"

cd "$APP_DIR"
docker compose -f docker-compose.yml -f docker-compose.edge.yml exec -T nginx nginx -s reload >/dev/null 2>&1
