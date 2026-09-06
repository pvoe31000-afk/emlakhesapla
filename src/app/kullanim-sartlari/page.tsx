import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "emlakhesapla.com kullanım şartları. Site kullanım kuralları ve yasal sorumluluk reddi hakkında bilgi.",
};

export default function KullanimSartlari() {
  return (
    <>
      <section className="section" aria-labelledby="heading">
        <div className="container max-w-3xl">
          <header className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="text-foreground font-medium">Kullanım Şartları</span>
            </nav>
            <h1 id="heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Kullanım Şartları</h1>
            <p className="mt-3 text-muted-foreground">Bu belge düzenli olarak güncellenmektedir.</p>
          </header>

          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h2 className="text-xl font-semibold text-foreground">1. Kabul</h2>
            <p>
              emlakhesapla.com&apos;u (&quot;sitemiz&quot;) ziyaret ederek ve kullanarak bu kullanım şartlarını kabul etmiş olursunuz.
              Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayın.
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Bilgilendirme Amaçlı İçerik</h2>
            <p>
              Sitemizde yer alan tüm içerik, hesaplama araçları ve açıklamalar <strong>yalnızca bilgilendirme amaçlıdır</strong>.
              Bu içerikler; vergi, hukuk, mali danışmanlık veya gayrimenkul danışmanlığı hizmeti niteliği taşımaz. Yasal
              işlemlerinizde mutlaka ilgili kamu kuruluşlarına, notere, mali müşavirinize, avukatınıza veya diğer uzmanlara
              danışmalısınız.
            </p>

            <h2 className="text-xl font-semibold text-foreground">3. Hesaplama Sonuçlarının Doğruluğu</h2>
            <p>
              Hesaplama araçlarımız, yayımlandıkları tarihteki mevzuata dayanarak hazırlanmıştır. Vergi oranları, istisna
              tutarları, endeks katsayıları ve diğer parametreler <strong>değişebilir</strong>. Site yönetimi, hesaplama
              sonuçlarının güncelliği ve doğruluğu konusunda garanti vermez. Hesaplama sonuçlarına dayanarak yapacağınız
              işlemlerin sorumluluğu size aittir.
            </p>

            <h2 className="text-xl font-semibold text-foreground">4. Sorumluluk Reddi</h2>
            <p>
              emlakhesapla.com, sitemizin kullanımından doğabilecek doğrudan veya dolaylı hiçbir zarardan sorumlu değildir.
              Bu; kâr kaybı, veri kaybı, yanlış hesaplama sonucu veya üçüncü taraf hizmetlerden kaynaklanan zararları kapsar.
              Sitemizin kesintisiz veya hatasız çalışacağı garanti edilmez.
            </p>

            <h2 className="text-xl font-semibold text-foreground">5. Fikri Mülkiyet</h2>
            <p>
              Sitemizdeki tüm içerik, tasarım, logosu ve hesaplama araçları emlakhesapla.com&apos;a aittir ve telif hakkı ile
              korunur. İçeriğin izinsiz kopyalanması, dağıtılması veya kullanılması yasaktır. İçeriğin kişisel ve bilgilendirme
              amaçlı kullanımına izin verilir; ticari kullanım için yazılı izin gerekir.
            </p>

            <h2 className="text-xl font-semibold text-foreground">6. Üçüncü Taraf Bağlantıları</h2>
            <p>
              Sitemiz, üçüncü taraf web sitelerine (ör. Google, resmi kurumlar) bağlantılar içerebilir. Bu sitelerin içerik ve
              gizlilik uygulamalarından emlakhesapla.com sorumlu değildir. Bağlantı, bir onay anlamına gelmez.
            </p>

            <h2 className="text-xl font-semibold text-foreground">7. Reklamlar</h2>
            <p>
              Sitemiz, Google AdSense gibi üçüncü taraf reklam ağları aracılığıyla reklam gösterebilir. Reklam içerikleri
              reklamverenlere aittir ve emlakhesapla.com reklam içeriklerinden sorumlu değildir. Reklam gösterimiyle ilgili
              ayrıntılar için <Link href="/gizlilik-politikasi" className="link">Gizlilik Politikası</Link> sayfamıza bakınız.
            </p>

            <h2 className="text-xl font-semibold text-foreground">8. Değişiklikler</h2>
            <p>
              Bu kullanım şartlarını önceden bildirim yapmaksızın güncelleyebiliriz. Güncel sürüm her zaman bu sayfada yayımlıdır.
              Sitemizi kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.
            </p>

            <h2 className="text-xl font-semibold text-foreground">9. Yürürlük ve Yer</h2>
            <p>
              Bu şartlar Türkiye Cumhuriyeti hukukuna tabidir ve uyuşmazlıklarda Türkiye mahkemeleri yetkilidir.
            </p>

            <h2 className="text-xl font-semibold text-foreground">10. İletişim</h2>
            <p>
              Bu şartlarla ilgili sorularınız için: <a href="mailto:info@emlakhesapla.com" className="link">info@emlakhesapla.com</a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}