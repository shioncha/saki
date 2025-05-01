import Link from "next/link";

import { HeaderNav } from "@/components/elements/HeaderNav";
import { HeaderSearchButton } from "@/components/elements/HeaderSearchButton";
import Metadata from "@/const/meta";

import styles from "./header.module.css";

export async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <HeaderSearchButton />
        <Link href="/" className={styles.logo}>
          <h1>{Metadata.title}</h1>
        </Link>
      </div>
      <HeaderNav />
    </header>
  );
}
