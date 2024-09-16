import Link from "next/link";
import { SiMisskey } from "react-icons/si";
import styles from "./MisskeyShare.module.css";

interface Props {
    url: string;
    title: string;
}

export function MisskeyShare({ url, title }: Props): JSX.Element | null {
    if (!url || !title) {
        return null;
    }

    const encodedUrl = encodeURIComponent(url);
    const link = `https://misskey-hub.net/share/?text=[${title}](${encodedUrl})&visibility=public&localOnly=0&manualInstance=https:%2F%2Fmisskey.backspace.fm`;

    return (
        <Link href={link} target="_blank" rel="noopener noreferrer">
            <div className={styles.icon}>
                <SiMisskey color='white' size={24}/>
            </div>
        </Link>
    );
}
