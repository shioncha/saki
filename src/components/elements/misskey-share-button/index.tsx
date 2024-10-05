import { SiMisskey } from "react-icons/si";
import styles from "./MisskeyShare.module.css";

interface Props {
    url: string;
    title: string;
}

export function MisskeyShare({ url, title }: Props): JSX.Element | null {
    if (!url || !title) return null;

    const encodedUrl = encodeURIComponent(url);
    const link = `https://misskey-hub.net/share/?text=[${title}](${encodedUrl})&visibility=public&localOnly=0`;

    return (
        <button className={styles.icon} onClick={() => window.open(link, '_blank')}>
            <SiMisskey color='white' size={24}/>
        </button>
    );
}
