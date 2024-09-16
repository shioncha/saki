"use client";

import { useEffect } from "react";
import * as tocbot from "tocbot";

export const Toc = () => {
    useEffect(() => {
        tocbot.init({
            // 目次を表示させたいところのクラス名
            tocSelector: ".toc",
            // どこから目次を作成するか
            contentSelector: ".prose",
            // どの見出しを目次にするか
            headingSelector: "h2, h3",
        });
        return () => tocbot.destroy();
    }, []);

    return (
        // tocSelectorの対象
        <div className="toc"></div>
    );
};