import type { Metadata } from "next";
import Link from "next/link";
import KiraStopajiClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Kira Stopajı Hesaplama - Gelir Vergisi Dilimleri",
  description: "Kira stopajı hesaplayıcı: Kira gelirinizden kesilecek stopaj (gelir vergisi) tutarını hesaplayın. Güncel vergi dilimleri ve istisna tutarı ile anlık hesaplama.",
  openGraph: {
    title: "Kira Stopajı Hesaplama - Gelir Vergisi",
    description: "Kira geliri ve istisna bilgilerinizle kesilecek stopajı saniyelerde hesaplayın.",
    type: "website",
  },
};

const KIRA_ISTISNA_TUTARI = 33000;

function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/konut-kredisi-hesaplama", label: "Konut Kredisi Taksit Hesaplama" },
  { href: "/deger-artisi-kazanci-hesaplama", label: "Değer Artış Kazancı Vergisi" },
  { href: "/emlak-vergisi-hesaplama", label: "Emlak Vergisi Hesaplama" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Kira stopajı nedir?",
    answer: "Kira stopajı, işyeri kira ödemelerinde kiracı tarafından %20 oranında kesilen ve devlete aktarılan vergi avansıdır. Konut kiralamalarında stopaj yapılmaz. Kiracının kestiği stopaj, ev sahibinin yıl sonunda ödeyeceği gelir vergisinden mahsup edilir.",
  },
  {
    question: "Konut kiralarında stopaj yapılır mı?",
    answer: "Hayır. Konut (mesken) kiralarında stopaj yapılmaz. Kira stopajı yalnızca işyeri ve diğer ticari kira ödemelerinde (ilgili kiracılar tarafından) %20 oranında uygulanır. Konut kiralamalarında ev sahibi, yıl sonunda gelir vergisi beyannamesi verir.",
  },
  {
    question: "Stopajın mahsubu nasıl çalışır?",
    answer: "Kiracı, kira ödemesinden %20 stopaj keserek vergi dairesine yatırır. Ev sahibi, yıl sonunda yıllık gelir vergisi beyannamesi verdiğinde, kesilen bu stopaj tutarını 'tevkifat' olarak ödeyeceği vergiden düşer. Stopaj vergiden yüksekse fark iade alınır.",
  },
  {
    question: "Kira geliri vergisinden istisna var mı?",
    answer: `Güncel düzenlemeyle konut (mesken) kira gelirlerinde ${formatNumber(KIRA_ISTISNA_TUTARI)} TL istisna tutarı uygulanır. Bu tutarın altında kalan konut kira geliri beyan edilmez. İşyeri kiralarında istisna yoktur. İstisna tutarı her yıl yeniden değerleme oranına göre güncellenir.`,
  },
  {
    question: "İşyeri kira stopajı nasıl hesaplanır?",
    answer: "İşyeri kira ödemesinden düz oran %20 stopaj kesilir. Yıl sonunda ise ev sahibinin toplam (net işyeri kirası + stopaj) brüt kira geliri, yıllık gelir vergisi matrahına eklenir ve artan oranlı tarifeye göre vergilendirilir. Kesilen %20 stopaj bu vergiden mahsup edilir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kira Stopajı Hesaplama",
  description: "Kira gelirinizden kesilecek stopaj ve ödenecek gelir vergisini hesaplayın.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Kira Stopajı Hesaplayıcı",
    description: "Aylık kira ve gelir bilgilerine göre kira stopajı ve vergiyi hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function KiraStopajiHesaplama() {
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
              <span className="text-foreground font-medium">Kira Stopajı Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Kira Stopajı Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Kira gelirinizden kesilecek stopajı ve yıl sonunda ödenecek gelir vergisini;
              konut/işyeri ayrımı, istisna tutarı ve güncel vergi dilimleriyle anlık hesaplayın.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <KiraStopajiClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <h4 className="font-medium text-foreground">İşyeri Kirası (Stopajlı)</h4>
                  <p>
                    Kiracı, kira bedelinden %20 stopaj keser ve devlete öder.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Brüt Yıllık Kira = Net Kira × 12 / 0,8
Stopaj (Yıllık) = Brüt × 0,20`}</pre>

                  <h4 className="font-medium text-foreground">Konut Kirası (İstisnalı)</h4>
                  <p>
                    Konut kirasında stopaj yoktur; istisna ({formatNumber(KIRA_ISTISNA_TUTARI)} TL) düşülür.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Yıllık Kira = Aylık Kira × 12
Matrah = Yıllık Kira − İstisna
Vergi = Tarifeye göre artan oranlı`}</pre>
                  <p className="font-medium">
                    İşyerinde kesilen stopaj, yıl sonunda hesaplanan vergiden mahsup edilir.
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
            <h2 id="how-calculated-heading" className="section-title">Kira Stopajı Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Kira Stopajı Nedir?</h3>
            <p>
              Kira stopajı (tevkifat), bir gayrimenkulün <strong>işyeri olarak kiralanması</strong> durumunda, kiracının kira
              ödemesinden %20 oranında gelir vergisi kesintisi yaparak vergi dairesine yatırması işlemidir. Bu kesinti, ev
              sahibinin (kira geliri sahibinin) yıl sonunda ödeyeceği gelir vergisinin bir <strong>avansı/peşin ödemesidir</strong>.
            </p>
            <p>
              Stopaj sayesinde devlet, kira geliri üzerindeki vergiyi yıl boyunca düzenli olarak tahsil eder; ev sahibi ise yıl
              sonunda beyanname verdiğinde zaten ödenmiş olan bu peşin vergiyi mahsup eder. Stopaj aynı zamanda düzenli kira
              gelirini kayıt altına alan bir mekanizmadır.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Konut ve İşyeri Farkı</h3>
            <p>
              Konut (mesken) kiralamalarında <strong>stopaj yapılmaz</strong>. Bu tür kiralarda ev sahibi, yıl sonunda tüm kira
              gelirini yıllık gelir vergisi beyannamesi ile beyan eder ve vergiyi kendisi öder. İşyeri kiralamalarında ise kiracı
              her kira ödemesinde %20 stopaj keser; yıl sonunda ev sahibi yine beyanname verir ancak kesilen stopajı
              ödeyeceği vergiden mahsup eder.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Stopajın Hesaplanması</h3>
            <p>
              İşyeri kira ödemesinde stopaj, <strong>brüt kira bedeli</strong> üzerinden %20 olarak hesaplanır. Kiracı, kira
              sözleşmesindeki bedeli brüt kabul edip bunun üzerinden %20 stopaj keserek netini ev sahibine öder.
              Pratikte çoğu sözleşme net tutar üzerinden yapılır; bu durumda brüt tutar hesaplanarak stopaj belirlenir.
            </p>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Aylık Net Kira:</span> <strong>16.000 TL</strong></div>
              <div className="flex justify-between"><span>Brüt Kira (16.000 / 0,8):</span> <strong>20.000 TL</strong></div>
              <div className="flex justify-between"><span>Stopaj (20.000 × 0,20):</span> <strong>4.000 TL</strong></div>
              <div className="flex justify-between border-t border-border pt-2"><span>Yıllık Stopaj:</span> <strong>48.000 TL</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Gelir Vergisi Dilimleri</h3>
            <p>
              Yıl sonunda ev sahibinin kira geliri, diğer gelirlerle birlikte toplanarak artan oranlı gelir vergisi tarifesine
              tabi tutulur. Güncel tarifeye göre örnek dilimler:
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
              * Dilimler örnek olarak verilmiştir; her yıl güncellenir. Güncel tarife ve istisna için Gelir İdaresi
              Başkanlığı&apos;nı kontrol edin.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Konut Kira İstisnası</h3>
            <p>
              Güncel konut kira gelirlerinde istisna tutarı <strong>{formatNumber(KIRA_ISTISNA_TUTARI)} TL</strong>&apos;dir.
              Bu tutarın altında kalan konut kira gelirleri beyan edilmez ve vergi ödenmez. Yıllık kira geliri bu tutarı aşıyorsa,
              istisna düşüldükten sonra kalan kısım beyan edilir.
            </p>
            <p>
              İstisna tutarı her yıl yeniden değerleme oranına göre güncellenir. Kira geliriniz istisnayı aşıyorsa istisna
              hakkından yararlanmak için yine de yıllık beyanname vermeniz gerekir; aksi hâlde eksik beyan nedeniyle
              cezalı tarhiyatla karşılaşabilirsiniz.
            </p>
            <p>
              <strong>Önemli:</strong> İşyeri kiralarında istisna uygulanmaz. Ayrıca istisna, gayrimenkulün konut olarak
              kiralanması şartına bağlıdır ve istisnadan kullanılmayan tutar diğer gelirlere transfer edilemez.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Beyan ve Ödeme Süreci</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Kira geliri <strong>1-31 Mart</strong> tarihleri arasında yıllık gelir vergisi beyannamesi ile beyan edilir.</li>
              <li>Beyan, GİB&apos;in Hazır Beyan Sistemi üzerinden yapılabilir (kolay ve hızlıdır).</li>
              <li>Vergi iki eşit taksitte (Mart ve Temmuz) ödenir.</li>
              <li>İşyerlerinde kesilmiş stopaj, bu vergiden mahsup edilir; fazlası varsa iade alınır.</li>
            </ol>

            <h3 className="text-xl font-semibold text-foreground">Önemli Noktalar</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>İşyeri kiralarında %20 stopaj, ilgili ayın <strong>15. günü akşamına kadar</strong> beyan edilip ödenmelidir (Muhtasar Beyanname).</li>
              <li>Kiracı şirketse stopajı keser ve sorumluluk kiracıdadır.</li>
              <li>Konut kirasında stopaj yoktur; ancak beyan yükümlülüğü ev sahibine aittir.</li>
              <li>İstisna tutarından fazla kira geliri olanlar, istisnayı düşmek için yine de beyanname verir.</li>
              <li>Kira gelirinin dışında başka vergiye tabi geliriniz de varsa matrah büyür, oran yükselebilir.</li>
            </ul>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcıda kullanılan istisna tutarı ve vergi dilimleri <strong>örnek değerlerdir</strong> ve her yıl
                güncellenir. Kesin vergi hesabı için güncel Gelir İdaresi Başkanlığı verilerini kullanın ve bir mali müşavire
                danışın. emlakhesapla.com hesaplama sonuçlarından doğacak herhangi bir sorumluluk kabul etmez.
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
            <p className="section-description">Kiralama ve emlak sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
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