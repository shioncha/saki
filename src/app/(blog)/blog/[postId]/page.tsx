export const dynamicParams = false;
import parse from "html-react-parser";
import { MicroCMSQueries } from "microcms-js-sdk";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { JSX } from "react";

import { Comments } from "@/components/elements/comments";
import { DateFormatter } from "@/components/elements/dateFormatter";
import { Thumbnail } from "@/components/elements/thumbnail";
import { Aside } from "@/components/layouts/aside";
import { ShareTree } from "@/components/layouts/share";
import Metadata from "@/const/meta";
import { getBlogList,getDetail } from "@/lib/microcms";

import styles from "./page.module.css";

interface Props {
    params: Promise<{
        postId: string;
    }>
}

export async function generateStaticParams() {
    const queries: MicroCMSQueries = {
        fields: 'id',
        filters: 'category[not_equals]page',
    };
    const posts = await getBlogList(queries);

    const paths = posts.map((post) => {
        return {
            postId: post.id,
            alternates: {
                canonical: `${Metadata.baseUrl}/blog/${post.id}`,
            }
        };
    });

    return [...paths];
}

export async function generateMetadata(props: Props) {
    const params = await props.params;

    const {
        postId
    } = params;

    const post = await getDetail(postId);

    if (!post || !post.title) {
        return "Untitled";
    }

    const description = post.content.replace(/(<([^>]+)>)/gi, '').slice(0, 100) + '...';
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
            locate: 'ja_JP',
            type: 'article'
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images,
            site: Metadata.twitterId,
        }
    };
}

export default async function StaticDetailPage(props: Props): Promise<JSX.Element> {
    const params = await props.params;

    const {
        postId
    } = params;

    const post = await getDetail(postId);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <ShareTree url={`${Metadata.baseUrl}/blog/${postId}`} title={post.title + ' | ' + Metadata.title}/>
            <div className={styles.contents}>
                <article className={styles.article}>
                    <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                    <div className={styles.info}>
                        <span className={styles.date}><DateFormatter date={post.publishedAt} /></span>
                        <span className={styles.category}><Link href={'/category/' + post.category.id}>{post.category.name}</Link></span>
                    </div>
                    <h1>{post.title}</h1>
                    <div className="prose">{parse(post.content)}</div>
                </article>
                <Comments postId={postId}/>
            </div>
            <Aside />
        </div>
    );
}
