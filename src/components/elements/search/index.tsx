"use client";

import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

import { DateFormatter } from '@/components/elements/dateFormatter';

import styles from './SearchFunc.module.css';

interface Article {
  id: string;
  title: string;
  publishedAt: string;
}

export default function SearchFunc() {
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
    <>
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
    </>
  );
}
