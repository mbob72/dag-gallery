import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';
import { OrderCartItems, type OrderCartItem } from './OrderCartItems';
import { OrderSummary } from './OrderSummary';
import { Container } from './Container';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Корзина', href: '/order' },
];

const cartItems: OrderCartItem[] = [
  {
    id: '542096',
    title: 'Танец цветов',
    image: '/userdata/poster/image3d/d8/7d/d87d8268a63a1660a67f57474f9c5488.jpg?1781639396',
    href: '/poster/bezhevo-seraya-abstrakciya-627054?poster_id=3494461',
    attributes: ['Артикул: F133799', '38.9x50 см', 'Исполнение: На холсте без рамы', 'Материал печати: Холст'],
    quantity: 1,
    price: '3 315',
    totalText: '= 1 x 3 315',
    actions: ['отложить в избранное', 'Удалить'],
  },
  {
    id: 'bonus',
    title: '198 бонусных баллов',
    image: '/userdata/bonus_point/45/44/454456e26be2bbff4ab1ebf3cd1f30d3.jpg',
    badge: '/images/cart_present_2.png',
    attributes: ['Баллы будут доступны при следующем заказе'],
    price: 'Бесплатно',
  },
  {
    id: 'client-card',
    title: 'Карта постоянного клиента',
    image: '/images/client_cards/7.jpg',
    badge: '/images/cart_crown.png',
    attributes: ['Виртуальная карта придет вам на почту вместе с заказом'],
    price: 'Бесплатно',
  },
];

export function OrderPage() {
  return (
    <>
      <ProductBreadcrumbs items={breadcrumbs} />
      <section className="bg-white py-8 sm:py-12">
        <Container>
          <h1 className="mb-7 text-3xl font-light leading-tight text-ink sm:text-5xl">Корзина</h1>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <OrderCartItems items={cartItems} />
            <OrderSummary />
          </div>
        </Container>
      </section>
    </>
  );
}
