import Link from 'next/link'
import styles from './header.module.css'
import { getCategoryList } from '@/lib/microcms'
import Metadata from '@/const/meta';

export async function Header() {
    const { contents } = await getCategoryList();

    return (
        <header className={styles.header}>
            <Link href="/"><h1>{Metadata.title}</h1></Link>
            <ul>
                <li><Link href="/">Home</Link></li>
                {contents.map((content) => {
                    return (
                        <li key={content.id}>
                            <Link href={`/category/${content.id}`}>{content.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </header>
    )
}
