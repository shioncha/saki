export const dynamicParams = false;
import parse from "html-react-parser";
import { MicroCMSQueries } from "microcms-js-sdk";
import { notFound } from "next/navigation";

import { DateFormatter } from "@/components/elements/dateFormatter";
import { Thumbnail } from "@/components/elements/thumbnail";
import { ShareTree } from "@/components/layouts/share";
import Metadata from "@/const/meta";
import { getDetail, getList } from "@/lib/microcms";

import styles from "./page.module.css";

interface Props {
    params: {
        postId: string;
    }
}

export async function generateStaticParams() {
    const queries: MicroCMSQueries = {
        filters: 'category[equals]page',
        limit: 12,
    }
    const { contents } = await getList(queries);

    const paths = contents.map((post) => {
        return {
            postId: post.id,
        };
    });

    return [...paths];
}

export async function generateMetadata ({
    params: {postId},
}: Props) {
    const post = await getDetail(postId);

    if (!post || !post.title) {
        return "Untitled";
    }

    return {
        title: post.title,
        alternates: {
            canonical: `${Metadata.baseUrl}/${postId}`,
        }
    };
}

export default async function StaticDetailPage({
    params: {postId},
}: Props): Promise<JSX.Element> {
    const post = await getDetail(postId);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.container}>
            <ShareTree url={`${Metadata.baseUrl}/${postId}`} title={post.title}/>
            <div className={styles.article}>
                <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                <h1>{post.title}</h1>
                <div>{parse(post.content)}</div>
                <p>最終更新：<DateFormatter date={post.publishedAt} /></p>
            </div>
        </article>
    );
}
