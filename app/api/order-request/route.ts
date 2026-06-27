import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { artworks, canOrderArtwork, type ArtworkItem } from '../../../src/data/artworks';

type CartItemInput = {
  id: string;
  quantity: number;
};

type ContactDetails = {
  phone: string;
  email: string;
  telegram: string;
};

const artworkById = new Map(artworks.map((artwork) => [artwork.id, artwork]));
const orderRequestRecipients = ['ptichkasinichka@ya.ru', 'mbob72@gmail.com'];
const orderRequestOrigin = 'https://kavkazart.ru';

function trimString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeCartItems(value: unknown): CartItemInput[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const seenIds = new Set<string>();

  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') {
      return [];
    }

    const id = 'id' in item ? item.id : undefined;

    if (typeof id !== 'string' || !id || seenIds.has(id)) {
      return [];
    }

    seenIds.add(id);

    return {
      id,
      quantity: 1,
    };
  });
}

function formatPrice(value: number | null) {
  return value ? `${new Intl.NumberFormat('ru-RU').format(value)} ₽` : 'по запросу';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildArtworkUrl(origin: string, artwork: ArtworkItem) {
  return `${origin}/poster/${encodeURIComponent(artwork.id)}`;
}

function buildEmail({
  contact,
  items,
  origin,
}: {
  contact: ContactDetails;
  items: ArtworkItem[];
  origin: string;
}) {
  const totalRub = items.reduce((sum, artwork) => sum + (artwork.price_rub ?? 0), 0);
  const totalText = `${new Intl.NumberFormat('ru-RU').format(totalRub)} ₽`;
  const contactLines = [
    contact.phone && `Телефон: ${contact.phone}`,
    contact.email && `Email: ${contact.email}`,
    contact.telegram && `Telegram: ${contact.telegram}`,
  ].filter(Boolean);
  const itemTextLines = items.map((artwork, index) => [
    `${index + 1}. ${artwork.title}`,
    `Артикул: ${artwork.source_id}`,
    artwork.dimensions && `Размер: ${artwork.dimensions}`,
    artwork.medium && `Материал: ${artwork.medium}`,
    `Цена: ${formatPrice(artwork.price_rub)}`,
    `Ссылка: ${buildArtworkUrl(origin, artwork)}`,
  ].filter(Boolean).join('\n'));
  const itemHtml = items.map((artwork) => `
    <li>
      <strong>${escapeHtml(artwork.title)}</strong><br />
      Артикул: ${escapeHtml(artwork.source_id)}<br />
      ${artwork.dimensions ? `Размер: ${escapeHtml(artwork.dimensions)}<br />` : ''}
      ${artwork.medium ? `Материал: ${escapeHtml(artwork.medium)}<br />` : ''}
      Цена: ${escapeHtml(formatPrice(artwork.price_rub))}<br />
      <a href="${escapeHtml(buildArtworkUrl(origin, artwork))}">Открыть работу</a>
    </li>
  `).join('');

  return {
    subject: `Новый запрос из корзины: ${items.length} шт.`,
    text: [
      'Новый запрос из корзины',
      '',
      'Контакты:',
      ...contactLines,
      '',
      'Работы:',
      ...itemTextLines,
      '',
      `Итого: ${totalText}`,
    ].join('\n'),
    html: `
      <h1>Новый запрос из корзины</h1>
      <h2>Контакты</h2>
      <ul>${contactLines.map((line) => `<li>${escapeHtml(line)}</li>`).join('')}</ul>
      <h2>Работы</h2>
      <ol>${itemHtml}</ol>
      <p><strong>Итого:</strong> ${escapeHtml(totalText)}</p>
    `,
  };
}

async function sendEmail({
  to,
  from,
  replyTo,
  subject,
  html,
  text,
}: {
  to: string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text,
    replyTo: replyTo || undefined,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ message: 'Некорректный запрос.' }, { status: 400 });
  }

  const contact: ContactDetails = {
    phone: trimString('phone' in body ? body.phone : undefined),
    email: trimString('email' in body ? body.email : undefined),
    telegram: trimString('telegram' in body ? body.telegram : undefined),
  };

  if (!contact.phone && !contact.email && !contact.telegram) {
    return NextResponse.json({ message: 'Укажите телефон, электронную почту или Телеграм.' }, { status: 400 });
  }

  const cartItems = normalizeCartItems('items' in body ? body.items : undefined);
  const requestedArtworks = cartItems
    .map((item) => artworkById.get(item.id))
    .filter((artwork): artwork is ArtworkItem => Boolean(artwork))
    .filter(canOrderArtwork);

  if (requestedArtworks.length === 0) {
    return NextResponse.json({ message: 'В корзине нет работ для запроса.' }, { status: 400 });
  }

  const from = process.env.ORDER_REQUEST_FROM;

  if (!from) {
    return NextResponse.json({ message: 'Отправка писем не настроена на сервере.' }, { status: 500 });
  }

  const email = buildEmail({ contact, items: requestedArtworks, origin: orderRequestOrigin });

  try {
    await sendEmail({
      to: orderRequestRecipients,
      from,
      replyTo: contact.email || undefined,
      ...email,
    });
  } catch (error) {
    console.error('Order request email failed', error);
    return NextResponse.json({ message: 'Не удалось отправить письмо. Попробуйте позже.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
