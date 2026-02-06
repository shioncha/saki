import { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

import ArticleCard from "@/components/elements/ArticleCard";
import { PaginationButton } from "@/components/elements/PaginationButton";
import { getArticleList, getArticleListAll } from "@/lib/microcms";

import styles from "./page.module.css";

const PER_PAGE = 12;
interface Props {
  params: Promise<{ pageNum: string }>;
}

async function getPageCount(): Promise<number> {
  const queries: MicroCMSQueries = {
    fields: "id",
    filters: "category[not_equals]page",
  };
  const posts = await getArticleListAll(queries);
  const postCount = posts.length;
  const pageCount = Math.ceil(postCount / PER_PAGE);
  return pageCount;
}

export async function generateStaticParams() {
  const pageCount = await getPageCount();

  const paths = Array.from({ length: pageCount }).map((_, i) => {
    return {
      pageNum: (i + 1).toString(),
    };
  });

  return [...paths];
}

export default async function StaticPage(props: Props) {
  const params = await props.params;

  const { pageNum } = params;

  const queries: MicroCMSQueries = {
    fields: "id,title,eyecatch,category,publishedAt",
    filters: "category[not_equals]page",
    offset: (Number(pageNum) - 1) * PER_PAGE,
    limit: PER_PAGE,
  };
  const { contents } = await getArticleList(queries);

  const pageCount = await getPageCount();

  if (!contents || contents.length === 0) {
    notFound();
  }

  return (
    <>
      <div className={styles.container}>
        {contents.map((post) => {
          return <ArticleCard key={post.id} post={post} />;
        })}
      </div>
      <PaginationButton current={Number(pageNum)} total={Number(pageCount)} />
    </>
  );
}

export const dynamicParams = false;
