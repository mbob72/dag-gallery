import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { OrderCartItems } from './OrderCartItems';

const items = [
  {
    id: 'belaya-skazka',
    title: 'Белая сказка',
    image: '/artworks/painting/01_belaya-skazka_p02.jpeg',
    href: '/poster/belaya-skazka',
    attributes: ['Артикул: 1', '115x100 см'],
    price: '330 000',
  },
];

describe('OrderCartItems', () => {
  it('renders an empty cart message', () => {
    render(<OrderCartItems items={[]} />);

    expect(screen.getByText('В корзине пока нет работ.')).toBeInTheDocument();
  });

  it('renders cart items and handles removal', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onMoveToFavorites = vi.fn();

    render(<OrderCartItems items={items} onRemove={onRemove} onMoveToFavorites={onMoveToFavorites} />);

    expect(screen.getAllByRole('link', { name: 'Белая сказка' })).toHaveLength(2);
    expect(screen.getByText('Артикул: 1')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'отложить в избранное' }));
    expect(onMoveToFavorites).toHaveBeenCalledWith('belaya-skazka');

    await user.click(screen.getByRole('button', { name: 'Удалить' }));

    expect(onRemove).toHaveBeenCalledWith('belaya-skazka');
  });
});
