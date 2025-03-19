import { Metadata as NextMetadata } from "next";

import Metadata from "@/const/meta";

export const metadata: NextMetadata = {
    title: {
        default: Metadata.title,
        template: `%s | ${Metadata.title}`,
    },
    metadataBase: new URL(Metadata.baseUrl),
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            {children}
        </html>
    );
}