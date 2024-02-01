import Link from "next/link";
import styles from "./aside.module.css";
import { SiRss, SiFeedly, SiTwitter } from "@icons-pack/react-simple-icons";
import Metadata from "@/const/meta";

export function Aside() {
    const feedlyUrl = `https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2F${Metadata.baseUrl}%2Ffeed`

    return (
        <aside className={styles.aside}>
            <div className={styles.toc}>
                <p className={styles.title}>目次</p>
                <div className={styles.contentContainer}>
                    
                </div>
            </div>
            <div>
                <p className={styles.title}>Follow</p>
                <div className={styles.contentContainer}>
                    <ul className={styles.icons}>
                        <li>
                            <Link href="/feed">
                                <div className={styles.icon}>
                                    <SiRss color="default" size={24}/>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <a href={feedlyUrl} target="_blank" rel="noopener noreferrer">
                                <div className={styles.icon}>
                                    <SiFeedly color="default" size={24}/>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href={"https://twitter.com/" + Metadata.twitterId} target="_blank" rel="noopener noreferrer">
                                <div className={styles.icon}>
                                    <SiTwitter color="default" size={24} />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
}