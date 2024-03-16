import { getList } from "@/lib/microcms";
import PostPreview from "@/components/elements/postPreview";
import styles from "./page.module.css";

export default async function StaticPage() {
  const { contents } = await getList();

  if (!contents || contents.length === 0) {
    return (
      <div className={styles.container}>
        <h1>No contents</h1>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {contents.map((post) => {
        return <PostPreview key={post.id} post={post} />
      })}
    </div>
  );
}