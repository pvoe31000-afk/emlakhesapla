import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "emlakhesapla.com gizlilik politikası. Kişisel verilerinizi nasıl işlediğimiz ve koruduğumuz hakkında bilgi.",
};

export default function GizlilikPolitikasi() {
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
              <span className="text-foreground font-medium">Gizlilik Politikası</span>
            </nav>
            <h1 id="heading" className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Gizlilik Politikası</h1>
            <p className="mt-3 text-muted-foreground">Bu belge düzenli olarak güncellenmektedir.</p>
          </header>

          <article className="prose prose-stone max-w-none text-muted-foreground space-y-6">
            <h2 className="text-xl font-semibold text-foreground">1. Genel Bakış</h2>
            <p>
              emlakhesapla.com (&quot;biz&quot; veya &quot;sitemiz&quot;), kullanıcılarına ücretsiz emlak hesaplama araçları sunar. Gizliliğinize
              saygı duyar ve kişisel verilerinizi korumak için gayret gösteririz. Bu politika, sitemizi kullanımınız sırasında
              hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar.
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Toplanan Bilgiler</h2>
            <h3 className="text-lg font-semibold text-foreground">Hesaplama Verileri</h3>
            <p>
              Hesaplama araçlarımıza girdiğiniz tüm veriler (satış bedeli, kira tutarı, tarihler vb.) <strong>yalnızca
              tarayıcınızda</strong> (client-side) işlenir ve hesaplanır. Bu veriler sunucularımıza gönderilmez, saklanmaz
              ve kaydedilmez. Sayfayı yenilediğinizde veya kapattığınızda verileriniz kaybolur.
            </p>
            <h3 className="text-lg font-semibold text-foreground">Otomatik Toplanan Bilgiler</h3>
            <p>
              Diğer web sitelerinde olduğu gibi, sunucu günlükleri ve analitik araçlar aracılığıyla bazı teknik bilgiler
              toplanabilir: IP adresi, tarayıcı türü, cihaz bilgileri, ziyaret edilen sayfalar ve ziyaret saatleri. Bu
              bilgiler istatistiksel amaçlarla ve sitenin kullanımını anlamak için kullanılır; sizi kişisel olarak
              tanımlamak için kullanılmaz.
            </p>

            <h2 className="text-xl font-semibold text-foreground">3. Çerezler (Cookies) ve Reklamcılık</h2>
            <p>
              Sitemiz, temel işlevselliği ve kullanıcı deneyimini iyileştirmek için çerezler kullanabilir. Ayrıca Google
              AdSense gibi üçüncü taraf reklam sağlayıcıları, reklamların ilginizi çekebilecek şekilde gösterilmesi için
              çerezler kullanabilir.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Google AdSense:</strong> Reklam gösterimi için Google tarafından çerez kullanılabilir. Google&apos;un
              reklam çerezleri hakkında bilgi için <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="link">Google Reklam Çerezleri</a> sayfasına bakabilirsiniz.</li>
              <li>Google&apos;ın kişiselleştirilmiş reklam ayarlarını <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="link">Ads Settings</a> üzerinden yönetebilirsiniz.</li>
              <li>Tarayıcı ayarlarından çerezleri devre dışı bırakabilirsiniz; ancak bazı özellikler düzgün çalışmayabilir.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Bilgilerin Kullanımı</h2>
            <p>Toplanan bilgiler şu amaçlarla kullanılır:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Sitenin teknik bakımı ve güvenliğinin sağlanması</li>
              <li>Kullanım istatistiklerinin oluşturulması ve içeriğin iyileştirilmesi</li>
              <li>Reklam sunumu (üçüncü taraf reklam sağlayıcıları aracılığıyla)</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">5. Üçüncü Taraf Hizmet Sağlayıcıları</h2>
            <p>
              Sitemiz, aşağıdaki üçüncü taraf hizmetleri kullanabilir. Bu hizmet sağlayıcıların kendi gizlilik politikaları
              sizin verilerinizle ilgili sorumluluklarını belirler.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Google AdSense</strong> - reklam gösterimi</li>
              <li><strong>Analitik araçlar</strong> - kullanım istatistikleri</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">6. Veri Güvenliği</h2>
            <p>
              Hesaplama verileriniz sunucularımıza iletilmediği için, bu verilerin güvenlik riski yoktur. Sitenin kendisi
              HTTPS üzerinden güvenli bağlantı ile sunulur. Teknik bilgiler (IP, cihaz vb.) üçüncü taraflarca mevcut güvenlik
              standartlarına göre korunur.
            </p>

            <h2 className="text-xl font-semibold text-foreground">7. Haklarınız</h2>
            <p>
              6698 sayılı KVKK kapsamında, kişisel verilerinizle ilgili olarak bilgi talep etme, düzeltme, silme ve itiraz
              haklarına sahipsiniz. Talepleriniz için <Link href="/iletisim" className="link">İletişim</Link> sayfamızdan
              bize ulaşabilirsiniz.
            </p>

            <h2 className="text-xl font-semibold text-foreground">8. Bu Politikada Değişiklikler</h2>
            <p>
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada yayımlandığı anda yürürlüğe
              girer. Önemli değişikliklerde sitemizde duyuru yapılacaktır.
            </p>

            <h2 className="text-xl font-semibold text-foreground">9. İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için: <a href="mailto:info@emlakhesapla.com" className="link">info@emlakhesapla.com</a>
            </p>
          </article>
        </div>
      </section>
    </>
  );
}