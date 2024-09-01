import Metadata from "@/const/meta";
import { Metadata as NextMetadata } from "next";

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
    return <>{children}</>;
}