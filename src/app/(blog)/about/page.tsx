import { notFound } from "next/navigation";
import { getDetail, getList } from "@/lib/microcms";
import parse from "html-react-parser";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ShareTree } from "@/components/layouts/share";
import { Thumbnail } from "@/components/elements/thumbnail";
import styles from "./page.module.css";

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

export async function generateMetadata () {
    const postId = 'about';
    const post = await getDetail(postId);

    if (!post || !post.title) {
        return "Untitled";
    }

    return {
        title: post.title,
    };
}

export default async function StaticDetailPage() {
    const postId = 'about';
    const post = await getDetail(postId);

    if (!post) {
        notFound();
    }

    return (
        <article className={styles.container}>
            <ShareTree url={'https://mixne.net/' + postId} title={post.title}/>
            <div className={styles.article}>
                <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                <h1>{post.title}</h1>
                <div>{parse(post.content)}</div>
                <p>最終更新：{dayjs.utc(post.updatedAt).tz('Asia/Tokyo').format('YYYY年MM月DD日')}</p>
            </div>
        </article>
    );
}