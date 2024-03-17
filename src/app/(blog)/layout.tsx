import { Metadata as NextMetadata } from "next";
import Metadata from "@/const/meta"
import "@/app/globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

export const metadata: NextMetadata = {
  title: {
    default: Metadata.title,
    template: `%s | ${Metadata.title}`,
  },
  description: Metadata.description,
  openGraph: {
    title: {
      default: Metadata.title,
      template: `%s | ${Metadata.title}`,
    },
    description: Metadata.description,
    url: Metadata.baseUrl,
    siteName: Metadata.title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: Metadata.title,
    description: Metadata.description,
    site: Metadata.twitterId,
    creator: Metadata.twitterId,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}