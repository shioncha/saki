import Link from "next/link";
import styles from "./aside.module.css";
import { SiRss, SiFeedly, SiTwitter } from "@icons-pack/react-simple-icons";
import Metadata from "@/const/meta";
import { Toc } from "@/components/elements/toc";

export function Aside() {
    const encodedUrl = encodeURIComponent(Metadata.baseUrl);
    const feedlyUrl = `https://feedly.com/i/subscription/feed%2F${encodedUrl}%2Ffeed`

    return (
        <aside className={styles.aside}>
            <div className={styles.container}>
                <div className={styles.sticky}>
                    <div className={styles.toc}>
                        <p className={styles.title}>Contents</p>
                        <div className={styles.content}>
                            <Toc />
                        </div>
                    </div>
                    <div className={styles.follow}>
                        <p className={styles.title}>Follow</p>
                        <div className={styles.content}>
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
                </div>
            </div>
        </aside>
    );
}