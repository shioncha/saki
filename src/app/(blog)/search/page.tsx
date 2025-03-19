import { Suspense } from 'react';

import SearchFunc from '@/components/elements/search';
import Metadata from '@/const/meta';

import styles from './page.module.css';

export function metadata() {
  return {
    title: 'Search',
    alternates: {
      canonical: `${Metadata.baseUrl}/search`,
    }
  };
}

export default function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      <p>記事の内容から全文検索ができます。検索結果はヒットした記事のうち、最新の12件まで表示されます。</p>
      <Suspense>
        <SearchFunc />
      </Suspense>
    </div>
  );
}
