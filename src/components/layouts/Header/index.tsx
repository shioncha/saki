import Link from "next/link";

import { HeaderNav } from "@/components/elements/HeaderNav";
import { HeaderSearchButton } from "@/components/elements/HeaderSearchButton";
import Metadata from "@/const/meta";
import { getCategoryList } from "@/lib/microcms";

import styles from "./Header.module.css";

export async function Header() {
  const { contents: categories } = await getCategoryList();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HeaderSearchButton />
        <Link href="/" className={styles.logoLink}>
          <h1 className={styles.logo}>{Metadata.title}</h1>
        </Link>
      </div>
      <HeaderNav categories={categories} />
    </header>
  );
}
