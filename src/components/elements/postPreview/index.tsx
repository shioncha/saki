import Link from "next/link";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Blog } from "@/lib/microcms";
import { Thumbnail } from "@/components/elements/thumbnail";
import styles from "./postPreview.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
    post: Blog;
}

export default function PostPreview({ post }: Props): JSX.Element {
    return (
        <article key={post.id}>
            <Link href={`/blog/${post.id}`} className={styles.item}>
                <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                <div className={styles.info}>
                    <span className={styles.date}>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
                    <span className={styles.category}>{post.category.name}</span>
                </div>
                <h1 className={styles.title}>{post.title}</h1>
            </Link>
        </article>
    );
}
