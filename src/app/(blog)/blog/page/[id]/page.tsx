import { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

import { PagenationButton } from "@/components/elements/pagenationButton";
import PostPreview from "@/components/elements/postPreview";
import { getBlogList,getList } from "@/lib/microcms";

import styles from "./page.module.css";

const PER_PAGE = 12;
interface Props {
  params: {
    id: string;
  };
}

async function getPageCount(): Promise<number> {
  const queries: MicroCMSQueries = {
    fields: 'id',
    filters: 'category[not_equals]page'
  };
  const posts = await getBlogList(queries);
  const postCount = posts.length;
  const pageCount = Math.ceil(postCount / PER_PAGE);
  return pageCount;
}

export async function generateStaticParams() {
  const pageCount = await getPageCount();

  const paths = Array.from({ length: pageCount }).map((_, i) => {
    return {
      id: (i + 1).toString()
    };
  });

  return [...paths];
}

export default async function StaticPage({ params: { id } }: Props) {
  const queries: MicroCMSQueries = {
    fields: 'id,title,eyecatch,category,publishedAt',
    filters: 'category[not_equals]page',
    offset: (Number(id) - 1) * PER_PAGE,
    limit: PER_PAGE
  };
  const { contents } = await getList(queries);

  const pageCount = await getPageCount();

  if (!contents || contents.length === 0) {
    notFound();
  }

  return (
    <>
      <div className={styles.container}>
        {contents.map((post) => {
          return <PostPreview key={post.id} post={post} />;
        })}
      </div>
      <PagenationButton current={Number(id)} total={Number(pageCount)} />
    </>
  );
}

export const dynamicParams = false;
