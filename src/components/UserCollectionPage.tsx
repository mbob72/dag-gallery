import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import { Footer } from './Sections';
import { UserArtworkList, type UserArtworkItem } from './UserArtworkList';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Личный кабинет', href: '/user' },
];

const cartItems: UserArtworkItem[] = [
  {
    id: 'cart-7007132',
    image: '/userdata/image/thumbs/ce/43/ce43c7453ae76d10eb336608af686f9f_2.jpg?v=1781637770',
    title: 'Ангельская песнь: белый пион поёт свою мелодию',
    article: '7007132',
    author: 'Наталья Савельева',
    href: '/poster/1',
  },
];

const favoriteItems: UserArtworkItem[] = [
  {
    id: 'favorite-7007132',
    image: '/userdata/image/thumbs/ce/43/ce43c7453ae76d10eb336608af686f9f_2.jpg?v=1781637770',
    title: 'Ангельская песнь: белый пион поёт свою мелодию',
    article: '7007132',
    author: 'Наталья Савельева',
    href: '/poster/1',
  },
];

export function UserCollectionPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ProductBreadcrumbs items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <UserArtworkList title="У вас в корзине" items={cartItems} />
        <UserArtworkList title="У вас в избранном" items={favoriteItems} />
        <Footer />
      </div>
    </div>
  );
}
