import Link from "next/link";
import type { JSX } from "react";
import { FaTwitter } from "react-icons/fa";
import { SiFeedly,SiRss } from "react-icons/si";

import { Toc } from "@/components/elements/toc";
import Metadata from "@/const/meta";

import styles from "./aside.module.css";

export function Aside(): JSX.Element {
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
                                            <SiRss color="#FFA500" size={24}/>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <a href={feedlyUrl} target="_blank" rel="noopener noreferrer">
                                        <div className={styles.icon}>
                                            <SiFeedly color="#2BB24C" size={24}/>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href={"https://twitter.com/" + Metadata.twitterId} target="_blank" rel="noopener noreferrer">
                                        <div className={styles.icon}>
                                            <FaTwitter color="#1DA1F2" size={24} />
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
