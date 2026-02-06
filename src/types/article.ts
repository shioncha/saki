import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSListResponse,
} from "microcms-js-sdk";

export type Article = MicroCMSContentId &
  MicroCMSDate & {
    title: string;
    content: string;
    category: Category;
    eyecatch: MicroCMSImage;
  };

export type Category = MicroCMSContentId &
  MicroCMSDate & {
    name: string;
  };

export type SearchArticle = {
  id: string;
  title: string;
  publishedAt: string;
};

export type SearchResponse = MicroCMSListResponse<SearchArticle>;
