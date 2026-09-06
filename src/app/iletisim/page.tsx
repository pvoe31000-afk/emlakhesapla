import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "İletişim",
  description: "emlakhesapla.com ile iletişime geçin. Soru, öneri ve geri bildirimleriniz için bize ulaşın.",
};

export default function Iletisim() {
  return (
    <>
      <section className="section" aria-labelledby="heading">
        <div className="container max-w-3xl">
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-foreground font-medium">İletişim</span>
            </nav>
            <h1 id="heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">İletişim</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Soru, öneri veya geri bildirimleriniz için bize ulaşabilirsiniz.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="card">
              <h2 className="card-title">E-posta</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Genel ve iş birliği sorularınız için:
              </p>
              <a href="mailto:info@emlakhesapla.com" className="link font-medium mt-2 inline-block">
                info@emlakhesapla.com
              </a>
              <div className="mt-6 border-t border-border pt-4">
                <h3 className="font-medium text-foreground text-sm">Yanıt Süresi</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mesajlarınıza en geç 2 iş günü içinde dönüş yapmaya çalışıyoruz.
                </p>
              </div>
            </div>

            <div className="card">
              <h2 className="card-title">Öneri ve Geri Bildirim</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Hesaplama araçlarımızla ilgili her türlü önerinizi ve karşılaştığınız sorunları paylaşabilirsiniz.
                Görüşleriniz, platformumuzu geliştirmemize yardımcı olur.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Teklif, reklam ve iş birliği için lütfen e-posta adresimiz üzerinden ulaşın.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-surface-alt rounded-lg border border-border text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Not:</strong> emlakhesapla.com bir yazılım ve bilgilendirme platformudur;
              vergi danışmanlığı, hukuki danışmanlık veya mali müşavirlik hizmeti sunmamaktadır. Hesaplama ve hukuki
              konularda ilgili uzmanlara danışınız.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}