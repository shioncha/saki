import { MetadataRoute } from 'next'
import Metadata from '@/const/meta'
import { getBlogList, getCategoryList } from '@/lib/microcms';
import { MicroCMSQueries } from 'microcms-js-sdk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const queries: MicroCMSQueries = {
    fields: 'id,updatedAt',
  }
  const posts = await getBlogList(queries);
  const urls = posts.map((post) => {
    return {
      url: `${Metadata.baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.updatedAt),
    };
  });
  const categories = await getCategoryList();
  const categoryUrls = categories.contents.map((category) => {
    return {
      url: `${Metadata.baseUrl}/category/${category.id}`,
      lastModified: new Date(),
    }
  })

  return [
    {
      url: Metadata.baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${Metadata.baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...urls,
    ...categoryUrls
  ]
}