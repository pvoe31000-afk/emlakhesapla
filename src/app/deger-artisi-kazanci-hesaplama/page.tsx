import type { Metadata } from "next";
import Link from "next/link";
import DegerArtisClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Değer Artış Kazancı Vergisi Hesaplama - Gayrimenkul",
  description: "Değer artış kazancı vergisi hesaplayıcı: Gayrimenkul alım/satım tarihi ve ÜFE endeksi ile kazancınızı ve ödenecek vergiyi hesaplayın. Güncel istisna tutarı ve vergi dilimleri.",
  openGraph: {
    title: "Değer Artış Kazancı Vergisi Hesaplama",
    description: "Alım/satım bedeli ve tarihleri girin, ÜFE endekslemeli kazanç ve vergi hesabınızı saniyelerde yapın.",
    type: "website",
  },
};

const ISTISNA_TUTARI = 150000;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/konut-kredisi-hesaplama", label: "Konut Kredisi Taksit Hesaplama" },
  { href: "/kira-stopaji-hesaplama", label: "Kira Stopajı Hesaplama" },
  { href: "/emlak-vergisi-hesaplama", label: "Emlak Vergisi Hesaplama" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Değer artış kazancı vergisi nedir?",
    answer: "Gayrimenkulün satışından elde edilen kazanç, Gelir Vergisi Kanunu'nun 'Değer Artışı Kazançları' başlıklı mükerrer 80. maddesi uyarınca vergiye tabidir. Ancak gayrimenkulün edinim tarihinden itibaren 5 yıl geçtikten sonra satılması halinde bu kazanç vergiye tabi değildir.",
  },
  {
    question: "Kaç yıl içinde satılırsa vergiye tabidir?",
    answer: "Gayrimenkul, edinim (tapuda tescil) tarihinden itibaren 5 yıl içinde satılırsa kazanç değer artış kazancı olarak vergilendirilir. Günümüzde edinilen gayrimenkuller için bu süre 5 yıldır; önceki dönemlerde daha kısa süreler uygulanıyordu.",
  },
  {
    question: "Vergi nasıl hesaplanır?",
    answer: "İlk olarak satış bedelinden maliyet bedeli (alış) düşülerek kazanç bulunur. Alış bedeli, satış ayındaki ÜFE/TEFE endeksine göre güncellenir. Bulunan kazançtan istisna tutarı düşülür ve kalan matraha gelir vergisi tarifesi (artan oranlı) uygulanır.",
  },
  {
    question: "İstisna tutarı ne kadar?",
    answer: "Güncel değer artış kazancı istisna tutarı 150.000 TL'dir. Kazanç bu tutarı aşıyorsa, aşan kısım vergiye tabidir. Bu tutar her yıl yeniden değerleme oranına göre güncellenir. Güncel tutarı Gelir İdaresi Başkanlığı'ndan teyit edin.",
  },
  {
    question: "Beyanname ne zaman verilir?",
    answer: "Değer artış kazancı, satışın gerçekleştiği yılın takip eden yılında, Mart ayında (1-31 Mart tarihleri arasında) yıllık gelir vergisi beyannamesi ile beyan edilir. Vergi, Mart ve Temmuz aylarında iki eşit taksitle ödenir.",
  },
  {
    question: "Enflasyon endekslemesi nasıl yapılır?",
    answer: "Alış bedeli, satış ayı ile alış ayı arasındaki dönemdeki ÜFE (Yurt İçi Üretici Fiyat Endeksi) değişimine göre güncellenir. Endekslenmiş alış bedeli = Alış Bedeli × (Satış Ayı ÜFE / Alış Ayı ÜFE) formülüyle hesaplanır. Değişim oranı %10'u geçmiyorsa endeksleme yapılamaz.",
  },
  {
    question: "Hangi giderler düşülebilir?",
    answer: "Satış ile ilgili yapılan giderler (örnek: satışa aracılık komisyonu, vergi, resim, harçlar, noter masrafları) kazançtan düşülebilir. Ayrıca satın alma sırasında ödenen tapu harcı gibi maliyetler de maliyet bedeline eklenebilir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Değer Artış Kazancı Vergisi Hesaplama",
  description: "Gayrimenkul alım/satımında değer artış kazancı vergisini ÜFE endekslemesi ile hesaplayın.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Değer Artış Kazancı Vergisi Hesaplayıcı",
    description: "Gayrimenkul satış kazancı ve ödenecek vergiyi hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function DegerArtisKazanciHesaplama() {
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
              <span className="text-foreground font-medium">Değer Artış Kazancı Vergisi Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Değer Artış Kazancı Vergisi Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Gayrimenkul satışından elde edeceğiniz kazancı ve ödenecek değer artış kazancı vergisini,
              ÜFE endekslemesi ve gelir vergisi dilimleriyle anlık hesaplayın. Güncel istisna tutarı ile.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <DegerArtisClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <p>
                    Değer artış kazancı vergisi, gayrimenkulün 5 yıl içinde satılması durumunda ödenir. Hesaplama adımları:
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Alış bedeli ÜFE endeksiyle güncellenir</li>
                    <li>Satış bedelinden endeksli alış ve giderler düşülür</li>
                    <li>İstisna tutarı düşülür</li>
                    <li>Vergi tarifesine göre vergi hesaplanır</li>
                  </ol>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Endeksli Alış = Alış × (Satış ÜFE / Alış ÜFE)
Brüt Kazanç = Satış − Endeksli Alış − Gider
Matrah = Brüt Kazanç − İstisna
Vergi = Matrah → Tarife`}</pre>
                  <p className="font-medium text-destructive">
                    <strong>Not:</strong> ÜFE endeks katsayıları örnek değerlerdir. Kesin hesap için satış/alış ayındaki
                    gerçek ÜFE değerlerini kullanın ve mali müşavirinize danışın.
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
            <h2 id="how-calculated-heading" className="section-title">Değer Artış Kazancı Vergisi Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Değer Artış Kazancı Vergisi Nedir?</h3>
            <p>
              Değer artış kazancı vergisi, bir gayrimenkulün satın alma ile satış arasındaki değer artışından doğan kazancın,
              Gelir Vergisi Kanunu&apos;nun (GVK) mükerrer 80. maddesi uyarınca vergilendirilmesidir. Gayrimenkul, edinim tarihinden
              itibaren <strong>5 yıl içinde</strong> satılırsa, satıştan doğan kazanç vergiye tabidir. 5 yıllık süre dolduktan sonra
              yapılan satışlarda herhangi bir vergi ödenmez.
            </p>

            <h3 className="text-xl font-semibold text-foreground">5 Yıl Kuralı</h3>
            <p>
              Edinim tarihi, tapuda tescil (satın alma) tarihidir. Günümüzde edinilen gayrimenkuller için elde tutma
              süresi <strong>5 yıl</strong> olarak belirlenmiştir. Örnek: Edinim tarihinden 5 tam yıl sonra satılan bir ev
              vergiye tabi değildir. 5 yıl içinde satılırsa kazanç vergilendirilir.
            </p>
            <p>
              <strong>Önemli istisna:</strong> Tek meskeni olan kişinin, meskenini satmasından doğan kazanç, 5 yıl süresi
              dolmamış olsa dahi vergiden muaftır (GVK mük.80/4-a). Bu istisna kişinin sürekli ikamet ettiği tek konut için geçerlidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Endeksleme (ÜFE Katsayısı)</h3>
            <p>
              Satış kazancı hesaplanırken, enflasyonun etkisini ortadan kaldırmak için alış bedeli <strong>endekslenir</strong>.
              Bunun için TÜİK tarafından yayımlanan <strong>Yurt İçi Üretici Fiyat Endeksi (ÜFE)</strong> kullanılır.
            </p>
            <p>
              Formül: <code>Endekslenmiş Alış Bedeli = Alış Bedeli × (Satış Ayı ÜFE / Alış Ayı ÜFE)</code>
            </p>
            <p>
              Alış ve satış ayları arasındaki ÜFE artış oranı <strong>%10&apos;u geçmiyorsa</strong> endeksleme yapılamaz;
              bu durumda alış bedeli olduğu gibi maliyet olarak kullanılır. Endeksleme, vergi matrahını azaltarak
              enflasyon nedeniyle oluşan sahte kazancın önüne geçer.
            </p>

            <h3 className="text-xl font-semibold text-foreground">İstisna Tutarı</h3>
            <p>
              Güncel değer artış kazancında uygulanan istisna tutarı <strong>{formatNumber(ISTISNA_TUTARI)} TL</strong>&apos;dir.
              Bu tutar, her yıl yeniden değerleme oranı ile artırılarak güncellenir. Matrah, bu istisna tutarını aşıyorsa
              yalnızca aşan kısım vergiye tabidir. Güncel tutarı her yıl Gelir İdaresi Başkanlığı açıklar; kesin hesap için
              başkanlığın verilerini kontrol edin.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Gelir Vergisi Dilimleri</h3>
            <p>
              Hesaplanan matraha, yıllık gelir vergisi tarifesi (artan oranlı) uygulanır. Güncel tarifeye göre örnek dilimler:
            </p>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Gelir Dilimi</th>
                    <th className="text-center">Vergi Oranı</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>360.000 TL&apos;ye kadar</td><td className="text-center">%15</td></tr>
                  <tr><td>800.000 TL&apos;ye kadar</td><td className="text-center">%20</td></tr>
                  <tr><td>1.600.000 TL&apos;ye kadar</td><td className="text-center">%27</td></tr>
                  <tr><td>3.000.000 TL&apos;ye kadar</td><td className="text-center">%30</td></tr>
                  <tr><td>3.000.000 TL&apos;den fazla</td><td className="text-center">%40</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              * Dilimler örnek olarak verilmiştir; her yıl güncellenir. Güncel tarife için Gelir İdaresi Başkanlığı&apos;nı kontrol edin.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Örnek Hesaplama</h3>
            <p>
              Geçmişte 1.000.000 TL&apos;ye alınan bir gayrimenkulün, 2.400.000 TL&apos;ye satıldığını düşünelim.
              Alış bedeli satış dönemindeki ÜFE&apos;ye göre endekslenir. Örneğin endekslenmiş alış 1.180.000 TL çıkarsa brüt kazanç
              2.400.000 - 1.180.000 = 1.220.000 TL olur. Bu tutardan satış giderleri ve istisna düşüldükten sonra kalan matrah
              tarifeye göre vergilendirilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Hangi Giderler Düşülebilir?</h3>
            <p>
              Kanun, kazancın tespitinde satışa ilişkin gerçek giderlerin düşülmesine imkân tanır. Bu giderlerin belgeli
              olması ve gayrimenkulün satışıyla doğrudan ilgili bulunması gerekir; şahsi harcamalar matrahtan düşülemez.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Satışa aracılık eden emlakçıya ödenen komisyon (KDV dahil ödenen tutar)</li>
              <li>Satış sırasında ödenen noter, harç ve düzenleme giderleri</li>
              <li>Alış sırasında ödenen tapu harcı gibi maliyete eklenebilen giderler</li>
              <li>Gayrimenkulün satışa hazırlanması için yapılan ispatlı masraflar</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground">Beyan ve Ödeme</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Satışın gerçekleştiği yılın <strong>takip eden yılında</strong>, 1-31 Mart tarihleri arasında gelir vergisi beyannamesi verilir.</li>
              <li>Beyanname, Gelir İdaresi Başkanlığı&apos;nın (GİB) Hazır Beyan Sisteminden veya vergi dairesinden verilir.</li>
              <li>Vergi iki eşit taksitte ödenir: Mart ve Temmuz aylarında.</li>
              <li>Gecikme hâlinde aylık gecikme zammı uygulanır.</li>
            </ol>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcıda kullanılan ÜFE endeks katsayıları, istisna tutarı ve vergi dilimleri <strong>örnek
                değerlerdir</strong> ve her yıl güncellenir. Kesin vergi hesabı için satış/alış aylarındaki gerçek ÜFE değerlerini
                kullanın ve bir mali müşavire danışın. emlakhesapla.com hesaplama sonuçlarından doğacak herhangi bir
                sorumluluk kabul etmez.
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
            <p className="section-description">Emlak alım satım ve vergi sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
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