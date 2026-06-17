import type { Metadata } from 'next';
import { UserCollectionPage } from '../../src/components/UserCollectionPage';
import { getUtilitySeo, toMetadata } from '../../src/data/seo';

export const metadata: Metadata = toMetadata(getUtilitySeo('user'));

export default function Page() {
  return <UserCollectionPage />;
}
