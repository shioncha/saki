export const dynamicParams = false;
import { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import { ArticleDetail } from "@/components/elements/ArticleDetail";
import { Comments } from "@/components/elements/Comments";
import { Aside } from "@/components/layouts/aside";
import { ShareTree } from "@/components/layouts/share";
import Metadata from "@/const/meta";
import { getBlogList, getDetail } from "@/lib/microcms";

import styles from "./page.module.css";

interface Props {
  params: Promise<{
    postId: string;
  }>;
}

export async function generateStaticParams() {
  const queries: MicroCMSQueries = {
    fields: "id",
    filters: "category[not_equals]page",
  };
  const posts = await getBlogList(queries);

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

  const post = await getDetail(postId);

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

  const post = await getDetail(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <ShareTree
        url={`${Metadata.baseUrl}/blog/${postId}`}
        title={`${post.title} | ${Metadata.title}`}
      />
      <div className={styles.contents}>
        <ArticleDetail post={post} />
        <Comments postId={postId} />
      </div>
      <Aside />
    </div>
  );
}
