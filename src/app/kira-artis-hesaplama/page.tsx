import type { Metadata } from "next";
import Link from "next/link";
import KiraArtisClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Kira Artış Oranı Hesaplama - TÜFE 12 Aylık Ortalama",
  description: "Kira artış oranı hesaplayıcı: TÜFE 12 aylık ortalama baz alınarak yeni kira tutarını ve artış oranını anlık hesaplayın. Güncel, sözleşme yenileme için.",
  openGraph: {
    title: "Kira Artış Oranı Hesaplama - TÜFE",
    description: "Mevcut kira ve TÜFE oranını girin, yeni kira tutarını saniyelerde hesaplayın. Güncel oranlar.",
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
  { href: "/toplam-satis-maliyeti-hesaplama", label: "Toplam Satış Maliyeti" },
  { href: "/kira-getirisi-hesaplama", label: "Kira Getirisi (Amortisman)" },
];

const faqData = [
  {
    question: "Kira artış oranı nasıl hesaplanır?",
    answer: "Konutlarda kira artışı üst sınırı, bir önceki yılın 12 aylık ortalama TÜFE oranıdır. Bu sınır TÜİK verileriyle Resmi Gazete'de yayımlanır. Hesaplayıcımız bu 12 aylık ortalama TÜFE oranını kullanır.",
  },
  {
    question: "Kira artışı ne zaman yapılabilir?",
    answer: "Kira artışı, kira sözleşmesinin yenileme tarihinde yapılır. 5 yıllık dönemden sonra yapılan yenilemelerde kira bedeli, hakim tarafından tespit edilen yeni kiralanan bir meskenin kira bedeline göre yeniden belirlenebilir. Ticari kiralamalarda artış serbesttir.",
  },
  {
    question: "Konut kiralamalarında azami artış oranı nedir?",
    answer: "Konut kiralamalarında azami artış oranı, bir önceki yılın 12 aylık ortalama TÜFE oranıdır. Kiracı ve ev sahibi bu oranın altında anlaşabilir ancak üzerine çıkamaz.",
  },
  {
    question: "TÜFE yerine ÜFE kullanılabilir mi?",
    answer: "Konut kiralamalarında yasal olarak TÜFE'nin 12 aylık ortalaması kullanılır. Ticari (işyeri) kiralamalarda taraflar sözleşmede TÜFE, ÜFE (Yİ-ÜFE) veya ikisinin ağırlıklı ortalaması gibi endeksler belirleyebilir.",
  },
  {
    question: "Sözleşmede artış oranı yazmıyorsa ne yapılır?",
    answer: "Sözleşmede artış oranı belirtilmemişse kira bedeli artırılamaz; mevcut kira aynen devam eder. Ev sahibi dava açarak emsal kira bedelinin tespitini talep edebilir.",
  },
  {
    question: "Sözleşme süresi bitmeden kira artışı yapılabilir mi?",
    answer: "Hayır. Kira artışı ancak sözleşme yenileme döneminde yapılabilir. Sözleşme süresi içinde tek taraflı kira artışı yasal değildir.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Kira Artış Oranı Hesaplama",
  description: "TÜFE 12 aylık ortalama baz alınarak kira artış oranı ve yeni kira tutarını hesaplayın.",
  mainEntity: {
    "@type": "CalculatorTool",
    name: "Kira Artış Oranı Hesaplayıcı",
    description: "Mevcut kira ve TÜFE oranına göre kira artışını hesaplayan araç.",
  },
  publisher: {
    "@type": "Organization",
    name: "emlakhesapla.com",
    url: "https://emlakhesapla.com",
  },
};

export default function KiraArtisOraniHesaplama() {
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
              <span className="text-foreground font-medium">Kira Artış Oranı Hesaplama</span>
            </nav>
            <h1 id="calculator-heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Kira Artış Oranı Hesaplama
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
              Kira sözleşmenizin yenileme döneminde uygulanacak artış oranını ve yeni kira tutarını,
              TÜFE 12 aylık ortalama bazında anlık hesaplayın. Güncel oranlarla.
            </p>
          </header>

          <div className="calculator-grid">
            <div>
              <KiraArtisClient />

              <div className="mt-8 adsense-placeholder" role="region" aria-label="Reklam alanı">
                <span>Reklam Alanı (300x250 / 336x280)</span>
              </div>
            </div>

            <aside className="sticky-sidebar space-y-6">
              <div className="card">
                <h3 className="card-title">Nasıl Hesaplanır?</h3>
                <div className="prose prose-stone max-w-none text-sm text-muted-foreground space-y-4">
                  <p>
                    Konut kiralamalarında kira artış üst sınırı, bir önceki yılın <strong>12 aylık ortalama TÜFE</strong> oranıdır.
                  </p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`Artış Tutarı = Mevcut Kira × (TÜFE / 100)
Yeni Kira = Mevcut Kira + Artış Tutarı`}</pre>
                  <p><strong>Örnek:</strong> 15.000 TL kira ve %43,64 TÜFE ile yeni kira:</p>
                  <pre className="bg-surface-alt p-3 rounded-md font-mono text-sm overflow-x-auto">{`15.000 × 0,4364 = 6.546 TL artış
15.000 + 6.546 = 21.546 TL yeni kira`}</pre>
                  <p className="font-medium">Ticari (işyeri) kiralamalarda artış sözleşmeye bağlı olarak serbesttir.</p>
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
            <h2 id="how-calculated-heading" className="section-title">Kira Artış Oranı Nasıl Hesaplanır?</h2>
          </header>
          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Kira Artışı Nedir?</h3>
            <p>
              Kira artışı, kira sözleşmesinin yenileme döneminde ev sahibinin kiracıdan talep edebileceği yeni kira bedelini
              belirleme işlemidir. Türk Borçlar Kanunu gereği konut ve çatılı işyeri kiralarında artış,
              <strong> bir önceki kira yılında TÜFE&apos;deki 12 aylık ortalamalara göre değişim oranını</strong> geçmemek üzere
              sözleşmede belirlenir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">12 Aylık Ortalama TÜFE Nedir?</h3>
            <p>
              TÜİK her ay, geçmiş 12 ayın tüketici fiyat endeksi ortalamasındaki değişim oranını açıklar. Bu oran, konutlarda
              kira artış üst sınırını belirler. Örneğin TÜİK&apos;in açıkladığı 12 aylık ortalama değişim %43,64 ise, kira artışı
              bu oranı geçemez.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Yasal Dayanak (TBK m.344)</h3>
            <p>
              Türk Borçlar Kanunu&apos;nun 344. maddesine göre kira bedeli, tarafların anlaşması söz konusu olduğunda bile en
              fazla bir önceki kira yılındaki TÜFE değişim oranı kadar artırılabilir. Kanun, konut ve çatılı işyeri kiralarını
              özel olarak koruma altına almıştır. Düzenlemenin amacı, enflasyon karşısında kiracının kaybını sınırlamak ve
              artışın öngörülebilir olmasını sağlamaktır. Bu nedenle sözleşmelere konulan TÜFE&apos;yi aşan artış kayıtları kural
              olarak geçersizdir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Hesaplama Yöntemi</h3>
            <div className="bg-surface-alt p-4 rounded-lg border border-border space-y-2 font-mono text-sm">
              <div className="flex justify-between"><span>Mevcut Kira:</span> <strong>15.000 TL</strong></div>
              <div className="flex justify-between"><span>12 Aylık Ortalama TÜFE:</span> <strong>%43,64</strong></div>
              <div className="flex justify-between border-t border-border pt-2"><span>Artış Tutarı:</span> <strong>6.546 TL</strong></div>
              <div className="flex justify-between"><span>Yeni Kira:</span> <strong>21.546 TL</strong></div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">Konut Kiralamalarında Üst Sınır</h3>
            <p>
              Yapılan düzenlemeyle konut kiralarındaki artış oranı, bir önceki yılın 12 aylık ortalama
              TÜFE oranıyla sınırlandırılmıştır. Kiracı ve ev sahibi daha düşük oranda anlaşabilir ancak bu oranın üzerinde
              bir artış yapılamaz.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Sözleşmede Artış Şartı Yazmıyorsa</h3>
            <p>
              Sözleşmede kira artışına ilişkin bir hüküm bulunmuyorsa ev sahibi, sözleşme yenileme döneminde tek taraflı
              artış yapamaz; mevcut kira bedeli aynen uygulanmaya devam eder. Ev sahibinin elinde yalnızca, emsal kira
              bedellerine göre kiranın yeniden belirlenmesi için dava açma imkânı vardır. Bu davada hakim, bölgedeki benzer
              özellikteki konutların kira bedellerini dikkate alarak adil bir tutar belirler.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Ticari (İşyeri) Kiralamalar</h3>
            <p>
              İşyeri kiralarında artış, tarafların sözleşmede belirlediği orana göre yapılır. Genellikle TÜFE, Yİ-ÜFE veya
              ikisinin ağırlıklı ortalaması baz alınır. Sözleşmede oran belirtilmemişse hakim TÜFE&apos;ye göre belirler.
            </p>

            <h3 className="text-xl font-semibold text-foreground">5 Yıl Sonrası Durum</h3>
            <p>
              Kira sözleşmesi yenilemelerle birlikte 5 yılı geçmişse, ev sahibi kira bedelinin yeniden belirlenmesi için dava
              açabilir. Hakim, emsallere göre yeni bir kira bedeli tespit eder.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Kira Dışı Ödemeler ve Depozito</h3>
            <p>
              Kira artışı yalnızca kira bedeline uygulanır; aidat, depozito, yakıt ve ortak gider gibi kalemler otomatik olarak
              artışa tabi değildir. Aidat, yönetim kararıyla ayrıca belirlenir; depozito ise en fazla üç aylık kira bedeliyle
              sınırlıdır ve yeni kira bedeli üzerinden yeniden düzenlenebilir. Yeni kira tutarını hesaplarken bu kalemleri
              hesabın dışında tutmanız gerekir; aksi hâlde toplam maliyet yanıltıcı olabilir.
            </p>

            <h3 className="text-xl font-semibold text-foreground">Önemli Noktalar</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Artış yalnızca sözleşme yenileme döneminde yapılabilir.</li>
              <li>Sözleşmede artış oranı yazmıyorsa kira artırılamaz (5. yıl sonrası ve dava hariç).</li>
              <li>Diğer kalemler (aidat, depozito vb.) kira artışına tabi olmayabilir.</li>
              <li>Güncel TÜFE oranını TÜİK&apos;in resmi sitesinden öğrenin; hesaplayıcıda kullanılan değer örnektir.</li>
            </ul>

            <p>
              Kira artış oranı hesaplamasında anahtar değişken, TÜİK&apos;in yayımladığı 12 aylık ortalama TÜFE oranıdır. Bu oran
              her ay güncellendiği için sözleşme yenileme tarihinizdeki en güncel değeri kullanmanız gerekir. Hesaplayıcımızda
              otomatik gelen oranı güncel TÜİK verisiyle değiştirerek istediğiniz dönem için doğru sonucu alabilirsiniz.
            </p>
            <p>
              Sözleşmeniz uzun süredir devam ediyorsa belirlenen oranın altında bir artış talep edilmesi mümkündür;
              hesaplamada dönemin en güncel TÜFE oranını temel almanız her iki taraf için de sağlıklı bir zemin kurar.
            </p>

            <div className="p-4 bg-surface-alt rounded-lg border border-border">
              <p className="font-medium text-foreground mb-2">Uyarı</p>
              <p className="text-sm text-muted-foreground">
                Bu hesaplayıcı bilgilendirme amaçlıdır. En güncel TÜFE 12 aylık ortalama oranını TÜİK&apos;in resmi sitesinden
                veya Resmi Gazete&apos;den kontrol edin. Hukuki işlemlerinizde avukatınıza danışın.
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