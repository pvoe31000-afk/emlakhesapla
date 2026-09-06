export type CalculatorCategoryId = "vergi" | "alis-satis" | "kiralama";

export interface CalculatorCategory {
  id: CalculatorCategoryId;
  title: string;
  description: string;
}

export interface CalculatorLink {
  slug: string;
  name: string;
  shortDesc: string;
  icon: string;
  category: CalculatorCategoryId;
  popular: boolean;
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "vergi",
    title: "Vergi & Harç Hesaplamaları",
    description: "Tapu harcı, emlak vergisi ve kira stopajı gibi vergi yükümlülüklerinizi mevzuata uygun şekilde hesaplayın.",
  },
  {
    id: "alis-satis",
    title: "Alım-Satım Hesaplamaları",
    description: "Alım-satım sürecinin tüm maliyetlerini ve kredi taksitlerinizi kolayca görün.",
  },
  {
    id: "kiralama",
    title: "Kiralama Hesaplamaları",
    description: "Kira artış oranınızı ve kira yatırımınızın getirisini hesaplayın.",
  },
];

export const calculators: CalculatorLink[] = [
  {
    slug: "tapu-harci-hesaplama",
    name: "Tapu Harcı Hesaplama",
    shortDesc: "Satış bedeli üzerinden %4 oranında tapu harcı tutarını hesaplayın. Alıcı ve satıcı paylarını ayrı ayrı veya toplam olarak görün.",
    icon: "home",
    category: "vergi",
    popular: true,
  },
  {
    slug: "emlak-vergisi-hesaplama",
    name: "Emlak Vergisi Hesaplama",
    shortDesc: "Belediye rayiç bedeli üzerinden, konut ve işyeri ayrımı yaparak yıllık emlak vergisi tutarını öğrenin.",
    icon: "building",
    category: "vergi",
    popular: false,
  },
  {
    slug: "deger-artisi-kazanci-hesaplama",
    name: "Değer Artış Kazancı Vergisi",
    shortDesc: "Gayrimenkul satışında oluşacak değer artış kazancı vergisini, alım/satım tarihi ve enflasyon endeksleriyle hesaplayın.",
    icon: "trending-up",
    category: "vergi",
    popular: false,
  },
  {
    slug: "kira-stopaji-hesaplama",
    name: "Kira Stopajı Hesaplama",
    shortDesc: "Kira gelirinizden kesilecek stopaj (gelir vergisi) tutarını, yıllık kira gelirinize ve diğer gelirlerinize göre hesaplayın.",
    icon: "receipt",
    category: "vergi",
    popular: false,
  },
  {
    slug: "komisyon-hesaplama",
    name: "Emlakçı Komisyonu Hesaplama",
    shortDesc: "Satış ve kiralama işlemlerinde emlakçı komisyon tutarını KDV dahil/hariç seçenekli olarak hesaplayın.",
    icon: "handshake",
    category: "alis-satis",
    popular: true,
  },
  {
    slug: "toplam-satis-maliyeti-hesaplama",
    name: "Toplam Satış/Alım Maliyeti",
    shortDesc: "Satış bedeli üzerinden tapu harcı, emlakçı komisyonu (KDV dahil), sigorta ve diğer giderleri tek bir toplam maliyet özetinde görün.",
    icon: "calculator",
    category: "alis-satis",
    popular: false,
  },
  {
    slug: "konut-kredisi-hesaplama",
    name: "Konut Kredisi Taksit Hesaplama",
    shortDesc: "Kredi tutarı, faiz oranı ve vadeye göre aylık taksit, toplam geri ödeme ve toplam faiz maliyetini anüite formülüyle hesaplayın.",
    icon: "bank",
    category: "alis-satis",
    popular: false,
  },
  {
    slug: "kira-artis-hesaplama",
    name: "Kira Artış Oranı Hesaplama",
    shortDesc: "TÜFE 12 aylık ortalama baz alınarak, kira sözleşmenizdeki yeniden belirleme oranını hesaplayın.",
    icon: "calendar",
    category: "kiralama",
    popular: false,
  },
  {
    slug: "kira-getirisi-hesaplama",
    name: "Kira Getirisi (Amortisman)",
    shortDesc: "Gayrimenkul alış fiyatı ve kira gelirinize göre brüt/net yıllık getiriyi ve yatırımın kendini ödeme süresini hesaplayın.",
    icon: "percent",
    category: "kiralama",
    popular: false,
  },
];

export function calculatorsByCategory(categoryId: CalculatorCategoryId): CalculatorLink[] {
  return calculators.filter((c) => c.category === categoryId);
}