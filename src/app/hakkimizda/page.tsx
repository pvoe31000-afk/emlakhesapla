import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "emlakhesapla.com - Güvenilir, hızlı ve ücretsiz emlak hesaplama araçları sunan platform. Misyonumuz, emlak profesyonellerine ve bireysel kullanıcılara doğru hesaplama verileri sunmaktır.",
};

export default function Hakkimizda() {
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
              <span className="text-foreground font-medium">Hakkımızda</span>
            </nav>
            <h1 id="heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Hakkımızda</h1>
          </header>

          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Misyonumuz</h2>
            <p>
              emlakhesapla.com, emlak alım satım ve kiralama süreçlerinde en çok ihtiyaç duyulan hesaplamaları,
              doğru ve güncel mevzuata dayandırarak herkes için erişilebilir kılan bir platformdur. Tapu harcından
              değer artış kazancı vergisine, komisyondan kira stopajına kadar tüm hesaplama araçlarımız ücretsizdir
              ve hiçbir kayıt gerektirmez.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Neden Biz?</h2>
            <p>
              Emlak hesaplamaları çoğu zaman kafa karıştırıcı olabilir. Oranlar yıllara göre değişir, istisnalar farklılık
              gösterir, endeksleme kuralları karmaşıktır. Biz, bu karmaşıklığı sade ve anlaşılır bir arayüze indirgeyerek
              kullanıcılarımıza güvenilir sonuçlar sunmayı amaçladık. Tüm hesaplamalar <strong>tarayıcınızda (client-side)</strong>
              yapılır; verileriniz hiçbir sunucuya gönderilmez ve kaydedilmez.
            </p>

            <h2 className="text-xl font-semibold text-foreground">Değerlerimiz</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Şeffaflık:</strong> Kullandığımız oranları ve formülleri her sayfada açıkça belirtiyoruz.</li>
              <li><strong>Güncellik:</strong> Resmi gazete ve resmi kurum verilerini takip ederek hesaplamaları güncel tutuyoruz.</li>
              <li><strong>Gizlilik:</strong> Hiçbir kişisel veriye ihtiyaç duymuyoruz; tüm işlemleriniz cihazınızda kalır.</li>
              <li><strong>Erişilebilirlik:</strong> Ücretsiz, kayıtsız ve mobil uyumlu hizmet sunuyoruz.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">Vergi ve Hesaplama Sorumluluğu</h2>
            <p>
              Sitemizdeki tüm hesaplamalar <strong>bilgilendirme amaçlıdır</strong> ve yasal danışmanlık yerine geçmez.
              Vergi oranları, istisna tutarları ve endeks katsayıları yıllara göre değişebilir. Resmi işlemlerinizde mutlaka
              ilgili kamu kuruluşlarına, notere, bankaya veya mali müşavirinize danışmanızı öneririz. Detaylar için
              <Link href="/kullanim-sartlari" className="link"> Kullanım Şartları</Link> sayfamızı inceleyebilirsiniz.
            </p>

            <h2 className="text-xl font-semibold text-foreground">İletişim</h2>
            <p>
              Öneri, soru veya geri bildirimleriniz için <Link href="/iletisim" className="link">İletişim</Link> sayfamızdan
              bize ulaşabilirsiniz. Her türlü görüşünüzü memnuniyetle karşılıyoruz.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}