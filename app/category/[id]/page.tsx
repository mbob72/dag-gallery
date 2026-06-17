import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryPage } from '../../../src/components/CategoryPage';
import { categories, getArtworksByCategoryId, getCategoryById } from '../../../src/data/artworks';

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    return {
      title: 'Категория не найдена',
    };
  }

  return {
    title: `${category.title} | Caspian Art Bureau`,
    description: `Работы Натальи Савельевой в категории ${category.title}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  return <CategoryPage category={category} artworks={getArtworksByCategoryId(id)} />;
}
