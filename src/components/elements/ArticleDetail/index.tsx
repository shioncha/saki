import parse from "html-react-parser";
import Link from "next/link";
import { JSX } from "react";

import { DateFormatter } from "@/components/elements/DateFormatter";
import { Thumbnail } from "@/components/elements/Thumbnail";
import { Article } from "@/types/article";

import styles from "./ArticleDetail.module.css";

interface Props {
  post: Article;
  isPageCategory?: boolean;
}

export function ArticleDetail({ post, isPageCategory }: Props): JSX.Element {
  return (
    <article className={styles.article}>
      <Thumbnail
        url={post.eyecatch.url}
        alt="アイキャッチ"
        width={post.eyecatch.width}
        height={post.eyecatch.height}
      />
      {isPageCategory ? null : (
        <div className={styles.info}>
          <span className={styles.date}>
            <DateFormatter date={post.publishedAt} />
          </span>
          <span className={styles.category}>
            <Link href={"/category/" + post.category.id}>
              {post.category.name}
            </Link>
          </span>
        </div>
      )}
      <h1>{post.title}</h1>
      <div className="prose">{parse(post.content)}</div>
      {isPageCategory ? (
        <p>
          最終更新: <DateFormatter date={post.updatedAt} />
        </p>
      ) : null}
    </article>
  );
}
