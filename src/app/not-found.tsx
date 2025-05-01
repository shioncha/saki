import { Metadata as NextMetadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layouts/footer";

import styles from "./not-found.module.css";

export function generateMetadata(): NextMetadata {
  return {
    title: "404 Not Found",
  };
}

export default function NotFound() {
  return (
    <body>
      <main className={styles.main}>
        <h1>404 Not Found</h1>
        <p>お探しのページは見つかりませんでした。</p>
        <Link href="/">トップページに戻る</Link>
      </main>
      <Footer />
    </body>
  );
}
