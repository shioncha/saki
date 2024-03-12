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
import { Comments } from "@/components/elements/comments";

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
            <ShareTree url={`${Metadata.baseUrl}/blog/${postId}`} title={post.title + ' | ' + Metadata.title}/>
            <div className={styles.contents}>
                <article className={styles.article}>
                    <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                    <div className={styles.info}>
                        <span className={styles.date}>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
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