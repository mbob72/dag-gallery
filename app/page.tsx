import type { Metadata } from 'next';
import { HomePage } from '../src/components/HomePage';
import { getHomeSeo, toMetadata } from '../src/data/seo';

export const metadata: Metadata = toMetadata(getHomeSeo());

export default function Page() {
  return <HomePage />;
}
