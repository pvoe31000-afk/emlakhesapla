import type { Metadata } from "next";
import Link from "next/link";
import EmlakVergisiClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Emlak Vergisi Hesaplama - Konut & İşyeri Oranları",
  description: "Emlak vergisi hesaplayıcı: Belediye rayiç bedeli üzerinden konut (%0,1) ve işyeri (%0,2) için yıllık emlak vergisi tutarını anlık hesaplayın. Güncel oranlar.",
  openGraph: {
    title: "Emlak Vergisi Hesaplama - Konut & İşyeri",
    description: "Rayiç bedel girin, yıllık emlak vergisini saniyelerde hesaplayın. Konut/işyeri ayrımı, büyükşehir farkı, güncel oranlar.",
    type: "website",
  },
};

const internalLinks = [
  { href: "/tapu-harci-hesaplama", label: "Tapu Harcı Hesaplama" },
  { href: "/komisyon-hesaplama", label: "Emlakçı Komisyonu Hesaplama" },
  { href: "/konut-kredisi-hesaplama", label: "Konut Kredisi Taksit Hesaplama" },
  { href: "/kira-stopaji-hesaplama", label: "Kira Stopajı Hesaplama" },
  { href: "/deger-artisi-kazanci-hesaplama", label: "Değer Artış Kazancı Vergisi" },
  { href: "/kira-artis-hesaplama", label: "Kira Artış Oranı Hesaplama" },
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Emlak vergisi oranı ne kadardır?",
    answer: "Güncel emlak vergisi oranları şöyledir: konutlarda binde 1 (%0,1), işyerlerinde binde 2 (%0,2), arazilerde binde 1 ve arsalarda (imarlı) binde 3'tür. Büyükşehir belediye sınırları içinde bu oranlar %100 artırılarak uygulanır.",
  },
  {
    question: "Emlak vergisi beyannamesi ne zaman verilir?",
    answer: "Yeni edinilen gayrimenkul için ilk emlak vergisi beyannamesi, gayrimenkulün tapu tescilini takip eden ayı içinde 30 gün içinde verilir. Sonraki yıllarda beyanname verilmez; vergi otomatik tahakkuk ettirilir ve iki taksitle (Mart ve Kasım) ödenir.",
  },
  {
    question: "Emlak vergisinin matrahı nedir?",
    answer: "Emlak vergisinin matrahı, belediyenin her yıl belirlediği rayiç bedelidir (emlak vergisi değeri). Bu değer Tapu ve Kadastro Bilgi Sistemi ve belediye kayıtlarına dayanır.",
  },
  {
    question: "Emlak vergisinden muafiyet var mı?",
    answer: "Evet, bazı muafiyetler vardır: 200 metrekareyi geçmeyen tek konutu olan brüt asgari ücretlilere muafiyet uygulanabilir. Ayrıca emeklilere ve engellilere belirli şartlarda muafiyet tanınır.",
  },
  {
    question: "Emlak vergisi nereye ve nasıl ödenir?",
    answer: "Emlak vergisi, gayrimenkulün bulunduğu belediyeye ödenir. Ödeme, belediyenin veznesinden, banka üzerinden veya belediyenin online ödeme sistemi üzerinden yapılabilir. Vergi iki eşit taksitte ödenir: birinci taksit Mart-Nisan, ikinci taksit Kasım-Aralık aylarında.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Emlak Vergisi Hesaplama",
  description: "Belediye rayiç bedeli üzerinden konut ve işyeri için yıllık emlak vergisi tutarını hesaplayın.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Emlak Vergisi Hesaplayıcı",
    description: "Rayiç bedel ve kullanım türüne göre yıllık emlak vergisini hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function EmlakVergisiHesaplama() {
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
              <span className="text-foreground font-medium">Emlak Vergisi Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Emlak Vergisi Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Belediye rayiç bedeli üzerinden konut, işyeri, arsa ve arazi için yıllık emlak verginizi hesaplayın.
              Güncel oranlar ile büyükşehir farkını da dikkate alarak anlık sonuç alın.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <EmlakVergisiClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <p>
                    Emlak vergisi, gayrimenkulün belediye tarafından belirlenen <strong>rayiç bedeli</strong> üzerinden hesaplanır.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`Yıllık Vergi = Rayiç Bedel × Oran
Taksit = Yıllık Vergi / 2`}</pre>
                  <p>Kullanım türüne göre güncel oranlar:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Konut: binde 1 (%0,1)</li>
                    <li>İşyeri: binde 2 (%0,2)</li>
                    <li>Arsa (imarlı): binde 3 (%0,3)</li>
                    <li>Arazi (tarla): binde 1 (%0,1)</li>
                  </ul>
                  <p className="font-medium">
                    <strong>Büyükşehir farkı:</strong> 6360 sayılı Kanun gereği büyükşehir sınırlarında oranlar 2 katına çıkar.
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
            <h2 id="how-calculated-heading" className="section-title">Emlak Vergisi Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Emlak Vergisi Nedir?</h3>
            <p>
              Emlak vergisi, Türkiye&apos;deki binalar, arsalar ve araziler üzerinden her yıl belediyelere ödenen bir yerel vergi türüdür.
              1319 sayılı Emlak Vergisi Kanunu ile düzenlenir. Vergi, gayrimenkulün değeri ve kullanım türü esas alınarak hesaplanır
              ve yılda iki taksitte tahsil edilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Güncel Oranlar ve Matrah</h3>
            <p>
              Emlak vergisinin matrahı, ilgili belediyenin ve Tapu ve Kadastro müdürlüğünün verilerine dayanılarak her yıl
              belirlenen <strong>emlak vergisi değeri (rayiç bedel)</strong>dir. Bu değer üzerinden aşağıdaki oranlar uygulanır.
            </p>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Kullanım Türü</th>
                    <th className="text-center">Oran</th>
                    <th className="text-center">Büyükşehir (2 katı)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Konut (Mesken)</td><td className="text-center">binde 1</td><td className="text-center">binde 2</td></tr>
                  <tr><td>İşyeri</td><td className="text-center">binde 2</td><td className="text-center">binde 4</td></tr>
                  <tr><td>Arsa (İmar)</td><td className="text-center">binde 3</td><td className="text-center">binde 6</td></tr>
                  <tr><td>Arazi (Tarla)</td><td className="text-center">binde 1</td><td className="text-center">binde 2</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Rayiç Bedel Nasıl Öğrenilir?</h3>
            <p>
              Rayiç bedeli öğrenmek için gayrimenkulün bulunduğu belediyenin web sitesindeki emlak vergisi değeri sorgulama
              sistemini kullanabilir ya da belediyeye giderek sorgulama yapabilirsiniz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Mükellef Kimdir?</h3>
            <p>
              Emlak vergisinin mükellefi, gayrimenkulün sahibi olan kişidir. Birden fazla malik varsa her malik, hissesi
              oranında vergiye tabidir. Gayrimenkul tapulu değilse veya sahibi belli değilse, fiilen kullanan kişi (zilyet)
              mükellef sayılır. Mükellefiyet, gayrimenkulün edinimini izleyen vergi döneminden itibaren başlar; yıl içinde
              satın alınan bir konutun emlak vergisi, kural olarak bir sonraki yılın başından itibaren tahakkuk ettirilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Büyükşehir Belediyelerinde Oranlar</h3>
            <p>
              6360 sayılı Kanun uyarınca büyükşehir belediyesi bulunan illerde, il sınırlarının tamamı için emlak vergisi
              oranları <strong>%100 artırılarak</strong> (2 katına çıkarılarak) uygulanır. Örneğin konutta binde 1 yerine
              binde 2, işyerinde binde 2 yerine binde 4 ödenir. Büyükşehir olmayan illerde normal oranlar geçerlidir.
              Hesaplayıcımızda bu fark, &quot;büyükşehir sınırları içinde&quot; seçeneğiyle kolayca değerlendirilebilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Örnek Hesaplamalar</h3>
            <p>Aşağıda 1.000.000 TL rayiç bedelli bir birimin farklı durumları için hesaplamalar:</p>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Konut (binde 1):</span> <strong>1.000 TL/yıl</strong></div>
              <div className="flex justify-between"><span>Konut + Büyükşehir (binde 2):</span> <strong>2.000 TL/yıl</strong></div>
              <div className="flex justify-between"><span>İşyeri (binde 2):</span> <strong>2.000 TL/yıl</strong></div>
              <div className="flex justify-between"><span>İşyeri + Büyükşehir (binde 4):</span> <strong>4.000 TL/yıl</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Beyanname ve Ödeme Süreci</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Yeni edinim:</strong> Beyanname, tapu tescilini izleyen ay başından itibaren 30 gün içinde verilmelidir.</li>
              <li>Vergi dairesi/belediye matrahı tahakkuk ettirir.</li>
              <li>Ödeme 2 eşit taksitte yapılır: 1. taksit Mart-Nisan, 2. taksit Kasım-Aralık.</li>
            </ol>
            <p>
              Emlak vergisi ödemeleri gayrimenkulün bulunduğu belediyenin veznesinden, anlaşmalı banka şubelerinden veya
              belediyenin internet ödeme sayfasından yapılabilir. Süresinde ödenmeyen emlak vergisi için aylık gecikme zammı
              uygulanır; bu nedenle taksit tarihlerinin takip edilmesi önemlidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Emlak Vergisi Değerinin Güncellenmesi</h3>
            <p>
              Belediyeler, gayrimenkulün emlak vergisi değerini her yıl <strong>yeniden değerleme oranı</strong> üzerinden
              günceller. Hesaplanan bu değer, tapu ve kadastro kayıtlarıyla birlikte belirlenir ve genellikle serbest piyasa
              rayiç değerinden düşüktür. Güncelleme sonucunda değer, önceki yıla göre kanuni sınırın üzerinde artırılmışsa,
              mükellef tarafından ilgili belediyeye itiraz edilebilir ve vergi mahkemesinde dava açılabilir. Değer güncellemesi,
              emlak vergisinin her yıl artan bir matrah üzerinden hesaplanmasının temel nedenidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Muafiyet ve İstisnalar</h3>
            <p>
              Muafiyet şartları yıldan yıla ve mevzuata göre değişebilir; çoğu zaman tek konuta sahip olma koşulunu içerir.
              Muafiyetten yararlanmak genellikle ilgili belediyeye başvuru yapılmasına ve gelir kriterlerinin ispatına bağlıdır.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Geniş konut muafiyeti:</strong> 200 metrekareyi geçmeyen tek meskeni olan brüt asgari ücretlilere muafiyet (şartlı; kontrol edilmelidir)</li>
              <li><strong>Engelliler:</strong> %40 ve üzeri engelli kişilerin tek konutuna şartlı muafiyet</li>
              <li><strong>Emekliler:</strong> Belirli şartlarda ve sınırlı süreli muafiyetler</li>
            </ul>

            <p>
              Özetle emlak vergisini hesaplamak için iki bilgi yeterlidir: gayrimenkulün belediyede kayıtlı emlak vergisi değeri
              ve kullanım türü. Bu iki bilgiyle yıllık vergi tutarınızı yukarıdaki hesaplayıcıyla saniyeler içinde öğrenebilir;
              büyükşehir farkını ve taksit bölümlerini de aynı ekranda görüntüleyebilirsiniz.
            </p>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır. Emlak vergisi muafiyetleri ve oranlar yıllara göre değişebilir.
                Resmi işlemlerinizde mutlaka bağlı olduğunuz belediye ve/veya mali müşavirinizle güncel oranları doğrulayın.
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