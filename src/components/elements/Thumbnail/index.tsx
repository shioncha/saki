import { MicroCMSImage } from "microcms-js-sdk";
import Image from "next/image";
import type { JSX } from "react";

import styles from "./Thumbnail.module.css";

type ThumbnailProps = MicroCMSImage;

export function Thumbnail({
  url,
  alt,
  width,
  height,
}: ThumbnailProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Image
        src={url}
        alt={alt || ""}
        width={width}
        height={height}
        className={styles.thumbnail}
      />
    </div>
  );
}
