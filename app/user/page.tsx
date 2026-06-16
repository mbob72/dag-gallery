import type { Metadata } from 'next';
import { UserCollectionPage } from '../../src/components/UserCollectionPage';

export const metadata: Metadata = {
  title: 'Личный кабинет',
  description: 'Корзина и избранное пользователя',
};

export default function Page() {
  return <UserCollectionPage />;
}
