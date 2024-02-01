import { Metadata as NextMetadata } from "next";
import Metadata from "@/const/meta"
import "@/app/globals.css";

export const metadata: NextMetadata = {
  title: {
    default: Metadata.title,
    template: `%s | ${Metadata.title}`,
  },
  description: Metadata.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}