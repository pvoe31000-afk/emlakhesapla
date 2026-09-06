import type { Metadata } from "next";
import Link from "next/link";
import ToplamSatisMaliyetiClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Toplam Satış / Alım Maliyeti Hesaplama - Tapu Harcı ve Komisyon",
  description: "Toplam satış/alım maliyeti hesaplayıcı: Satış bedeline göre tapu harcı (%2), emlakçı komisyonu (%2 + KDV), DASK ve diğer giderleri tek bir toplam maliyet özetinde hesaplayın.",
  openGraph: {
    title: "Toplam Satış / Alım Maliyeti Hesaplama",
    description: "Alıcı veya satıcı tarafına göre tapu harcı, komisyon ve sigorta dahil toplam maliyeti hesaplayın.",
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
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Tapu harcı alıcıdan mı satıcıdan mı alınır?",
    answer: "Tapu harcı, satış bedeli üzerinden toplam %4 olarak alınır ve yasal olarak devreden (satıcı) ile devralan (alıcı) arasında genellikle eşit paylaşılır (her biri %2). Taraflar sözleşmeyle paylaşımı farklı düzenleyebilir. Harç, satış bedeli ile belediye rayiç değerinden yüksek olanı üzerinden hesaplanır.",
  },
  {
    question: "Emlakçı komisyonu ne kadar?",
    answer: "Satış işlemlerinde genel uygulama, satış bedelinin %2&apos;si artı KDV olarak her tarafın (alıcı ve satıcı) ayrı ayrı komisyon ödemesidir. Kiralama işlemlerinde ise genellikle bir aylık kira bedeli kadar komisyon alınır. Oranlar taraflar arasındaki sözleşmeye göre değişebilir.",
  },
  {
    question: "DASK zorunlu mu?",
    answer: "Zorunlu Deprem Sigortası (DASK), Türkiye&apos;deki tüm bağımsız bölümler için zorunludur. Tapu işlemleri ve konut kredisi kullanımında sigortasız işlem yapılamaz. Yıllık prim, konutun bulunduğu ilçeye, binanın yapı tarzına ve büyüklüğüne göre değişir.",
  },
  {
    question: "Toplam maliyete KDV de dahil mi?",
    answer: "Emlakçı komisyonu KDV&apos;ye tabidir ve %20 KDV tutarı komisyon üzerinden hesaplanır. Tapu harcı ise harç olduğu için KDV&apos;ye tabi değildir. Hesaplayıcı, KDV&apos;yi komisyon kalemine ekleyerek toplam maliyete dahil eder.",
  },
  {
    question: "Satış bedelini rayiçten düşük gösterirsem ne olur?",
    answer: "Tapu harcı, satış bedeli ile belediye rayiç değerinden yüksek olanı üzerinden hesaplanır. Bedeli düşük göstermek harcı düşürmez; üstelik eksik beyan nedeniyle vergi cezası ve faiz riski doğurur. Satış bedelinin gerçeğe uygun olması her iki tarafın da yararınadır.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Toplam Satış / Alım Maliyeti Hesaplama",
  description: "Tapu harcı, komisyon, DASK ve diğer giderleri kapsayan toplam maliyet hesaplama aracı.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Toplam Satış/Alım Maliyeti Hesaplayıcı",
    description: "Alıcı veya satıcı tarafına göre işlem maliyetlerini toplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function ToplamSatisMaliyetiHesaplama() {
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
              <span className="text-foreground font-medium">Toplam Satış / Alım Maliyeti</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Toplam Satış / Alım Maliyeti Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Alıcı veya satıcı olarak bu işlemde ne kadar ödeyeceğinizi görün: tapu harcı, emlakçı komisyonu (KDV dahil),
              DASK ve diğer giderler tek bir toplam maliyet özetinde.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <ToplamSatisMaliyetiClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <h4 className="font-medium text-foreground">Tek Taraf İçin Özet</h4>
                  <p>
                    Her taraf ayrı ayrı tapu harcı %2 ve komisyon %2 + KDV bakar.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Tapu Harcı  = Bedel × 0,02
Komisyon   = Bedel × 0,02
KDV        = Komisyon × 0,20
Toplam     = Tapu Harcı + Komisyon
             + KDV + Sigorta + Diğer`}</pre>

                  <h4 className="font-medium text-foreground">Örnek (2.000.000 TL)</h4>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">
{`Tapu Harcı  = 40.000 TL
Komisyon   = 40.000 TL
KDV        = 8.000 TL
Toplam     ≈ 88.000 TL + sigorta/diğer`}</pre>
                  <p className="font-medium">
                    İşlem toplamında her iki tarafın payı ayrı hesaplanır.
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
            <h2 id="how-calculated-heading" className="section-title">Toplam Satış / Alım Maliyeti Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Alım-Satımda Hangi Kalemler Var?</h3>
            <p>
              Bir gayrimenkulün tapu devrinde, satış bedelinden ayrı olarak ödenen birden fazla kalem vardır. Bunların başında
              <strong> tapu harcı</strong> ve <strong>emlakçı komisyonu</strong> gelir; bunlara <strong>DASK ve konut
              sigortası</strong>, noter ve ekspertiz gibi işlem giderleri eklenir. Tüm bu kalemlerin toplamı, işlemin gerçek
              nakit çıkışını gösterir. Hesaplayıcımız alıcı veya satıcı tarafına göre bu kalemleri tek bir &quot;toplam maliyet&quot;
              özetinde birleştirir.
            </p>
            <p>
              Çoğu alıcı veya satıcı yalnızca satış bedelini bütçeler; ancak işlem maliyetleri bedelin yaklaşık
              <strong> %4-6&apos;sına</strong> ulaşabilir. Bu hesaplayıcı, sürpriz çıkışlarla karşılaşmamanız için tüm yükü
              önceden görmenizi sağlar. İşlem maliyetleri; harcın sözleşmeyle taraflar arasında paylaştırılması, komisyonun
              KDV dahil tutarı ve binanın sigorta durumu gibi değişkenlere göre farklılaşır; bu yüzden tek bir kalem yerine
              paket halinde değerlendirilmelidir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Tapu Harcı Nedir?</h3>
            <p>
              Tapu harcı, her türlü taşınmaz devrinde ödenen bir vergidir ve toplam <strong>%4</strong> oranında alınır.
              Yasal düzenlemeye göre devreden ve devralan eşit pay üstlenir; böylece her taraf satış bedelinin
              <strong> %2&apos;si</strong> kadar harç öder. Taraflar talep ederse oransal paylaşım sözleşmeyle farklılaştırılabilir.
              Harç matrahı, satış bedeli ile belediye rayiç değerinden yüksek olanıdır; düşük gösterim sonuç değiştirmez.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Emlakçı Komisyonu ve KDV</h3>
            <p>
              Aracılık hizmeti karşılığında ödenen komisyon, sektörde genellikle satış bedelinin <strong>%2&apos;si</strong>
              olarak uygulanır ve tarafların her birinden <strong>ayrı ayrı</strong> alınır. Komisyon hizmeti niteliği
              gereği <strong>%20 KDV</strong> kapsamındadır; bu yüzden gerçek komisyon yükü %2,4&apos;e yaklaşır. Kiralama
              işlemlerinde ise komisyon genelde bir aylık kira bedeli kadardır ve benzer şekilde KDV eklenir. Örneğin
              komisyon tutarı 40.000 TL ise buna 8.000 TL KDV eklenir ve tarafın komisyon yükü 48.000 TL olur.
            </p>

            <h3 className="text-xl font-semibold text-foreground">DASK ve Diğer İşlem Giderleri</h3>
            <p>
              Zorunlu Deprem Sigortası (DASK), tapu devri ve konut kredisi için şarttır ve yıllık primi; ilçe, yapı tarzı
              ve büyüklüğe göre değişir. Bunun yanında <strong>ekspertiz ücreti</strong>, <strong>noter vekâlet işlemleri</strong>,
              <strong>konut kredisi dosya masrafı</strong> ve ipotek tesis masrafı gibi giderler de işleme eklenir. Bu kalemleri
              &quot;diğer giderler&quot; alanına girerek toplamı gerçeğe yaklaştırabilirsiniz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Hesaplama Örneği</h3>
            <p>
              2.000.000 TL bedelli bir konutun alımında alıcı taraf için tipik bir durum:
            </p>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Tapu Harcı (%2):</span> <strong>40.000 TL</strong></div>
              <div className="flex justify-between"><span>Emlakçı Komisyonu (%2):</span> <strong>40.000 TL</strong></div>
              <div className="flex justify-between"><span>KDV (%20):</span> <strong>8.000 TL</strong></div>
              <div className="flex justify-between"><span>DASK / Sigorta (yaklaşık):</span> <strong>2.000 TL</strong></div>
              <div className="flex justify-between"><span>Diğer Giderler:</span> <strong>10.000 TL</strong></div>
              <div className="flex justify-between border-t border-border pt-2"><span>Toplam Maliyet:</span> <strong>100.000 TL</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Kiralama Sonrasında Başka Kalemler Gündeme Gelir mi?</h3>
            <p>
              Gayrimenkul satın alındıktan sonra kiralanacaksa depozito, anahtar teslimi ve ara dönem giderleri de planlanmalıdır.
              Bu hesaplayıcı doğrudan alım-satım maliyetine odaklanır; ancak düzenli kira geliri bekliyorsanız kira getirisi
              (amortisman) hesaplayıcımızla yatırımın geri dönüş süresini de önceden görebilirsiniz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Önemli Noktalar</h3>
            <p>
              En yaygın hata, yalnızca satış bedelini bütçelemek ve harç ile komisyonu hesaba katmamaktır. Tüm kalemleri
              tek hesaplamada toplamak, nakit akışınızı doğru planlamanızı, pazarlıkta gerçekçi bir bütçe önermenizi ve
              kredi gerekiyorsa eksiksiz başvuru yapmanızı sağlar. Teklif vermeden önce bu hesaplayıcıyı mutlaka kullanın.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Tapu harcı ve komisyon payları taraflar arasında sözleşmeyle değiştirilebilir.</li>
              <li>Komisyon yalnızca anlaşmalı emlak ofisi varsa geçerlidir; doğrudan satışta bu kalem düşer.</li>
              <li>Rayiç değerin üzerinde yapılan işlemlerde harç, satış bedeli üzerinden hesaplanır.</li>
              <li>Konut kredisi kullanılıyorsa ekspertiz ve ipotek masrafları mutlaka eklenmelidir.</li>
              <li>Banka ve emlak ofisi tekliflerini karşılaştırırken tüm masrafları aynı sepete koyun.</li>
            </ul>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Hesaplamada kullanılan oranlar genel uygulamaya dayanır ve resmi oranlardaki güncellemeleri yansıtmayabilir.
                Kesin tutarlar için noteriniz, tapu müdürlüğünüz ve emlak danışmanınızla görüşün. emlakhesapla.com sonuçlardan
                doğacak sorumluluk kabul etmez.
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
            <p className="section-description">Gayrimenkul alım-satım sürecinde ihtiyacınız olabilecek diğer hesaplama araçları.</p>
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