import Link from "next/link";
import type { JSX } from "react";
import { SiFeedly, SiRss } from "react-icons/si";

import { TableOfContents } from "@/components/elements/TableOfContents";
import Metadata from "@/const/meta";

import styles from "./ArticleNavigation.module.css";

export function ArticleNavigation(): JSX.Element {
  const encodedUrl = encodeURIComponent(Metadata.baseUrl);
  const feedlyUrl = `https://feedly.com/i/subscription/feed%2F${encodedUrl}%2Ffeed`;

  return (
    <aside className={styles.aside}>
      <div className={styles.container}>
        <div className={styles.sticky}>
          <div className={styles.toc}>
            <p className={styles.title}>Contents</p>
            <div className={styles.content}>
              <TableOfContents />
            </div>
          </div>
          <div className={styles.follow}>
            <p className={styles.title}>Follow</p>
            <div className={styles.content}>
              <ul className={styles.icons}>
                <li>
                  <Link
                    href="/feed"
                    aria-label="RSSで購読する"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.icon}>
                      <SiRss color="#FFA500" size={24} />
                    </div>
                  </Link>
                </li>
                <li>
                  <a
                    href={feedlyUrl}
                    aria-label="Feedlyで購読する"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className={styles.icon}>
                      <SiFeedly color="#2BB24C" size={24} />
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
