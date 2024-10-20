import Link from 'next/link'
import { getCategoryList } from '@/lib/microcms'

export async function HeaderNav() {
    const { contents } = await getCategoryList();

    return (
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
    )
}
