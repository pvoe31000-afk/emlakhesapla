import type { Metadata } from "next";
import Link from "next/link";
import TapuHarciClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Tapu Harcı Hesaplama - Satış Bedeli %4 Hesaplayıcı",
  description: "Tapu harcı hesaplayıcı: Satış bedeli üzerinden %4 oranında tapu harcı tutarını anlık hesaplayın. Alıcı ve satıcı payları (%2+%2) veya toplam tutar. Güncel %4 oranı.",
  openGraph: {
    title: "Tapu Harcı Hesaplama - %4 Oranı ile Anlık Hesapla",
    description: "Satış bedeli girin, tapu harcı tutarını saniyelerde öğrenin. Alıcı/satıcı pay ayrımı, güncel oranlar.",
    type: "website",
  },
};

const internalLinks = [
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/konut-kredisi-hesaplama", label: "Konut Kredisi Taksit Hesaplama" },
  { href: "/kira-stopaji-hesaplama", label: "Kira Stopajı Hesaplama" },
  { href: "/deger-artisi-kazanci-hesaplama", label: "Değer Artış Kazancı Vergisi" },
  { href: "/emlak-vergisi-hesaplama", label: "Emlak Vergisi Hesaplama" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Tapu harcı oranı ne kadardır?",
    answer: "Güncel tapu harcı oranı satış bedelinin %4'tür. Bu oran bir dönem %3 iken yapılan düzenlemeyle %4'e çıkarılmıştır. Alıcı ve satıcı eşit oranda (%2+%2) ödeme yapmakla yükümlüdür.",
  },
  {
    question: "Tapu harcı kimin tarafından ödenir?",
    answer: "Tapu harcı, tapu işlemi sırasında alıcı ve satıcı tarafından eşit oranda (%2+%2) ödenir. Pratikte genellikle alıcı öder ancak bu tarafların anlaşmasına bağlıdır. Noterde ödeme sırası yapılırken her iki taraf da beyan eder.",
  },
  {
    question: "Tapu harcında istisna veya indirim var mı?",
    answer: "İlk kez ev satın alan gençlere (25 yaş altı) ve şehit/gazi yakınlarına tapu harcı indirimi uygulanabilir. Ayrıca tarla, arsa gibi gayrimenkullerde farklı oranlar olabilir. Detaylı bilgi için noterinize danışın.",
  },
  {
    question: "Satış bedeli nasıl belirlenir?",
    answer: "Tapu harcı hesaplanmasında esas alınan değer, tapu müdürlüğüne beyan edilen satış bedelidir. Bu değer, belediyenin belirlediği rayiç değerden düşük olamaz. Rayiç değer daha yüksekse harç rayiç değer üzerinden hesaplanır.",
  },
  {
    question: "Tapu harcı KDV dahildir mi?",
    answer: "Tapu harcı bir vergidir, KDV kapsamında değildir. Satış bedeli üzerinden doğrudan %4 oranında hesaplanır. Emlakçı komisyonu ayrıdır ve onun üzerinde KDV hesaplanır.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Tapu Harcı Hesaplama",
  description: "Satış bedeli üzerinden %4 oranında tapu harcı tutarını hesaplayın. Alıcı ve satıcı paylarını ayrı ayrı veya toplam olarak görün.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Tapu Harcı Hesaplayıcı",
    description: "Gayrimenkul alım satımında ödenecek tapu harcı tutarını hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function TapuHarciHesaplama() {
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
              <span className="text-foreground font-medium">Tapu Harcı Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Tapu Harcı Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Gayrimenkul alım satımında ödenecek tapu harcı tutarını, satış bedeli girerek anlık hesaplayın.
              Güncel oran (%4) ile alıcı ve satıcı paylarını ayrı ayrı görün.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <TapuHarciClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <p>
                    Tapu harcı, gayrimenkul alım satımında tapu müdürlüğüne ödenen bir harçtır. Güncel oran
                    <strong> %4</strong> olarak belirlenmiştir.
                  </p>
                  <p>Hesaplama formülü basittir:</p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`Tapu Harcı = Satış Bedeli × 0.04`}</pre>
                  <p>Bu tutar, alıcı ve satıcı arasında eşit olarak paylaştırılır:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Alıcı payı: Satış Bedeli × %2</li>
                    <li>Satıcı payı: Satış Bedeli × %2</li>
                  </ul>
                  <p className="font-medium">
                    <strong>Önemli:</strong> Beyan edilen satış bedeli, belediyenin belirlediği rayiç değerden düşük olamaz.
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
            <h2 id="how-calculated-heading" className="section-title">Tapu Harcı Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Tapu Harcı Nedir?</h3>
            <p>
              Tapu harcı, gayrimenkulün sahipliğinin bir kişiden diğerine devredilmesi (tapu işlemi) sırasında,
              Tapu ve Kadastro Genel Müdürlüğüne ödenen bir tür harçtır. Bu harç, tapu sicilindeki değişiklik işlemleri
              için alınan bir ücrettir ve gayrimenkul alım satımının vazgeçilmez maliyet kalemlerinden biridir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Güncel Tapu Harcı Oranları</h3>
            <p>
              Tapu harcı oranı bir dönem %1,5 + %1,5 = %3 iken, yapılan düzenlemeyle %3&apos;ten %4&apos;e çıkarılmıştır.
              Güncel düzenlemede %2 + %2 = %4 uygulanmaktadır.
            </p>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Yıl</th>
                    <th className="text-center">Alıcı Payı</th>
                    <th className="text-center">Satıcı Payı</th>
                    <th className="text-center">Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Eski düzenleme</td>
                    <td className="text-center">%1.5</td>
                    <td className="text-center">%1.5</td>
                    <td className="text-center font-medium">%3</td>
                  </tr>
                  <tr>
                    <td>Güncel düzenleme</td>
                    <td className="text-center">%2</td>
                    <td className="text-center">%2</td>
                    <td className="text-center font-medium">%4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Hesaplama Örneği</h3>
            <p>Satış bedeli 2.000.000 TL olan bir gayrimenkul için:</p>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Satış Bedeli:</span> <strong>2.000.000 TL</strong></div>
              <div className="flex justify-between"><span>Tapu Harcı Oranı:</span> <strong>%4</strong></div>
              <div className="flex justify-between border-t border-border pt-2"><span>Toplam Tapu Harcı:</span> <strong className="text-foreground">80.000 TL</strong></div>
              <div className="flex justify-between"><span>Alıcı Payı (%2):</span> <strong>40.000 TL</strong></div>
              <div className="flex justify-between"><span>Satıcı Payı (%2):</span> <strong>40.000 TL</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Rayiç Değer Etkisi</h3>
            <p>
              Tapu harcı hesaplanmasında esas alınan değer, tarafların beyan ettiği satış bedelidir. Ancak bu değer,
              ilgili belediyenin o yıl için belirlediği <strong>rayiç değer</strong> (değerleme bedeli) altına inemez.
              Eğer beyan edilen satış bedeli rayiç değerden düşükse, tapu harcı rayiç değer üzerinden hesaplanır.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Ödeme Süreci</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Satış sözleşmesi noterlerde düzenlenir</li>
              <li>Tapu harcı tutarı hesaplanır ve ödeme emri verilir</li>
              <li>Alıcı ve/veya satıcı tapu harcı ödemesini banka/PTT üzerinden yapar</li>
              <li>Dekont tapu müdürlüğüne sunulur</li>
              <li>Tapu işlemi tamamlanır, yeni tapu düzenlenir</li>
            </ol>

            <h3 className="text-xl font-semibold text-foreground">İstisnalar ve İndirimler</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>İlk ev sahibi gençler:</strong> 25 yaşını doldurmamış, ilk kez ev satın alanlara %50 indirim</li>
              <li><strong>Şehit/Gazi yakınları:</strong> Kanunen tanımlı şehit/gazi eş ve çocuklarına tam muafiyet</li>
              <li><strong>Miras/Intikal:</strong> Miras yoluyla geçen gayrimenkullerde tapu harcı ödenmez</li>
              <li><strong>Tarla/Arsa:</strong> Tarım arazilerinde farklı oranlar uygulanabilir</li>
            </ul>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır. Resmi işlemlerinizde mutlaka ilgili tapu müdürlüğü ve/veya mali
                müşavirinizle güncel oranları ve istisnaları doğrulayın.
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
            <p className="section-description">Emlak alım satım sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
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