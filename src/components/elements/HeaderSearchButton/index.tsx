import Link from "next/link";
import { CiSearch } from "react-icons/ci";

import styles from "./HeaderSearchButton.module.css";

export function HeaderSearchButton() {

  return (
    <>
      <Link href="/search" className={styles.button}>
        <CiSearch size={40} />
        <span className={styles.caption}>Search</span>
      </Link>
    </>
  );
}
