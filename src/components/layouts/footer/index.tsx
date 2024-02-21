import styles from './footer.module.css'
import Link from 'next/link'
import Metadata from '@/const/meta';

export function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.navigation}>
                <ul>
                    <li><Link href="/about">このサイトについて</Link></li>
                    <li><Link href="/contact">お問い合わせ</Link></li>
                    <li><Link href="/privacy">プライバシーポリシー</Link></li>
                </ul>
            </div>
            <p>&copy; {new Date().getFullYear()} {Metadata.title}</p>
        </footer>
    )
}