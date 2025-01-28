import Link from "next/link";

import { Thumbnail } from "@/components/elements/thumbnail";
import { Blog } from "@/lib/microcms";

import { DateFormatter } from "../dateFormatter";
import styles from "./postPreview.module.css";

interface Props {
    post: Blog;
}

export default function PostPreview({ post }: Props): JSX.Element {
    return (
        <article key={post.id} className={styles.item}>
            <Link href={`/blog/${post.id}`} className={styles.link}></Link>
            <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.info}>
                <span className={styles.date}><DateFormatter date={post.publishedAt} /></span>
                <span className={styles.category}>{post.category.name}</span>
            </div>
        </article>
    );
}
