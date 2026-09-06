import type { Metadata } from "next";
import Link from "next/link";
import KiraGetirisiClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Kira Getirisi (Amortisman) Hesaplama - Brüt/Net Getiri ve Amortisman",
  description: "Kira getirisi (amortisman) hesaplayıcı: Gayrimenkul alış fiyatı, aylık kira ve yıllık giderlere göre brüt/net yıllık getiri yüzdesini ve amortisman (geri ödeme) süresini hesaplayın.",
  openGraph: {
    title: "Kira Getirisi (Amortisman) Hesaplama",
    description: "Konut yatırımınızın brüt ve net getirisini ile kendini ödeme süresini hesaplayın.",
    type: "website",
  },
};

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/konut-kredisi-hesaplama", label: "Konut Kredisi Taksit Hesaplama" },
  { href: "/kira-stopaji-hesaplama", label: "Kira Stopajı Hesaplama" },
  { href: "/deger-artisi-kazanci-hesaplama", label: "Değer Artış Kazancı Vergisi" },
  { href: "/emlak-vergisi-hesaplama", label: "Emlak Vergisi Hesaplama" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
];

const faqData = [
  {
    question: "Kira getirisi (rantabilite) nedir?",
    answer: "Kira getirisi, bir gayrimenkulün alış fiyatına göre yıllık kira gelirinin yüzde olarak ifadesidir. Örneğin 3.000.000 TL&apos;ye alınan bir ev yılda 300.000 TL kira getiriyorsa brüt getirisi %10&apos;dur. Net getiriye bu tutardan giderler düşülerek ulaşılır.",
  },
  {
    question: "Brüt ve net getiri arasındaki fark nedir?",
    answer: "Brüt getiri, yıllık kira gelirinin alış fiyatına oranıdır ve giderleri ihmal eder. Net getiri, yıllık kira gelirinden aidat, emlak vergisi, bakım ve sigorta gibi giderler düşüldükten sonra kalan tutarın alış fiyatına oranıdır. Yatırım kararı için net getiri güvenilir göstergedir.",
  },
  {
    question: "Amortisman (geri ödeme) süresi nasıl hesaplanır?",
    answer: "Amortisman süresi, alış fiyatının yıllık net kira gelirine bölünmesiyle bulunur. Örneğin 3.000.000 TL&apos;lik ev, yıllık 240.000 TL net gelir getiriyorsa kendini 12,5 yılda öder. Düşük amortisman süresi, yüksek getiri anlamına gelir.",
  },
  {
    question: "Getirisi yüksek evlerde risk var mı?",
    answer: "Brüt getirisi ortalamanın çok üzerinde olan ilanlar; merkezi olmayan bölgeler, düşük likidite, yüksek boşluk oranı veya kira tahsilat riski taşıyabilir. Getiri oranını değerlendirirken bölgenin kiralanabilirliği ve uzun vadeli değer artışı da göz önünde bulundurulmalıdır.",
  },
  {
    question: "Kira gelirinin vergisi getiriyi nasıl etkiler?",
    answer: "Konut kiralarında belirli bir istisna tutarının üzerindeki gelir yıllık gelir vergisi beyannamesine tabidir. Vergi, net getiriyi düşürür; bu yüzden gerçekçi bir hesaplama için vergi yükünü de yıllık giderlere eklemeniz önerilir. Detaylar için kira stopajı hesaplayıcımıza bakabilirsiniz.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kira Getirisi (Amortisman) Hesaplama",
  description: "Gayrimenkul yatırımının brüt/net getiri ve amortisman süresi hesaplama aracı.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Kira Getirisi Hesaplayıcı",
    description: "Alış fiyatı ve kira gelirine göre rantabilite hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function KiraGetirisiHesaplama() {
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
              <span className="text-foreground font-medium">Kira Getirisi Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Kira Getirisi (Amortisman) Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Gayrimenkulünüzün brüt ve net yıllık getirisini, yatırımın kendini kaç yılda ödeyeceğini (amortisman süresini)
              alış fiyatı, kira ve gider bilgilerinizle anlık hesaplayın.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <KiraGetirisiClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <h4 className="font-medium text-foreground">Formüller</h4>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Brüt Getiri = (Yıllık Kira / Alış) × 100
Net Gelir   = Yıllık Kira − Giderler
Net Getiri  = (Net Gelir / Alış) × 100
Amortisman  = Alış / Net Gelir (yıl)`}</pre>

                  <h4 className="font-medium text-foreground">Örnek (3.000.000 TL)</h4>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Aylık kira  = 25.000 TL
Yıllık kira = 300.000 TL (%10 brüt)
Giderler    = 60.000 TL
Net gelir   = 240.000 TL (%8 net)
Amortisman  = 12,5 yıl`}</pre>
                  <p className="font-medium">
                    Yatırım kararlarında net getiri ve amortisman süresi yol göstericidir.
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
            <h2 id="how-calculated-heading" className="section-title">Kira Getirisi Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Rantabilite Nedir?</h3>
            <p>
              Kira getirisi veya rantabilite, bir gayrimenkulün satın alma bedeline göre ürettiği yıllık kira gelirinin
              yüzde cinsinden karşılığıdır. Örneğin 3.000.000 TL&apos;ye alınan bir konut, yılda 300.000 TL kira geliri
              sağlıyorsa brüt kira getirisi %10&apos;dur. Bu oran, gayrimenkulün bir yatırım aracı olarak performansını
              farklı bölgeler ve farklı varlık sınıflarıyla karşılaştırmaya yarar.
            </p>
            <p>
              Basit bir ifadeyle brüt getiri, &quot;kabaca ne kadar kazandırıyor?&quot; sorusunu; net getiri ise &quot;giderler düşüldükten
              sonra cebime ne kalıyor?&quot; sorusunu yanıtlar. Yatırım kararı verirken her iki değerin de bilinmesi gerekir.
              Gayrimenkul satın almadan önce farklı bölgelerdeki konutları aynı formülle karşılaştırarak paranızın
              nerede en verimli çalışacağını görebilirsiniz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Brüt Getiri Formülü</h3>
            <pre className="bg-surface-alt p-4 rounded-md font-mono overflow-x-auto">
{`Brüt Yıllık Getiri (%) = (Aylık Kira × 12) ÷ Alış Fiyatı × 100`}</pre>
            <p>
              Formülde kira geliri 12 ile çarpılarak yıllıklaştırılır ve alış fiyatına oranlanır. Gider, vergi ve boş
              dönemler hesaba katılmadığı için bu değer en iyimser tabloyu gösterir; bu nedenle yalnızca ilk eleme aşamasında
              kullanılmalıdır.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Net Getiri Gerçek Tabloyu Gösterir</h3>
            <p>
              Bir konutun maliyeti yalnızca satın alma bedelinden ibaret değildir. Sahiplik sürecinde <strong>aidat</strong>,
              <strong> emlak vergisi</strong>, <strong>bakım ve onarım</strong>, <strong>sigorta</strong> gibi giderler her yıl
              çıkar. Ayrıca kiracı geçiş dönemlerinde <strong>boş kalma riski</strong> ve tahsil edilemeyen kiralar da söz
              konusudur. Net getiri; yıllık kira gelirinden bu giderleri düşerek hesaplanır ve yatırımın gerçek kârlılığını
              gösterir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Amortisman (Geri Ödeme) Süresi</h3>
            <pre className="bg-surface-alt p-4 rounded-md font-mono overflow-x-auto">
{`Amortisman Süresi (yıl) = Alış Fiyatı ÷ Yıllık Net Kira Geliri`}</pre>
            <p>
              Amortisman süresi, yatırımın net kira geliriyle kendini kaç yılda ödeyeceğini gösterir. Örneğimizde
              3.000.000 TL&apos;lik ev yılda 240.000 TL net gelir sağlıyorsa kendini yaklaşık <strong>12,5 yılda</strong> öder.
              Sektörde kira çarpanı olarak da bilinen bu süre; bölgeye göre 10-25 yıl arasında değişir ve değer karşılaştırmasında
              sık kullanılır.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Getiriyi Etkileyen Faktörler</h3>
            <p>
              Getiri oranı sabit değildir; <strong>bölgenin talep yoğunluğu</strong>, ulaşım ve sosyal donatılar, arz artışları
              ve makroekonomik koşullarla sürekli yeniden şekillenir. Yüksek brüt getiri sunan bölgelerde likidite düşük olabilir:
              gayrimenkulü satmak istediğinizde talep bulmak zaman alabilir. Bu yüzden getiri yüzdesi ile bölgenin uzun vadeli
              değer artış potansiyeli birlikte değerlendirilmelidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Ne Kadar Getiri İyi Sayılır?</h3>
            <p>
              Türkiye&apos;de konut kiralarında brüt rantabilite genellikle %3-7 aralığında değişir; merkezdeki konutlar
              %3-4, talebin güçlü olduğu gelişen bölgelerdeki küçük birimler %6-7 aralığında getiri üretebilir. Net getiri,
              gider oranına bağlı olarak brütün genellikle birkaç puan altındadır. Amortisman süresi ise 15-25 yıl arası
              yaygın kabul görür; 10 yılın altına inen bölgeler istisnai fırsatlar olarak değerlendirilebilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Önemli Noktalar</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Kira gelirleri her yıl artar; amortisman hesabı kiranın sabit kaldığını varsayar.</li>
              <li>Boş dönemleri ve tahsilat riskini bulunan getiriden ayrıca düşünün.</li>
              <li>Vergi yükü net getiriyi düşürür; kira vergileri için <Link href="/kira-stopaji-hesaplama" className="link">kira stopajı hesaplayıcımıza</Link> bakın.</li>
              <li>Krediyle alımda faiz gideri net getiriyi doğrudan etkiler; <Link href="/konut-kredisi-hesaplama" className="link">konut kredisi hesaplayıcımızı</Link> kullanın.</li>
              <li>Gayrimenkulün asıl kazancı değer artışı olabilir; kira getirisi tek başına yeterli gösterge değildir.</li>
            </ul>

            <p>
              Sonuç olarak rantabilite, gayrimenkul yatırımının &quot;kârlı mı?&quot; sorusuna ilk yanıtı veren hızlı ve güçlü bir
              araçtır. Ancak nihai karar; konum, likidite, değer artış potansiyeli, vergi ve kredi koşullarıyla birlikte
              verilmelidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Boş Dönem ve Tahsilat Riski</h3>
            <p>
              Bir konutun yıl boyunca hiç boş kalmayacağı tam olarak kestirilemez; her kiracı değişimi ilan süresi,
              tamirat ve yeni kiracıyla anlaşma aşamalarında en az 1-2 aylık gelir kaybı oluşturabilir. Bu nedenle
              hesabı yaparken kira bedelini temkinli, giderleri ise olduğundan düşük seçmemeye özen gösterin. Böylece
              net getiri gerçeğe yakın kalır ve yatırım kararınız sürprizlerden korunur.
            </p>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır; gelecekteki kira ve gider tahminlerini yansıtmaz. Yatırım kararınızı
                bölgenin güncel verileri ve profesyonel danışmanlıkla birlikte oluşturun. emlakhesapla.com hesaplama
                sonuçlarından doğacak sorumluluk kabul etmez.
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
            <p className="section-description">Gayrimenkul yatırımınızı değerlendirirken işinize yarayacak diğer araçlar.</p>
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