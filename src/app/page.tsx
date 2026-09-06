import Link from "next/link";
import { Metadata } from "next";
import { calculatorCategories, calculators } from "../lib/calculators";
import Reveal from "./components/Reveal";

export const metadata: Metadata = {
  title: "Emlak Hesaplayıcılarınız - Tapu Harcı, Komisyon, Kredi, Stopaj ve Kira",
  description: "Tapu harcı, emlakçı komisyonu, konut kredisi taksiti, kira stopajı, değer artış kazancı vergisi, emlak vergisi, kira artışı, toplam satış maliyeti ve kira getirisi hesaplama araçları. Hızlı, güvenilir, ücretsiz.",
  openGraph: {
    title: "emlakhesapla.com - Emlak Hesaplayıcılarınız",
    description: "Tapu harcı, komisyon, konut kredisi, stopaj, değer artış kazancı, emlak vergisi, kira artışı, toplam maliyet ve kira getirisi hesaplama araçları.",
    type: "website",
  },
};

const icons: Record<string, React.ReactNode> = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  handshake: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 16V5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v11" />
      <path d="M15 9h-9" />
      <path d="M15 3h-9" />
      <path d="M10 21h.01" />
      <path d="M14 21h.01" />
      <path d="M22 21v-3a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
      <path d="M8 16V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11" />
      <path d="M9 9h9" />
      <path d="M9 3h9" />
    </svg>
  ),
  receipt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  "trending-up": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  bank: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V7" />
      <path d="M19 21V7" />
      <path d="M5 7h14l-7-4-7 4z" />
      <path d="M9 7v7" />
      <path d="M15 7v7" />
    </svg>
  ),
  calculator: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="8" y2="10.01" />
      <line x1="12" y1="10" x2="12" y2="10.01" />
      <line x1="16" y1="10" x2="16" y2="10.01" />
      <line x1="8" y1="14" x2="8" y2="14.01" />
      <line x1="12" y1="14" x2="12" y2="14.01" />
      <line x1="16" y1="14" x2="16" y2="14.01" />
      <line x1="8" y1="18" x2="8" y2="18.01" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
      <line x1="16" y1="18" x2="16" y2="18.01" />
    </svg>
  ),
  percent: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="5" x2="5" y2="19" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  ),
};

const calculatorOrder = new Map(calculators.map((calc, index) => [calc.slug, index]));

