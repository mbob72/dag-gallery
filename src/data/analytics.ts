export type AnalyticsArtworkItem = {
  id: string;
  title?: string;
  category?: string;
  priceRub?: number | null;
  quantity?: number;
};

type AnalyticsEventParams = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: 'event', eventName: string, params?: AnalyticsEventParams) => void;
    ym?: (counterId: number, method: 'reachGoal', goalName: string, params?: AnalyticsEventParams) => void;
  }
}

const yandexMetrikaCounterId = 110180836;
const currency = 'RUB';

function isBrowser() {
  return typeof window !== 'undefined';
}

function toGaItem(item: AnalyticsArtworkItem) {
  return {
    item_id: item.id,
    item_name: item.title,
    item_category: item.category,
    price: item.priceRub ?? undefined,
    quantity: item.quantity ?? 1,
  };
}

function toYandexProduct(item: AnalyticsArtworkItem) {
  return {
    id: item.id,
    name: item.title,
    category: item.category,
    price: item.priceRub ?? undefined,
    quantity: item.quantity ?? 1,
  };
}

function pushDataLayer(payload: AnalyticsEventParams) {
  if (!isBrowser()) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function sendAnalyticsEvent(eventName: string, params: AnalyticsEventParams, yandexGoalName: string) {
  if (!isBrowser()) {
    return;
  }

  window.gtag?.('event', eventName, params);
  window.ym?.(yandexMetrikaCounterId, 'reachGoal', yandexGoalName, params);
}

export function trackArtworkView(item: AnalyticsArtworkItem) {
  const params = {
    currency,
    value: item.priceRub ?? 0,
    items: [toGaItem(item)],
  };

  pushDataLayer({
    event: 'view_item',
    ecommerce: {
      detail: {
        products: [toYandexProduct(item)],
      },
    },
  });
  sendAnalyticsEvent('view_item', params, 'view_artwork');
}

export function trackAddToCart(item: AnalyticsArtworkItem) {
  const params = {
    currency,
    value: item.priceRub ?? 0,
    items: [toGaItem(item)],
  };

  pushDataLayer({
    event: 'add_to_cart',
    ecommerce: {
      currencyCode: currency,
      add: {
        products: [toYandexProduct(item)],
      },
    },
  });
  sendAnalyticsEvent('add_to_cart', params, 'add_to_cart');
}

export function trackCartOpen(items: AnalyticsArtworkItem[], totalRub: number) {
  const params = {
    currency,
    value: totalRub,
    items: items.map(toGaItem),
  };

  pushDataLayer({
    event: 'view_cart',
    ecommerce: {
      currencyCode: currency,
      checkout: {
        products: items.map(toYandexProduct),
      },
    },
  });
  sendAnalyticsEvent('view_cart', params, 'open_cart');
}

export function trackOrderRequestSuccess(items: AnalyticsArtworkItem[], totalRub: number) {
  const params = {
    currency,
    value: totalRub,
    items: items.map(toGaItem),
  };

  pushDataLayer({
    event: 'submit_order_success',
    ecommerce: {
      currencyCode: currency,
      purchase: {
        actionField: {
          id: `order-request-${Date.now()}`,
          revenue: totalRub,
        },
        products: items.map(toYandexProduct),
      },
    },
  });
  sendAnalyticsEvent('generate_lead', params, 'submit_order_success');
}
