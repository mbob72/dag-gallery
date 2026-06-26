'use client';

import { useEffect, useState } from 'react';
import { cartChangeEventName, readCart, toggleCart } from '../data/cart';
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

  const handleClick = () => {
    const added = toggleCart(artworkId);

    if (added) {
      trackAddToCart(analyticsItem ?? { id: artworkId });
    }

    setInCart(added);
  };

  return (
    <button
      type="button"
      aria-pressed={inCart}
      aria-label={inCart ? 'Убрать из корзины' : label}
      className={`${className} ${inCart ? '!border-accent !bg-accent !text-white hover:!bg-ink hover:!text-white' : ''}`}
      onClick={handleClick}
    >
      <CartIcon className={iconClassName} />
      {showAddedText ? <span>{inCart ? 'В корзине' : label}</span> : null}
    </button>
  );
}
