import Link from "next/link";
import { SiMisskey } from "react-icons/si";
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

    const encodedUrl = encodeURIComponent(url);
    const link = `https://misskey-hub.net/share/?text=[${title}](${encodedUrl})&visibility=public&localOnly=0&manualInstance=https:%2F%2Fmisskey.backspace.fm`;

    return (
        <Link href={link} target="_blank" rel="noopener noreferrer">
            <div className={styles.icon}>
                <SiMisskey color='white' size={24}/>
            </div>
        </Link>
    )
}