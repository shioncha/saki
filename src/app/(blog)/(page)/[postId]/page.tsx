export const dynamicParams = false;
import { notFound } from "next/navigation";
import { getDetail, getList } from "@/lib/microcms";
import { MicroCMSQueries } from "microcms-js-sdk";
import parse from "html-react-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ShareTree } from "@/components/layouts/share";
import { Thumbnail } from "@/components/elements/thumbnail";
import styles from "./page.module.css";
import Metadata from "@/const/meta";

dayjs.extend(utc);
dayjs.extend(timezone);

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

export async function generateMetadata (
    params: { postId: string }
) {
    const postId = params.postId;
    const post = await getDetail(postId);

    if (!post || !post.title) {
        return "Untitled";
    }

    return {
        title: post.title,
    };
}

export default async function StaticDetailPage({
    params: {postId},
}: {
    params: {postId: string}
}) {
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
                <p>最終更新：{dayjs.utc(post.updatedAt).tz('Asia/Tokyo').format('YYYY年MM月DD日')}</p>
            </div>
        </article>
    );
}