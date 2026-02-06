export const dynamicParams = false;
import { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import { ArticleDetail } from "@/components/elements/ArticleDetail";
import { Comments } from "@/components/elements/Comments";
import { ArticleNavigation } from "@/components/layouts/ArticleNavigation";
import { ShareActions } from "@/components/layouts/ShareActions";
import Metadata from "@/const/meta";
import { getArticleDetail, getArticleListAll } from "@/lib/microcms";

import styles from "./page.module.css";

interface Props {
  params: Promise<{ postId: string }>;
}

export async function generateStaticParams() {
  const queries: MicroCMSQueries = {
    fields: "id",
    filters: "category[not_equals]page",
  };
  const posts = await getArticleListAll(queries);

  const paths = posts.map((post) => {
    return {
      postId: post.id,
      alternates: {
        canonical: `${Metadata.baseUrl}/blog/${post.id}`,
      },
    };
  });

  return [...paths];
}

export async function generateMetadata(props: Props) {
  const params = await props.params;

  const { postId } = params;

  const post = await getArticleDetail(postId);

  if (!post || !post.title) {
    return "Untitled";
  }

  const description =
    post.content.replace(/(<([^>]+)>)/gi, "").slice(0, 100) + "...";
  const images = post.eyecatch.url;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      images,
      url: `${Metadata.baseUrl}/blog/${postId}`,
      siteName: Metadata.title,
      locate: "ja_JP",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images,
    },
  };
}

export default async function StaticDetailPage(
  props: Props,
): Promise<JSX.Element> {
  const params = await props.params;

  const { postId } = params;

  const post = await getArticleDetail(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <ShareActions
        url={`${Metadata.baseUrl}/blog/${postId}`}
        title={`${post.title} | ${Metadata.title}`}
      />
      <div className={styles.contents}>
        <ArticleDetail post={post} />
        <Comments postId={postId} />
      </div>
      <ArticleNavigation />
    </div>
  );
}
