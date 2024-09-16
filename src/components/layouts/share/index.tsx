"use client"
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, PocketShareButton, PocketIcon } from "react-share"
import { MisskeyShare } from "@/components/elements/misskey-share-button"
import styles from "./share.module.css"

interface Props {
    url: string;
    title: string;
}

export function ShareTree({ url, title }: Props): JSX.Element {
    return (
        <div className={styles.share0}>
            <div className={styles.share}>
                <div className={styles.shareInner}>
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
                        <MisskeyShare url={url} title={title} />
                    </div>
                </div>
            </div>
        </div>
    )
}
