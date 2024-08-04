export const dynamicParams = false;
import { getList, getCategoryList } from "@/lib/microcms";
import PostPreview from "@/components/elements/postPreview";
import { AiTwotoneFolderOpen } from "react-icons/ai";
import { MicroCMSQueries} from "microcms-js-sdk";
import styles from "./page.module.css"

const getCategoryName = async (categoryId: string): Promise<string> => {
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
        fields: 'id,title,eyecatch,category,publishedAt',
        filters: `category[not_equals]page[and]category[equals]${categoryId}`,
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
                <span className={styles.headerTitle}>「{await getCategoryName(categoryId)}」の記事一覧</span>
            </div>
            <div className={styles.container}>
                {contents.map((post) => {
                    return <PostPreview key={post.id} post={post} />
                })}
            </div>
        </>
    );
}