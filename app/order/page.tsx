import type { Metadata } from 'next';
import { OrderPage } from '../../src/components/OrderPage';
import { getUtilitySeo, toMetadata } from '../../src/data/seo';

export const metadata: Metadata = toMetadata(getUtilitySeo('order'));

export default function Page() {
  return <OrderPage />;
}
