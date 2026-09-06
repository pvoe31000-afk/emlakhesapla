import type { Metadata } from "next";
import Link from "next/link";
import KonutKredisiClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Konut Kredisi Taksit Hesaplama - Aylık Taksit ve Faiz",
  description: "Konut kredisi hesaplayıcı: Kredi tutarı, faiz oranı ve vadeye göre aylık taksit, toplam geri ödeme ve toplam faiz maliyetini anlık hesaplayın. Anüite formülü ile.",
  openGraph: {
    title: "Konut Kredisi Taksit Hesaplama",
    description: "Kredi tutarı ve vadeye göre aylık taksit ile toplam maliyeti saniyelerde hesaplayın.",
    type: "website",
  },
};

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/kira-stopaji-hesaplama", label: "Kira Stopajı Hesaplama" },
  { href: "/deger-artisi-kazanci-hesaplama", label: "Değer Artış Kazancı Vergisi" },
  { href: "/emlak-vergisi-hesaplama", label: "Emlak Vergisi Hesaplama" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Anüite (eşit taksit) yöntemi nedir?",
    answer: "Anüite yönteminde her ay ödenen taksit tutarı vade boyunca sabit kalır. Taksit içindeki faiz ve anapara dağılımı ise değişir: ilk dönemlerde faiz payı yüksekken, kredi ilerledikçe anapara payı artar. Konut kredilerinde en yaygın ödeme yöntemidir.",
  },
  {
    question: "Aylık taksit tutarını hangi faktörler belirler?",
    answer: "Aylık taksit, dört temel değişkene bağlıdır: kredi tutarı (anapara), yıllık faiz oranı, vade süresi (ay) ve hesaplama yöntemi. Faiz oranı veya vade değiştikçe taksit de değişir; kredi tutarı arttıkça taksit doğrusal olarak artar.",
  },
  {
    question: "Vade uzadıkça toplam maliyet neden artar?",
    answer: "Faiz, kalan anapara üzerinden işlediği için vade uzadıkça faiz ödediğiniz toplam ay sayısı artar. Kısa vade yüksek taksit ama düşük toplam faiz getirirken; uzun vade düşük taksit ama yüksek toplam maliyet demektir. Aynı krediyle 120 ay yerine 240 ay seçildiğinde toplam faiz önemli ölçüde yükselir.",
  },
  {
    question: "Hesaplamaya başka maliyetler dâhil mi?",
    answer: "Hayır. Hesaplayıcı yalnızca anapara ve faizi içerir. Dosya masrafı, ekspertiz ücreti, ipotek tesis ve tapu masrafları, DASK ve konut sigortası ile zorunlu hayat sigortası toplam maliyete eklenmelidir. Bu kalemler bankadan bankaya değişir.",
  },
  {
    question: "Krediyi erken kapatmak avantajlı mı?",
    answer: "Konut kredilerinde kalan anaparanın erken ödenmesi, kalan döneme ait faiz tahakkukunu azaltır. Çoğu banka erken ödemede kalan anaparanın belirli bir oranında erken ödeme (kapama) komisyonu alır; yine de uzun vadede ciddi faiz tasarrufu sağlar. Kalan borç detayı için bankanızla görüşün.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Konut Kredisi Taksit Hesaplama",
  description: "Konut kredisi aylık taksit ve toplam maliyet hesaplama aracı.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Konut Kredisi Hesaplayıcı",
    description: "Kredi tutarı, faiz oranı ve vadeye göre aylık taksiti hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function KonutKredisiHesaplama() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="section" aria-labelledby="calculator-heading">
        <div className="container">
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-foreground font-medium">Konut Kredisi Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Konut Kredisi Taksit Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Kredi tutarı, faiz oranı ve vade bilgilerinizle aylık taksitinizi, toplam geri ödemenizi ve toplam faiz
              maliyetinizi anüite formülüyle anlık hesaplayın.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <KonutKredisiClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <h4 className="font-medium text-foreground">Anüite Formülü</h4>
                  <p>
                    Aylık taksit; anapara, aylık faiz ve vade ay sayısı kullanılarak hesaplanır.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`T = P × [r × (1+r)^n] / [(1+r)^n − 1]

P = Kredi tutarı
r = Aylık faiz (yıllık / 12 / 100)
n = Vade (ay)`}</pre>

                  <h4 className="font-medium text-foreground">Örnek</h4>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`1.500.000 TL, %4 yıllık, 120 ay
Aylık faiz ≈ %0,3333
Taksit ≈ 15.190 TL
Toplam ≈ 1.822.500 TL
Faiz ≈ 322.500 TL`}</pre>
                  <p className="font-medium">
                    Taksit vade boyunca sabittir; ilk taksitlerde faiz payı yüksektir.
                  </p>
                </div>
              </div>

              <div className="card">
                <h3 className="card-title">Diğer Hesaplayıcılar</h3>
                <nav aria-label="Diğer hesaplayıcılar">
                  <ul className="space-y-2">
                    {internalLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="link text-sm">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="adsense-placeholder" role="region" aria-label="Reklam alanı" style={{ minHeight: "300px" }}>
                <span>Reklam Alanı (300x600 / 160x600)</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="how-calculated-heading">
        <div className="container max-w-4xl">
          <header className="section-header">
            <h2 id="how-calculated-heading" className="section-title">Konut Kredisi Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <p>
              Türkiye&apos;de konut kredileri, taksitlerin vade boyunca <strong>sabit tutar</strong> olarak ödendiği
              <strong> anüite (eşit taksit)</strong> yöntemiyle yapılandırılır. Bu yöntemde her ay bankaya aynı tutarı
              ödersiniz; ancak taksitin içinde yer alan <strong>faiz ve anapara payları</strong> dönemden döneme değişir.
              İlk aylarda faiz payı yüksek, anapara payı düşüktür; kredi ilerledikçe bu denge tersine döner.
            </p>
            <p>
              Bu nedenle konut kredisi kullanmadan önce yalnızca taksit tutarına değil, kredinin <strong>toplam geri ödeme
              tutarına</strong> ve <strong>toplam faiz maliyetine</strong> de bakmak gerekir. Hesaplayıcımız bu üç veriyi
              anüite formülüyle anında gösterir; sadece kredi tutarınızı, faiz oranınızı ve vadenizi girmeniz yeterlidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Anüite Formülü</h3>
            <p>
              Aylık taksit (T); kredi tutarı (P), aylık faiz oranı (r) ve vade ay sayısı (n) ile şu formülden hesaplanır:
            </p>
            <pre className="bg-surface-alt p-4 rounded-md font-mono overflow-x-auto">
{`T = P × [r × (1+r)^n] / [(1+r)^n − 1]`}</pre>
            <p>
              Burada <strong>r</strong>, yıllık faiz oranının 12 aya bölünmüş ve yüzdeliğe çevrilmiş hâlidir
              (örneğin yıllık %4 için aylık %0,3333, yani r = 0,003333). <strong>n</strong> ise vade süresidir (120 ay = 10 yıl,
              240 ay = 20 yıl). Formül, sabit taksitli bir ödeme planının matematiksel temelidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Örnek Hesaplama</h3>
            <p>
              1.500.000 TL kredi, yıllık %4 faiz ve 120 ay vade için aylık taksit yaklaşık
              <strong> 15.190 TL</strong> çıkar. Bu durumda 10 yılda ödenecek toplam tutar yaklaşık
              <strong> 1.822.500 TL</strong>, toplam faiz maliyeti ise yaklaşık <strong>322.500 TL</strong> olur.
            </p>
            <p>
              Aynı krediyi 240 aya yayarsanız aylık taksit yaklaşık <strong>9.090 TL</strong> seviyesine düşer, ancak toplam
              geri ödeme 2.180.000 TL&apos;yi aşar; yani ödenen toplam faiz neredeyse iki katına çıkar. Vade seçimi bu yüzden
              taksit konforu ile toplam maliyet arasında bir tercih meselesidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Kredinin Toplam Maliyetini Etkileyen Diğer Kalemler</h3>
            <p>
              Konut kredisinin gerçek maliyeti yalnızca faizden ibaret değildir. Kullanım sürecinde <strong>dosya masrafı</strong>,
              <strong> ekspertiz ücreti</strong>, <strong>ipotek tesis masrafı</strong> ve tapu işlemleri, kapanışta ise icra ve
              ipotek fekki masrafları gündeme gelir. Ayrıca bankalar genellikle <strong>DASK ve konut sigortası</strong> ile
              <strong> kredi hayat sigortası</strong> yapmayı şart koşabilir.
            </p>
            <p>
              Bu nedenle bankalardan gelen teklifleri karşılaştırırken yalnızca aylık faiz değil, yıllık maliyet oranı (YMO) ve
              tüm masraflar toplamı dikkate alınmalıdır. Hesaplayıcımızın verdiği &quot;toplam faiz&quot; değerine bu sabit masrafları
              ekleyerek gerçek maliyeti yaklaşık olarak görebilirsiniz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Ödeme Planı Nasıl İşler?</h3>
            <p>
              Her taksitte faiz tutarı, <strong>kalan anapara</strong> üzerinden hesaplanır. İlk taksitte kalan anapara kredi
              tutarının tamamı olduğu için faiz payı maksimumdur; ödeme ilerledikçe kalan anapara azalır ve faiz payı düşer,
              anapara payı yükselir. Beklenmeyen bir gelir durumunda <strong>erken ödeme (kapama)</strong> yapmak, kalan
              dönemlere ait faiz tahakkukunu azaltarak ciddi tasarruf sağlayabilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Önemli Noktalar</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Sabit ve değişken faizli kredilerde taksit davranışı farklıdır; hesaplayıcı sabit faiz varsayar.</li>
              <li>Bankalar tahmini oranlarını kendi risk politikalarına göre belirler; son teklifi bankadan alın.</li>
              <li>Kredi kullanımında kredi notu ve gelir/borç oranı ödeme planını etkiler.</li>
              <li>Zorunlu sigortalar toplam maliyete eklendiğinde aylık yük artabilir.</li>
              <li>Güncel faiz oranları döneme göre değişir; giriş alanında kendi oranınızı kullanın.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Doğru Vade Nasıl Belirlenir?</h3>
            <p>
              Vade seçerken aylık gelirinizin güvenli bir oranını (örneğin %30-40) taksite ayırmaya özen gösterin. Zorunlu
              sigortalar ve aidat gibi sabit giderler zaten bütçenizde yer aldığı için, öngörülemeyen harcamalara karşı bir
              güvenlik payı bırakmak ödeme planının sürdürülebilirliğini artırır.
            </p>
            <p>
              Ayrıca faizlerin dönemsel olarak değiştiğini unutmayın. Düşük faiz dönemlerinde kısa vade ile toplam maliyeti
              ciddi ölçüde azaltabilirsiniz; yüksek faiz dönemlerinde ise ileride yeniden yapılandırma (refinansman) ihtimalini
              değerlendirin. Bankanızla görüşerek erken ödeme koşullarını ve yeniden yapılandırma imkânlarını teyit edin.
            </p>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır ve herhangi bir bankanın teklifi veya garanti anlamı taşımaz.
                Örnek oranlar varsayımsaldır. Kesin maliyet için bankanızın güncel oranlarını ve masraf dökümünü kullanın.
                emlakhesapla.com hesaplama sonuçlarından doğacak sorumluluk kabul etmez.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-heading">
        <div className="container max-w-3xl">
          <header className="section-header">
            <h2 id="faq-heading" className="section-title">Sık Sorulan Sorular</h2>
          </header>
          <dl className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-item" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <dt className="faq-question" itemProp="name">{faq.question}</dt>
                <dd className="faq-answer" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <span itemProp="text">{faq.answer}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="related-heading">
        <div className="container">
          <header className="section-header">
            <h2 id="related-heading" className="section-title">İlgili Hesaplamalar</h2>
            <p className="section-description">Konut alımı ve kredi sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {internalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="card hover:border-secondary/50 transition-colors group">
                <span className="font-medium text-foreground group-hover:text-secondary transition-colors">{link.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-secondary transition-colors ml-auto" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}