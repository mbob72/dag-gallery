'use client';

import { useEffect, useState } from 'react';
import { favoriteChangeEventName, readFavorites, toggleFavorite } from '../data/cart';
import { HeartIcon } from './icons';

type FavoriteButtonProps = {
  artworkId: string;
  label?: string;
  className: string;
  activeClassName?: string;
  iconClassName?: string;
  showActiveText?: boolean;
  count?: number;
};

export function FavoriteButton({
  artworkId,
  label = 'Добавить в избранное',
  className,
  activeClassName = '!border-accent !bg-accent !text-white hover:!bg-ink hover:!text-white',
  iconClassName = 'size-5',
  showActiveText = false,
  count,
}: FavoriteButtonProps) {
  const [inFavorites, setInFavorites] = useState(false);

  useEffect(() => {
    const syncFavoriteState = () => setInFavorites(readFavorites().some((entry) => entry.id === artworkId));

    syncFavoriteState();
    window.addEventListener(favoriteChangeEventName, syncFavoriteState);
    window.addEventListener('storage', syncFavoriteState);

    return () => {
      window.removeEventListener(favoriteChangeEventName, syncFavoriteState);
      window.removeEventListener('storage', syncFavoriteState);
    };
  }, [artworkId]);

  return (
    <button
      type="button"
      aria-pressed={inFavorites}
      aria-label={inFavorites ? 'Убрать из избранного' : label}
      className={`${className} ${inFavorites ? activeClassName : ''}`}
      onClick={() => setInFavorites(toggleFavorite(artworkId))}
    >
      <HeartIcon className={iconClassName} fill={inFavorites ? 'currentColor' : 'none'} />
      {showActiveText ? <span>{inFavorites ? 'В избранном' : label}</span> : null}
      {typeof count === 'number' && (
        <span className="ml-auto hidden text-current/45 lg:inline">{count}</span>
      )}
    </button>
  );
}
