import type { Metadata } from 'next';
import { OrderPage } from '../../src/components/OrderPage';

export const metadata: Metadata = {
  title: 'Корзина',
  description: 'Товары в корзине',
};

export default function Page() {
  return <OrderPage />;
}
