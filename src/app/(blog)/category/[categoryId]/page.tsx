export const dynamicParams = false;
import Link from "next/link";
import { getList, getCategoryList } from "@/lib/microcms";
import { Thumbnail } from "@/components/elements/thumbnail";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MicroCMSQueries} from "microcms-js-sdk";
import styles from "./page.module.css"

dayjs.extend(utc);
dayjs.extend(timezone);

const getCategoryName = async (categoryId: string) => {
    const { contents } = await getCategoryList();
    const category: any = contents.find((a) => a.id === categoryId);
    const categoryName: string = category.name;
    return categoryName;
}

export async function generateStaticParams() {
    const { contents } = await getCategoryList();

    const paths = contents.map((category) => {
        return {
            categoryId: category.id,
        };
    });

    return [...paths];
}

export async function generateMetadata ({
    params: {categoryId},
}: {
    params: {categoryId: string}
}) {
    const name = await getCategoryName(categoryId);
    if (!name) {
        return "Untitled";
    }

    return {
        title: `${name}`,
    };
}

export default async function StaticDetailPage({
    params: {categoryId},
}: {
    params: {categoryId: string}
}) {
    const queries: MicroCMSQueries = {
        filters: 'category[not_equals]page[and]category[equals]' + categoryId,
        limit: 10,
    }
    const { contents } = await getList(queries);
    
    if (!contents || contents.length === 0) {
        return <h1>No contents</h1>;
    }

    return (
        <>
            <div className={styles.header}>
                <span className={styles.icon}><AiTwotoneFolderOpen /></span>
                <span className={styles.headerTitle}>「{getCategoryName(categoryId)}」の記事一覧</span>
            </div>
            <div className={styles.container}>
            {contents.map((post) => {
            return (
                <article key={post.id}>
                    <Link href={`/blog/${post.id}`} className={styles.item}>
                    <Thumbnail url={post.eyecatch.url} alt="アイキャッチ" width={post.eyecatch.width} height={post.eyecatch.height}/>
                    <p>
                        <span className={styles.date}>{dayjs.utc(post.publishedAt).tz('Asia/Tokyo').format('YYYY.MM.DD')}</span>
                        <span className={styles.category}><Link href={`/category/${post.category.id}`}>{post.category.name}</Link></span>
                    </p>
                    <h1 className={styles.title}>{post.title}</h1>
                    </Link>
                </article>
                );
            })}
            </div>
        </>
    );
}