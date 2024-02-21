import styles from "./thumbnail.module.css";
import Image from "next/image";

export function Thumbnail({ url, alt, width, height }: { url: string; alt: string; width?: number; height?: number }) {
    return (
        <div className={styles.container}>
            <Image src={url} alt={alt} width={width} height={height} className={styles.thumbnail}/>
        </div>
    )
}