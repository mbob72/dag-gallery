# Art Gallery Tailwind

React/TypeScript-декомпозиция главной страницы ArtPosterGallery на адаптивные Tailwind-компоненты.

## Запуск

```bash
npm install
npm run dev
```

## Отправка запросов из корзины

Кнопка «Послать запрос» отправляет данные на серверный обработчик `/api/order-request`, а сервер отправляет письмо через Resend.

Создайте `.env.local` по примеру `.env.example`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ORDER_REQUEST_FROM="Art Gallery <orders@example.com>"
```

`ORDER_REQUEST_FROM` должен быть адресом с домена, подтвержденного в Resend.
Письма с запросами отправляются на `ptichkasinichka@ya.ru` и `mbob72@gmail.com`.

## Структура

- `src/components/Header.tsx` — desktop/mobile header, поиск, каталог и dropdown-меню.
- `src/components/Hero.tsx` — простой hero-слайдер без сторонней библиотеки.
- `src/components/Sections.tsx` — преимущества, категории, image/text-секции, masonry-like grid, баннер и footer.
- `src/data/content.ts` — все данные и URL изображений вынесены из JSX.
- `src/styles.css` — только базовые глобальные стили; сетка и оформление сделаны Tailwind-классами.

## Важно

Сейчас изображения загружаются с `https://artpostergallery.ru`. Для production лучше скачать их в собственное хранилище или подключить CMS и заменить массивы в `src/data/content.ts` данными API.
