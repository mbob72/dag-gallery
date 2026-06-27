import type { Metadata } from 'next';
import { SearchPage } from '../../src/components/SearchPage';
import { SITE_TITLE } from '../../src/data/brand';

type PageProps = {
  searchParams: Promise<{
    q?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: {
    absolute: `Поиск | ${SITE_TITLE}`,
  },
  description: `Поиск по каталогу работ ${SITE_TITLE}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return <SearchPage query={q} />;
}
