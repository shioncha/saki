import { MicroCMSQueries } from "microcms-js-sdk";

import ArticleCard from "@/components/elements/ArticleCard";
import { PaginationButton } from "@/components/elements/PaginationButton";
import { getList } from "@/lib/microcms";
import { getBlogList } from "@/lib/microcms";

import styles from "./page.module.css";

const PER_PAGE = 12;

async function getPageCount(): Promise<number> {
  const queries: MicroCMSQueries = {
    fields: "id",
    filters: "category[not_equals]page",
  };
  const posts = await getBlogList(queries);
  const postCount = posts.length;
  const pageCount = Math.ceil(postCount / PER_PAGE);
  return pageCount;
}

export default async function StaticPage() {
  const { contents } = await getList();
  const pageCount = await getPageCount();

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        {contents.map((post) => {
          return <ArticleCard key={post.id} post={post} />;
        })}
      </div>
      <PaginationButton current={1} total={pageCount} />
    </>
  );
}
