import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Fraunces } from "next/font/google";
import HeaderMegaMenu from "./components/HeaderMegaMenu";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f8fc",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://emlakhesapla.com"),
  title: {
    default: "emlakhesapla.com - Emlak Hesaplayıcılarınız",
    template: "%s | emlakhesapla.com",
  },
  description: "Tapu harcı, emlakçı komisyonu, konut kredisi taksiti, kira stopajı, değer artış kazancı vergisi, emlak vergisi, kira artış oranı, toplam satış maliyeti ve kira getirisi hesaplama araçları. Hızlı, güvenilir, ücretsiz.",
  keywords: [
    "tapu harcı hesaplama",
    "emlakçı komisyonu hesaplama",
    "konut kredisi taksit hesaplama",
    "kira stopajı hesaplama",
    "değer artış kazancı vergisi",
    "emlak vergisi hesaplama",
    "kira artış oranı hesaplama",
    "toplam satış maliyeti hesaplama",
    "kira getirisi hesaplama",
    "emlak hesaplayıcı",
    "amortisman hesaplama",
  ],
  authors: [{ name: "emlakhesapla.com" }],
  creator: "emlakhesapla.com",
  publisher: "emlakhesapla.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://emlakhesapla.com",
    siteName: "emlakhesapla.com",
    title: "emlakhesapla.com - Emlak Hesaplayıcılarınız",
    description: "Tapu harcı, komisyon, konut kredisi taksiti, kira stopajı, değer artış kazancı vergisi, emlak vergisi, kira artış oranı, toplam satış maliyeti ve kira getirisi hesaplama araçları.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "emlakhesapla.com - Emlak Hesaplayıcılarınız",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "emlakhesapla.com - Emlak Hesaplayıcılarınız",
    description: "Tapu harcı, komisyon, konut kredisi taksiti, kira stopajı, değer artış kazancı vergisi, emlak vergisi, kira artış oranı, toplam satış maliyeti ve kira getirisi hesaplama araçları.",
    images: ["/og-image.png"],
    creator: "@emlakhesapla",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`h-full antialiased ${fraunces.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 btn btn-primary"
        >
          Ana içeriğe atla
        </a>
        <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="container">
            <div className="flex items-center justify-between h-14 gap-6">
              <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground hover:opacity-80 transition-opacity" aria-label="emlakhesapla.com - Ana sayfa">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="text-foreground font-bold">emlakhesapla.com</span>
              </Link>
              <div className="flex items-center gap-4">
                <HeaderMegaMenu />
                <Link
                  href="/iletisim"
                  className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>İletişim</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <footer className="border-t border-border bg-background" role="contentinfo">
          <div className="container py-10">
            <div className="grid gap-8 md:grid-cols-4">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-foreground" aria-label="emlakhesapla.com - Ana sayfa">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
<span className="text-foreground font-bold">emlakhesapla.com</span>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground max-w-xs">
                  Emlak profesyonelleri ve bireysel kullanıcılar için güvenilir, hızlı ve ücretsiz hesaplama araçları.
                </p>
              </div>
              <nav aria-label="Hesaplayıcılar">
                <h3 className="font-medium text-foreground mb-3">Hesaplayıcılar</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/tapu-harci-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Tapu Harcı Hesaplama</a></li>
                  <li><a href="/komisyon-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Emlakçı Komisyonu</a></li>
                  <li><a href="/kira-stopaji-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Kira Stopajı</a></li>
                  <li><a href="/deger-artisi-kazanci-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Değer Artışı Kazancı Vergisi</a></li>
                  <li><a href="/emlak-vergisi-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Emlak Vergisi</a></li>
                  <li><a href="/kira-artis-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Kira Artış Oranı</a></li>
                  <li><a href="/konut-kredisi-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Konut Kredisi Taksit</a></li>
                  <li><a href="/toplam-satis-maliyeti-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Toplam Satış/Alım Maliyeti</a></li>
                  <li><a href="/kira-getirisi-hesaplama" className="text-muted-foreground hover:text-foreground transition-colors">Kira Getirisi (Amortisman)</a></li>
                </ul>
              </nav>
              <nav aria-label="Kurumsal">
                <h3 className="font-medium text-foreground mb-3">Kurumsal</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/hakkimizda" className="text-muted-foreground hover:text-foreground transition-colors">Hakkımızda</a></li>
                  <li><a href="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">İletişim</a></li>
                  <li><a href="/gizlilik-politikasi" className="text-muted-foreground hover:text-foreground transition-colors">Gizlilik Politikası</a></li>
                  <li><a href="/kullanim-sartlari" className="text-muted-foreground hover:text-foreground transition-colors">Kullanım Şartları</a></li>
                </ul>
              </nav>
            </div>
            <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} emlakhesapla.com. Tüm hakları saklıdır.</p>
              <p>Bu site bilgilendirme amaçlıdır, yasal danışmanlık değildir.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}