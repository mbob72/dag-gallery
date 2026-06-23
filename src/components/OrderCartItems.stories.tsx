import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OrderCartItems } from './OrderCartItems';

const meta = {
  title: 'Cart/OrderCartItems',
  component: OrderCartItems,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof OrderCartItems>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    items: [
      {
        id: 'belaya-skazka',
        title: 'Белая сказка',
        image: '/artworks/painting/01_belaya-skazka_p02.jpeg',
        href: '/poster/belaya-skazka',
        attributes: ['Артикул: 1', '115x100 см', 'Холст, масло'],
        price: '330 000',
      },
      {
        id: 'sny',
        title: 'Сны',
        image: '/artworks/painting/02_sny_p03.jpeg',
        href: '/poster/sny',
        attributes: ['Артикул: 2', '120x120 см', 'Холст, масло'],
        price: '770 000',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};
