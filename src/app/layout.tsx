import { Metadata as NextMetadata } from "next";
import Metadata from '@/const/meta'

export const metadata: NextMetadata = {
    metadataBase: new URL(Metadata.baseUrl),
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>{children}</>
    )
}