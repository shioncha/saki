import Image from "next/image";

import styles from "./thumbnail.module.css";

interface Props {
    url: string;
    alt: string;
    width?: number;
    height?: number;
}

export function Thumbnail({ url, alt, width, height }: Props): JSX.Element {
    return (
        <div className={styles.container}>
            <Image src={url} alt={alt} width={width} height={height} className={styles.thumbnail}/>
        </div>
    )
}
