import Link from "next/link";
import { SiMisskey } from "@icons-pack/react-simple-icons"
import styles from "./MisskeyShare.module.css";

export function MisskeyShare({
    url,
    title,
}: {
    url: string;
    title: string;
}) {
    if (!url || !title) {
        return;
    }

    const link = `https://misskey.io/share?text=[${title}](${url})`;

    return (
        <Link href={link}>
            <div className={styles.icon}>
                <SiMisskey color='white' size={24}/>
            </div>
        </Link>
    )
}