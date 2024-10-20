"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
import { DateFormatter } from '@/components/elements/dateFormatter';
import styles from './page.module.css';

interface Article {
  id: string;
  title: string;
  publishedAt: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  async function handler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = (event.target as HTMLFormElement).q.value;
    const params = new URLSearchParams(searchParams);
    if (!q) {
      setArticles([]);
      replace('/search');
      return;
    }
    params.set('q', q);
    replace(`/search?${params.toString()}`);
  }

  useEffect(() => {
    const search = async () => {
      setLoading(true);
      const q = searchParams.get('q');
      const res = await fetch(`/api/blog/search?q=${q}`);
      const json = await res.json();
      setArticles(json);
      setLoading(false);
    }
    if (searchParams.get('q')) search();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search</h1>
      <p>記事の内容から全文検索ができます。検索結果はヒットした記事のうち、最新の12件まで表示されます。</p>
      <form onSubmit={handler} className={styles.searchBox}>
        <input type="text" name="q" placeholder='Search' defaultValue={searchParams.get('q')?.toString()} className={styles.input} />
        <button type="submit" className={styles.button}><CiSearch size={24} color='white'/></button>
      </form>
      {loading ? <p>Loading...</p> : (
        <div className={styles.articles}>
          {articles.map((article) => {
            const url = `/blog/${article.id}`;
            return (
              <div key={article.id} className={styles.article}>
                <p><Link href={url} target="_blank">{article.title}</Link></p>
                <DateFormatter date={article.publishedAt} />
              </div>
            );
          }, [])}
        </div>
      )}
    </div>
  );
}
