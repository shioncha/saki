import { MicroCMSQueries } from "microcms-js-sdk";
import Link from 'next/link'

import Metadata from '@/const/meta';
import { getList } from "@/lib/microcms";

import styles from './footer.module.css'

export async function Footer() {
    const queries: MicroCMSQueries = {
        filters: 'category[equals]page',
        limit: 12,
    }
    const { contents } = await getList(queries);
    return (
        <footer className={styles.footer}>
            <div className={styles.navigation}>
                <ul>
                    {contents.map((content) => {
                        return (
                            <li key={content.id}>
                                <Link href={`/${content.id}`}>{content.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <p>&copy; {new Date().getFullYear()} {Metadata.title}</p>
        </footer>
    )
}