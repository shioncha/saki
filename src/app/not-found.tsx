import { Metadata as NextMetadata } from "next";
import { Footer } from "@/components/layouts/footer";
import "./globals.css";
import styles from "./not-found.module.css";

export function generateMetadata(): NextMetadata {
  return {
    title: "404 Not Found",
  };
}

export default function NotFound() {
  return (
    <html lang="ja">
      <body>
        <main className={styles.main}>
          <h1>404 Not Found</h1>
          <p>お探しのページは見つかりませんでした。</p>
          <a href="/">トップページに戻る</a>
        </main>
        <Footer />
      </body>
    </html>
  )
}