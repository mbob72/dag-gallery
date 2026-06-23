import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AddToCartButton } from './AddToCartButton';

const meta = {
  title: 'Cart/AddToCartButton',
  component: AddToCartButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddToCartButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    artworkId: 'belaya-skazka',
    className: 'inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-bold text-white',
    showAddedText: true,
  },
};
