export const dynamicParams = false;
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDetail, getList } from "@/lib/microcms";
import parse from "html-react-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ShareTree } from "@/components/layouts/share";
import { Aside } from "@/components/layouts/aside";
import { Thumbnail } from "@/components/elements/thumbnail";
import styles from "./page.module.css";
import Metadata from "@/const/meta";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function generateStaticParams() {
    const { contents } = await getList();

    const paths = contents.map((post) => {
        return {
            postId: post.id,
        };
    });

    return [...paths];
}

export async function generateMetadata ({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const post = await getDetail(postId);

    if (!post || !post.title) {
        return "Untitled";
    }

    return {
        title: post.title,
    };
}

export default async function StaticDetailPage({
    params: { postId },
}: {
    params: { postId: string };
}) {
    const post = await getDetail(postId);

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <ShareTree url={'https://' + Metadata.baseUrl + '/blog/' + postId} title={post.title + ' | ' + Metadata.title}/>
            <article className={styles.article}>
                <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                <p>
                    <span>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
                    <span><Link href={'/category/' + post.category.id}>{post.category.name}</Link></span>
                </p>
                <h1>{post.title}</h1>
                <div>{parse(post.content)}</div>
            </article>
            <Aside />
        </div>
    );
}