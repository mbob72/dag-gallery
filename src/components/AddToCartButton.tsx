'use client';

import { useEffect, useState } from 'react';
import { addToCart, cartChangeEventName, readCart } from '../data/cart';
import { trackAddToCart, type AnalyticsArtworkItem } from '../data/analytics';
import { CartIcon } from './icons';

type AddToCartButtonProps = {
  artworkId: string;
  label?: string;
  className: string;
  iconClassName?: string;
  showAddedText?: boolean;
  analyticsItem?: AnalyticsArtworkItem;
};

export function AddToCartButton({
  artworkId,
  label = 'Добавить в корзину',
  className,
  iconClassName = 'size-5',
  showAddedText = false,
  analyticsItem,
}: AddToCartButtonProps) {
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const syncCartState = () => setInCart(readCart().some((entry) => entry.id === artworkId));

    syncCartState();
    window.addEventListener(cartChangeEventName, syncCartState);
    window.addEventListener('storage', syncCartState);

    return () => {
      window.removeEventListener(cartChangeEventName, syncCartState);
      window.removeEventListener('storage', syncCartState);
    };
  }, [artworkId]);

  return (
    <button
      type="button"
      aria-label={inCart ? 'В корзине' : label}
      className={`${className} disabled:cursor-not-allowed disabled:border-accent disabled:bg-accent disabled:text-white`}
      disabled={inCart}
      onClick={() => {
        addToCart(artworkId);
        trackAddToCart(analyticsItem ?? { id: artworkId });
        setInCart(true);
      }}
    >
      <CartIcon className={iconClassName} />
      {showAddedText ? <span>{inCart ? 'В корзине' : label}</span> : null}
    </button>
  );
}
