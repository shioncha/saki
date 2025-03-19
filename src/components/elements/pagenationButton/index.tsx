import Link from "next/link";

import styles from "./styles.module.css";

interface Props {
  current: number;
  total: number;
}

export function PagenationButton({current, total}: Props) {
  return (
    <ul className={styles.list}>
      {Array.from({ length: total }).map((_, i) => {
        return (
          <li key={i}  className={styles.item}>
            <Link href={i == 0 ? '/' : `/blog/page/${i + 1}`} className={`${styles.link} ${i + 1 == current ? styles.isActive : styles.item}`}>
              {i + 1}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}