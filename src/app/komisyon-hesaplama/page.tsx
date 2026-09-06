import type { Metadata } from "next";
import Link from "next/link";
import KomisyonClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Emlakçı Komisyonu Hesaplama - Satış/Kira KDV Dahil/Hariç",
  description: "Emlakçı komisyon hesaplayıcı: Satış ve kiralama işlemlerinde komisyon tutarını KDV dahil/hariç seçenekli hesaplayın. Resmi oranlar (%2+%KDV) ile anlık sonuç.",
  openGraph: {
    title: "Emlakçı Komisyonu Hesaplama - KDV Dahil/Hariç",
    description: "Satış/kira bedeli girin, emlakçı komisyonunu saniyelerde hesaplayın. KDV dahil/hariç seçenekli, resmi oranlar.",
    type: "website",
  },
};

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
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
    question: "Emlakçı komisyon oranı ne kadardır?",
    answer: "Gayrimenkul satışında komisyon oranı her taraf için %2'dir (toplam %4). Kiralama işlemlerinde ise en fazla bir ay kira bedeli + KDV kadar komisyon alınır. Yönetmeliğe göre bu bedel aksi kararlaştırılmadıkça ev sahibi ve kiracı arasında eşit paylaşılır; ancak piyasa uygulamasında bu tutarı genellikle kiracı öder.",
  },
  {
    question: "Komisyon KDV dahil mi yoksa hariç mi ödenir?",
    answer: "Resmi olarak komisyon oranları KDV hariçtir. %20 KDV komisyon tutarının üzerine eklenerek hesaplanır. Pratikte bazı emlakçılar KDV dahildir diyebilir ancak yasal olarak KDV haricindedir. Hesaplayıcımızda her iki seçeneği de görebilirsiniz.",
  },
  {
    question: "Komisyon kimin tarafından ödenir?",
    answer: "Satış işlemlerinde hem alıcı hem de satıcı kendi emlakçısına (veya ortak emlakçıya) komisyon öder. Kiralama işlemlerinde yönetmeliğe göre komisyon, aksi kararlaştırılmadıkça ev sahibi ve kiracı arasında eşit paylaşılır; ancak piyasa uygulamasında bedeli genellikle kiracı öder.",
  },
  {
    question: "Kira komisyonunu kim öder, ev sahibi mi kiracı mı?",
    answer: "Yasal düzenlemeye göre komisyon, aksi kararlaştırılmadıkça ev sahibi ve kiracı arasında eşit paylaştırılır. Ancak uygulamada bu bedel genellikle tamamen kiracı tarafından ödenmektedir. Kiralama öncesinde emlak danışmanınızla bu konuyu netleştirmeniz önerilir.",
  },
  {
    question: "Komisyon ne zaman ödenir?",
    answer: "Satışta tapu işlemi yapılırken, kiralamada sözleşme imzalanırken ödenir. Genellikle peşinat/kapora ödemesi sırasında komisyon da ödenir veya tapu/sözleşme anında ödeme yapılır.",
  },
  {
    question: "Emlakçı belgesi olmayan kişiden komisyon istenebilir mi?",
    answer: "Hayır. Emlakçılık mevzuatına göre mesleki yeterlilik belgesi sahibi olmayan kişi komisyon talep edemez. Komisyon ödemeden önce emlakçının belgesini kontrol edin.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Emlakçı Komisyonu Hesaplama",
  description: "Satış ve kiralama işlemlerinde emlakçı komisyon tutarını KDV dahil/hariç seçenekli olarak hesaplayın.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Emlakçı Komisyon Hesaplayıcı",
    description: "Gayrimenkul satış ve kiralama komisyonlarını hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function KomisyonHesaplama() {
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
              <span className="text-foreground font-medium">Emlakçı Komisyonu Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Emlakçı Komisyonu Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Satış veya kiralama bedelini girin, emlakçı komisyon tutarını KDV dahil/hariç seçenekli anlık hesaplayın.
              Resmi oranlar (%2 satış, 1 ay kira kiralama) ile güncel hesaplama.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <KomisyonClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <h4 className="font-medium text-foreground">Satış İşlemleri</h4>
                  <p>
                    Gayrimenkul satışında her taraf (alıcı ve satıcı) için komisyon oranı <strong>%2</strong>&apos;dir.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`Komisyon = Satış Bedeli × 0.02
KDV = Komisyon × 0.20
Toplam = Komisyon + KDV`}</pre>

                  <h4 className="font-medium text-foreground">Kiralama İşlemleri</h4>
                  <p>
                    Kiralama işlemlerinde komisyon <strong>en fazla 1 ay kira bedeli + KDV</strong> kadardır.
                    Taşınmaz Ticareti Hakkında Yönetmelik&apos;e göre bu bedel, aksi yazılı olarak kararlaştırılmadıkça
                    ev sahibi ile kiracı arasında <strong>eşit paylaştırılır</strong>.
                  </p>
                  <p>
                    Ancak piyasa uygulamasında bu bedel neredeyse her zaman <strong>kiracı</strong> tarafından karşılanır.
                    Kesin uygulama, emlak danışmanınızla yapacağınız sözleşmede belirlenir.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`Komisyon = Aylık Kira Bedeli
KDV = Komisyon × 0.20
Toplam = Komisyon + KDV`}</pre>

                  <p className="font-medium">
                    Resmi oranlar KDV hariçtir; KDV (%20) üzerine eklenir.
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
            <h2 id="how-calculated-heading" className="section-title">Emlakçı Komisyonu Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Emlakçı Komisyonu Nedir?</h3>
            <p>
              Emlakçı komisyonu, gayrimenkul alım satım veya kiralama işlemlerinde emlakçının aracılık hizmeti karşılığında
              talep ettiği ücrettir. Emlakçılar, işlem bedeli üzerinden belirli oranlarda komisyon almaya yetkilidir.
              Bu komisyon, emlakçının mesleki yeterlilik belgesi sahibi olması şartıyla talep edilebilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Satış Komisyon Oranları</h3>
            <p>
              Gayrimenkul satış işlemlerinde emlakçı komisyonu <strong>her taraf için %2</strong> (toplam %4) olarak belirlenmiştir.
              Bu oran satış bedeli üzerinden hesaplanır. Alıcı ve satıcının her biri kendi emlakçısına (veya ortak emlakçıya)
              bu oranda komisyon öder.
            </p>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>İşlem Türü</th>
                    <th className="text-center">Komisyon Oranı</th>
                    <th className="text-center">KDV</th>
                    <th className="text-center">Toplam</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Gayrimenkul Satışı</td>
                    <td className="text-center">%2</td>
                    <td className="text-center">%20</td>
                    <td className="text-center">%2,4</td>
                  </tr>
                  <tr>
                    <td>Gayrimenkul Kiralama</td>
                    <td className="text-center">1 Ay Kira Bedeli</td>
                    <td className="text-center">%20</td>
                    <td className="text-center">1,2 Ay Kira</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm">
              Satışta alıcı ve satıcının her biri %2 komisyon öder. Kiralamada yönetmeliğe göre komisyon ev sahibi ile
              kiracı arasında eşit paylaştırılır; ancak piyasa uygulamasında bu bedeli genellikle kiracı öder.
            </p>

            <h3 className="text-xl font-semibold text-foreground">KDV Hesaplaması</h3>
            <p>
              Emlakçı komisyonları KDV matrahıdır. Komisyon tutarının üzerinden <strong>%20 KDV</strong> hesaplanarak eklenir.
              Bu nedenle asıl ödenen tutar, komisyon oranından %20 fazladır.
            </p>
            <p><strong>Örnek:</strong> 1.000.000 TL satış bedelli bir evde:</p>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Satış Bedeli:</span> <strong>1.000.000 TL</strong></div>
              <div className="flex justify-between"><span>Komisyon Oranı (%2):</span> <strong>20.000 TL</strong></div>
              <div className="flex justify-between"><span>KDV (%20):</span> <strong>4.000 TL</strong></div>
              <div className="flex justify-between border-t border-border pt-2"><span>Toplam Ödenecek:</span> <strong className="text-foreground">24.000 TL</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Kiralama Komisyonu</h3>
            <p>
              Kiralama işlemlerinde komisyon bedeli <strong>en fazla 1 aylık kira bedeli + KDV</strong> kadardır.
              Taşınmaz Ticareti Hakkında Yönetmelik&apos;e göre, kiralama işlemlerinde komisyon bedeli, aksi yazılı
              olarak kararlaştırılmadıkça ev sahibi ile kiracı arasında eşit paylaştırılır.
            </p>
            <p>
              Piyasa uygulamasında ise bu bedel <strong>neredeyse her zaman kiracı</strong> tarafından karşılanır;
              hesaplayıcımız varsayılan olarak kiracının ödeyeceği komisyonu tek sonuç olarak gösterir. Kesin uygulama,
              emlak danışmanınızla yapacağınız sözleşmede belirlenir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Ödeme Zamanı ve Şekli</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Satışta:</strong> Tapu işlemi sırasında ödenir.</li>
              <li><strong>Kiralamada:</strong> Kira sözleşmesi imzalanırken ödenir.</li>
              <li>Ödeme nakit, kart veya havale/EFT ile yapılabilir; fatura mutlaka alınmalıdır.</li>
            </ul>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır. Resmi işlemlerinizde mutlaka emlakçınızın mesleki yeterlilik belgesini
                kontrol edin ve fatura/dekont alın.
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
            <p className="section-description">Emlak alım satım/kiralama sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
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