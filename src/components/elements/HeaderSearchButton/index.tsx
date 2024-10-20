import Link from "next/link";
import styles from "./HeaderSearchButton.module.css";
import { CiSearch } from "react-icons/ci";

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
