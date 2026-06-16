import { ProductArtwork, type ArtworkProduct } from './ProductArtwork';
import { ProductBreadcrumbs, type BreadcrumbItem } from './ProductBreadcrumbs';

const breadcrumbs: BreadcrumbItem[] = [
  { label: 'Главная', href: '/' },
  { label: 'Постеры', href: '/catalog/postery-6' },
  { label: 'Цветы', href: '/catalog/cvety-239' },
  { label: 'Цветы АРТ', href: '/catalog/cvety-art-7930' },
  { label: 'Цветы макро АРТ', href: '/catalog/tsvety-makro-art-18391' },
];

const product: ArtworkProduct = {
  article: '7007132',
  title: 'Ангельская песнь: белый пион поёт свою мелодию',
  author: 'Плющ Уэльский',
  image: '/userdata/image/thumbs/ce/43/ce43c7453ae76d10eb336608af686f9f_2.jpg?v=1781637770',
  favoriteCount: 190,
};

export function ProductPage() {
  return (
    <>
      <ProductBreadcrumbs items={breadcrumbs} />
      <ProductArtwork product={product} />
    </>
  );
}
