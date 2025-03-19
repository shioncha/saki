import type {
    MicroCMSDate,
    MicroCMSImage,
    MicroCMSQueries,
} from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

export type Blog = {
    id: string;
    title: string;
    content: string;
    category: {
        id: string;
        name: string;
    };
    eyecatch: MicroCMSImage;
} & MicroCMSDate;

export type Category = {
    id: string;
    name: string;
} & MicroCMSDate;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

// API取得用のクライアントを作成
export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
});

// 記事の一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
    if (!queries) {
        queries = {
            fields: 'id,title,eyecatch,category,publishedAt',
            filters: 'category[not_equals]page',
            limit: 12,
        };
    }
    const listData = await client.getList<Blog>({
        endpoint: "blogs",
        queries
    });
    
    return listData;
};

// 記事の内容を取得
export const getDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const detailData = await client.getListDetail<Blog>({
        endpoint: "blogs",
        contentId,
        queries
    });

    return detailData;
};

// カテゴリー一覧を取得
export const getCategoryList = async (queries?: MicroCMSQueries) => {
    const listData = await client.getList<Category>({
        endpoint: "categories",
        queries: {
            fields: 'id,name',
            filters: 'id[not_equals]page',
            limit: 10,
        }
    });

    return listData;
};

// 全ての記事を取得 (RSS用)
export const getBlogList = async (queries: MicroCMSQueries) => {
    const listData = await client.getAllContents<Blog>({
        endpoint: "blogs",
        queries
    });

    return listData;
};
