import type { MicroCMSListResponse, MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

import type { Article, Category } from "@/types/article";

// 定数定義
const ENDPOINTS = {
  ARTICLE: "blogs",
  CATEGORY: "categories",
} as const;

const DEFAULT_QUERIES = {
  ARTICLE_LIST: {
    fields: "id,title,eyecatch,category,publishedAt",
    filters: "category[not_equals]page",
    limit: 12,
  },
  CATEGORY_LIST: {
    fields: "id,name",
    filters: "id[not_equals]page",
    limit: 10,
  },
} as const;

// 環境変数の確認
if (!process.env.MICROCMS_SERVICE_DOMAIN || !process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_SERVICE_DOMAIN and MICROCMS_API_KEY are required");
}

// API取得用のクライアントを作成
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// 記事の一覧を取得
export const getArticleList = async (
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<Article>> => {
  const mergedQueries = {
    ...DEFAULT_QUERIES.ARTICLE_LIST,
    ...queries,
  };

  return await client.getList<Article>({
    endpoint: ENDPOINTS.ARTICLE,
    queries: mergedQueries,
  });
};

// 記事の内容を取得
export const getArticleDetail = async (
  contentId: string,
  queries?: MicroCMSQueries,
): Promise<Article> => {
  return await client.getListDetail<Article>({
    endpoint: ENDPOINTS.ARTICLE,
    contentId,
    queries,
  });
};

// カテゴリー一覧を取得
export const getCategoryList = async (): Promise<
  MicroCMSListResponse<Category>
> => {
  return await client.getList<Category>({
    endpoint: ENDPOINTS.CATEGORY,
    queries: DEFAULT_QUERIES.CATEGORY_LIST,
  });
};

// 全ての記事を取得 (RSS用)
export const getArticleListAll = async (
  queries?: MicroCMSQueries,
): Promise<Article[]> => {
  return await client.getAllContents<Article>({
    endpoint: ENDPOINTS.ARTICLE,
    queries,
  });
};
