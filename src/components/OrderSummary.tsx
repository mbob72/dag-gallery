'use client';

import { useState, type FormEvent } from 'react';
import type { CartEntry } from '../data/cart';
import { trackOrderRequestSuccess, type AnalyticsArtworkItem } from '../data/analytics';

const formatPrice = (value: number) => new Intl.NumberFormat('ru-RU').format(value);

export function OrderSummary({
  itemCount,
  items,
  analyticsItems,
  totalRub,
  onRequestSent,
}: {
  itemCount: number;
  items: CartEntry[];
  analyticsItems: AnalyticsArtworkItem[];
  totalRub: number;
  onRequestSent?: () => void;
}) {
  const [requestOpen, setRequestOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastDigit = itemCount % 10;
  const lastTwoDigits = itemCount % 100;
  const itemLabel = lastDigit === 1 && lastTwoDigits !== 11 ? 'товар' : lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14) ? 'товара' : 'товаров';
  const totalText = `${formatPrice(totalRub)} ₽`;

  const closeRequest = () => {
    if (isSubmitting) {
      return;
    }

    setRequestOpen(false);
    setError('');
  };

  const submitRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!phone.trim() && !email.trim() && !telegram.trim()) {
      setError('Укажите телефон, электронную почту или Телеграм.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/order-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          email,
          telegram,
          items,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setError(result?.message || 'Не удалось отправить запрос. Попробуйте позже.');
        return;
      }

      trackOrderRequestSuccess(analyticsItems, totalRub);
      onRequestSent?.();
      setPhone('');
      setEmail('');
      setTelegram('');
      setRequestOpen(false);
    } catch {
      setError('Не удалось отправить запрос. Проверьте соединение и попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <aside className="lg:sticky lg:top-6">
        <div className="border border-black/10 bg-[#f7f7f4] p-5">
          <strong className="block text-2xl font-light text-ink">Ваш заказ</strong>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-bold text-ink">{itemCount} {itemLabel}, на сумму</span>
              <span className="text-lg font-medium">{totalText}</span>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm text-black/55">
              <span>Доставка</span>
              <span>0 ₽</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
              <span className="font-bold text-ink">Итого</span>
              <span className="text-2xl font-medium text-ink">{totalText}</span>
            </div>

            <button
              type="button"
              className="w-full bg-accent px-5 py-3.5 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-black/25"
              disabled={itemCount === 0}
              onClick={() => setRequestOpen(true)}
            >
              Послать запрос
            </button>

            <label className="flex gap-3 text-sm leading-5 text-black/60">
              <input type="checkbox" defaultChecked className="mt-1 size-4 accent-[#e66a2c]" />
              <span>
                Согласен с <a href="#" className="text-ink underline decoration-black/20 underline-offset-4 hover:text-accent">условиями работы</a>
              </span>
            </label>
          </div>
        </div>

      </aside>

      {requestOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-label="Послать запрос">
          <button type="button" className="absolute inset-0 cursor-default" aria-label="Закрыть" onClick={closeRequest} disabled={isSubmitting} />
          <form className="relative w-full max-w-md bg-white p-6 shadow-2xl" onSubmit={submitRequest}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <strong className="block text-2xl font-light text-ink">Послать запрос</strong>
                <p className="mt-2 text-sm leading-6 text-black/55">Укажите телефон, электронную почту или Телеграм. Можно заполнить несколько полей.</p>
              </div>
              <button type="button" className="text-2xl leading-none text-black/35 transition hover:text-accent disabled:cursor-not-allowed disabled:text-black/20" onClick={closeRequest} aria-label="Закрыть" disabled={isSubmitting}>
                ×
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-ink">
                Телефон
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  disabled={isSubmitting}
                  className="mt-2 w-full border border-black/15 px-3 py-3 text-sm font-normal outline-none focus:border-accent"
                  placeholder="+7 900 000 00 00"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Электронная почта
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                  className="mt-2 w-full border border-black/15 px-3 py-3 text-sm font-normal outline-none focus:border-accent"
                  placeholder="user@mail.com"
                />
              </label>
              <label className="block text-sm font-medium text-ink">
                Телеграм
                <input
                  type="text"
                  value={telegram}
                  onChange={(event) => setTelegram(event.target.value)}
                  disabled={isSubmitting}
                  className="mt-2 w-full border border-black/15 px-3 py-3 text-sm font-normal outline-none focus:border-accent"
                  placeholder="@username"
                />
              </label>
            </div>

            {error && <p className="mt-4 text-sm text-accent">{error}</p>}

            <button type="submit" className="mt-6 w-full bg-accent px-5 py-3.5 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-black/25" disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем...' : 'Отправить'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
