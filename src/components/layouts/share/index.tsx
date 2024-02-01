"use client"
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, PocketShareButton, PocketIcon } from "react-share"
import { MisskeyShare } from "@/components/elements/misskey-share-button"
import styles from "./share.module.css"

export function ShareTree(props) {
    return (
        <div className={styles.share0}>
            <div className={styles.share}>
                <div className={styles.shareInner}>
                    <div className={styles.buttons}>
                        <TwitterShareButton url={props.url} title={props.title}>
                            <TwitterIcon size={48} round={true} />
                        </TwitterShareButton>
                        <FacebookShareButton url={props.url} quote={props.title}>
                            <FacebookIcon size={48} round={true} />
                        </FacebookShareButton>
                        <PocketShareButton url={props.url} title={props.title}>
                            <PocketIcon size={48} round={true} />
                        </PocketShareButton>
                        <MisskeyShare url={props.url} title={props.title} />
                    </div>
                </div>
            </div>
        </div>
    )
}