export default function Home() {
  return (
    <>
      <section className="section relative overflow-hidden" aria-labelledby="hero-heading">
        <div className="pointer-events-none absolute inset-0 text-primary opacity-5" aria-hidden="true">
          <svg className="absolute -right-24 -top-24 h-[420px] w-[420px]" viewBox="0 0 300 300" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="150" cy="150" r="60" />
            <circle cx="150" cy="150" r="120" />
            <circle cx="150" cy="150" r="180" />
            <line x1="150" y1="0" x2="150" y2="300" />
            <line x1="0" y1="150" x2="300" y2="150" />
          </svg>
          <svg className="absolute -left-24 bottom-0 h-[240px] w-[320px]" viewBox="0 0 120 90" fill="currentColor">
            <defs>
              <pattern id="hero-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" />
              </pattern>
            </defs>
            <rect width="120" height="90" fill="url(#hero-dots)" />
          </svg>
        </div>
        <div className="container relative">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <header className="max-w-xl">
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 700 }}
              >
                Emlak Hesaplayıcılarınız
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Tapu harcından kira getirisine, emlak vergisinden kredi taksitine kadar ihtiyacınız olan tüm hesaplamalar
                tek bir yerde. Ücretsiz ve anında sonuç.
              </p>
              <div className="mt-8">
                <Link href="#hesaplayicilar" className="btn btn-primary">
                  Hesaplayıcıları Keşfet
                </Link>
              </div>
            </header>
            <div className="grid grid-cols-3 gap-3">
              <Reveal>
                <div className="card card-compact text-center">
                  <div className="text-2xl font-bold text-primary">9</div>
                  <p className="mt-1 text-xs font-medium text-foreground">Hesaplama Aracı</p>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="card card-compact text-center">
                  <div className="text-2xl font-bold text-primary">%100</div>
                  <p className="mt-1 text-xs font-medium text-foreground">Ücretsiz Kullanım</p>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="card card-compact text-center">
                  <div className="text-2xl font-bold text-primary">Güncel</div>
                  <p className="mt-1 text-xs font-medium text-foreground">Güncel Vergi ve Harç Oranlarıyla</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section id="hesaplayicilar" className="section scroll-mt-20" aria-labelledby="calculators-heading">
          <div className="container">
            <header className="section-header">
              <h2 id="calculators-heading" className="section-title">Hesaplama Araçları</h2>
              <p className="section-description">
                En çok ihtiyaç duyulan 9 emlak hesaplama aracı tek çatı altında. Her araç güncel mevzuata uygun, anlık sonuç verir.
              </p>
            </header>
            <div className="mt-10 space-y-12">
              {calculatorCategories.map((cat) => {
                const items = calculators.filter((calc) => calc.category === cat.id);
                return (
                  <div key={cat.id}>
                    <h3 className="text-lg font-bold text-secondary mb-4">{cat.title}</h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((calc) => (
                        <Reveal
                          key={calc.slug}
                          className="h-full"
                          delay={(calculatorOrder.get(calc.slug) ?? 0) * 60}
                        >
                          <article className="card group h-full transition-colors">
                            <Link href={`/${calc.slug}`} className="block" aria-label={`${calc.name} sayfasına git`}>
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center" aria-hidden="true">
                                  {icons[calc.icon]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                                      {calc.name}
                                    </h4>
                                    {calc.popular && (
                                      <span className="badge text-xs">Popüler</span>
                                    )}
                                  </div>
                                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                    {calc.shortDesc}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm font-medium text-secondary group-hover:underline">
                                  Hesapla
                                </span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-secondary transition-colors" aria-hidden="true">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                  <polyline points="12 5 19 12 12 19" />
                                </svg>
                              </div>
                            </Link>
                          </article>
                        </Reveal>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="how-it-works-heading">
          <div className="container">
            <header className="section-header">
              <h2 id="how-it-works-heading" className="section-title">Nasıl Çalışır?</h2>
              <p className="section-description">
                3 basit adımda emlak hesaplamalarınızı tamamlayın.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              <Reveal className="h-full">
                <div className="text-center p-4 h-full">
                  <div className="w-14 h-14 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="10" y1="11" x2="20" y2="11" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">1. Hesaplayıcı Seçin</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Yukarıdaki listeden ihtiyacınız olan hesaplama aracını seçin.</p>
                </div>
              </Reveal>
              <Reveal delay={80} className="h-full">
                <div className="text-center p-4 h-full">
                  <div className="w-14 h-14 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 17h8" />
                      <path d="M8 21h8" />
                      <path d="M12 17v4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">2. Bilgileri Girin</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Gerekli alanları doldurun (satış bedeli, kira tutarı, tarihler vb.).</p>
                </div>
              </Reveal>
              <Reveal delay={160} className="h-full">
                <div className="text-center p-4 h-full">
                  <div className="w-14 h-14 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">3. Sonucu Alın</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Anlık hesaplanan sonucu görün, detaylı kırılımı inceleyin.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="why-us-heading">
          <div className="container">
            <header className="section-header text-center">
              <h2 id="why-us-heading" className="section-title">Neden emlakhesapla.com?</h2>
              <p className="section-description mx-auto">
                Profesyoneller ve bireysel kullanıcılar tarafından güvenilen hesaplama platformu.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              <Reveal className="h-full">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Güncel Mevzuat</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Tüm hesaplamalar güncel resmi oranlar ve vergilendirme düzenlemeleriyle yapılır.</p>
                </div>
              </Reveal>
              <Reveal delay={80} className="h-full">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Anlık Sonuç</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Sayfa yenilenmeden, form alanlarını doldururken gerçek zamanlı sonuç görün.</p>
                </div>
              </Reveal>
              <Reveal delay={160} className="h-full">
                <div className="card text-center h-full">
                  <div className="w-12 h-12 rounded-lg bg-surface-alt flex items-center justify-center mx-auto mb-4 text-secondary" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">Gizlilik Öncelikli</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Verileriniz sunucuya gönderilmez, hesaplamalar tarayıcınızda yapılır.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="adsense-top">
          <div className="container">
            <div className="adsense-placeholder-lg" role="region" aria-label="Reklam alanı">
              <span>Reklam Alanı (728x90 / 970x90)</span>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="faq-heading">
        <div className="container max-w-3xl">
          <header className="section-header">
            <h2 id="faq-heading" className="section-title">Sık Sorulan Sorular</h2>
          </header>
          <dl className="space-y-4">
            <div className="faq-item">
              <dt className="faq-question">
                Hesaplamalar yasal olarak geçerli mi?
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </dt>
              <dd className="faq-answer">
                Hesaplamalar güncel mevzuat ve resmi oranlara dayanarak hazırlanmıştır. Ancak sonuçlar bilgilendirme amaçlıdır,
                yasal işlemlerinizde mutlaka bir mali müşaviriniz veya noterinizle görüşün.
              </dd>
            </div>
            <div className="faq-item">
              <dt className="faq-question">
                Verilerim kaydediliyor mu?
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </dt>
              <dd className="faq-answer">
                Hayır. Tüm hesaplamalar tarayıcınızda (client-side) yapılır. Hiçbir veri sunucumuza gönderilmez veya kaydedilmez.
              </dd>
            </div>
            <div className="faq-item">
              <dt className="faq-question">
                Oranlar ne sıklıkla güncelleniyor?
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </dt>
              <dd className="faq-answer">
                Resmi gazetede yayımlanan değişiklikler (tapu harcı oranları, emlak vergisi rayiç değerleri, TÜFE endeksleri vb.)
                takip edilerek düzenli olarak güncellenir.
              </dd>
            </div>
            <div className="faq-item">
              <dt className="faq-question">
                Mobil cihazlarda çalışıyor mu?
                <svg className="faq-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </dt>
              <dd className="faq-answer">
                Evet, site tamamen responsive tasarlanmıştır. Telefon, tablet ve masaüstünde sorunsuz çalışır.
              </dd>
            </div>
          </dl>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section" aria-labelledby="feedback-heading">
          <div className="container">
            <div className="rounded-lg border border-border bg-surface px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h2 id="feedback-heading" className="text-lg font-semibold text-foreground">
                  Geri Dönüşleriniz Bizim İçin Değerli
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Sorularınız veya önerileriniz için bize ulaşın.
                </p>
              </div>
              <Link href="/iletisim" className="btn btn-primary flex-shrink-0">
                İletişime Geç
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </>
  );
}