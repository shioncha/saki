import Link from "next/link";
import { getList } from "@/lib/microcms";
import { Thumbnail } from "@/components/elements/thumbnail";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import styles from "./page.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function StaticPage() {
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <>
      <div className={styles.container}>
      {contents.map((post) => {
        return (
          <article key={post.id}>
            <Link href={`/blog/${post.id}`} className={styles.item}>
              <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
              <p>
                <span className={styles.date}>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
                <span className={styles.category}><Link href={`/category/${post.category.id}`}>{post.category.name}</Link></span>
              </p>
              <h1 className={styles.title}>{post.title}</h1>
            </Link>
          </article>
        );
      })}
      </div>
    </>
  );
}