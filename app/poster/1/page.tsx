import type { Metadata } from 'next';
import { ProductPage } from '../../../src/components/ProductPage';

export const metadata: Metadata = {
  title: 'Ангельская песнь: белый пион поёт свою мелодию',
  description: 'Ангельская песнь: белый пион поёт свою мелодию',
};

export default function Page() {
  return <ProductPage />;
}
