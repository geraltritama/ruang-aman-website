import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ruang Aman untuk Kita — Perempuan Kuat",
  description:
    "Kuesioner interaktif untuk mengukur tingkat rasa aman perempuan. Temukan di mana kamu berada dan langkah apa yang bisa diambil.",
  keywords: ["ruang aman", "perempuan", "keamanan", "kuesioner", "kuat", "perlindungan perempuan"],
  openGraph: {
    title: "Ruang Aman untuk Kita — Perempuan Kuat",
    description: "Kuesioner interaktif untuk mengukur tingkat rasa aman perempuan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
