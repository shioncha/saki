"use client";
import type { JSX } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  PocketIcon,
  PocketShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

import { MisskeyShareButton } from "@/components/elements/MisskeyShareButton";

import styles from "./share.module.css";

interface Props {
  url: string;
  title: string;
}

export function ShareTree({ url, title }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.share}>
        <div className={styles.buttons}>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={48} round={true} />
          </TwitterShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={48} round={true} />
          </FacebookShareButton>
          <PocketShareButton url={url} title={title}>
            <PocketIcon size={48} round={true} />
          </PocketShareButton>
          <MisskeyShareButton url={url} title={title} />
        </div>
      </div>
    </div>
  );
}
