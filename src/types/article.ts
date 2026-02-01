export interface SearchArticle {
  id: string;
  title: string;
  publishedAt: string;
}

export interface SearchResponse {
  contents: SearchArticle[];
  totalCount: number;
  offset: number;
  limit: number;
}
