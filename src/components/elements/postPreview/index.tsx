import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Blog } from "@/lib/microcms";
import { Thumbnail } from "@/components/elements/thumbnail";
import styles from "./postPreview.module.css";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function PostPreview(
    {post}: {post: Blog}
) {
    
    return (
        <article key={post.id}>
            <a href={`/blog/${post.id}`} className={styles.item}>
                <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                <p>
                    <span className={styles.date}>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
                    <span className={styles.category}>{post.category.name}</span>
                </p>
                <h1 className={styles.title}>{post.title}</h1>
            </a>
        </article>
    );
}