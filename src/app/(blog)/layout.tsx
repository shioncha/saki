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
    images: 'https://images.microcms-assets.io/assets/588230be7be04d1cb6dd739d6e576762/585bac4eea3549f68173aef32d1756f4/no_image.png', // TODO: 後で適当な画像に置き換える
    url: Metadata.baseUrl,
    siteName: Metadata.title,
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: Metadata.title,
    description: Metadata.description,
    images: 'https://images.microcms-assets.io/assets/588230be7be04d1cb6dd739d6e576762/585bac4eea3549f68173aef32d1756f4/no_image.png', // TODO: 後で適当な画像に置き換える
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