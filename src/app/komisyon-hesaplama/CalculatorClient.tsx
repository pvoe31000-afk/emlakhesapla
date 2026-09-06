"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

const KOMISYON_ORANI_SATIS = 0.02;
const KOMISYON_ORANI_KIRA = 1;
const KDV_ORANI = 0.2;

function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function KomisyonClient() {
  const [islemTuru, setIslemTuru] = useState<"satis" | "kira">("satis");
  const [bedel, setBedel] = useState("");
  const [kdvDahil, setKdvDahil] = useState(false);
  const [sonuc, setSonuc] = useState<{
    komisyonTutar: number;
    kdvTutar: number;
    toplamOdeme: number;
    kdvDahilMi: boolean;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tutar = parseFloat(bedel.replace(/[.,]/g, "").replace(",", ".")) || 0;
    if (tutar <= 0) return;

    let komisyonTutar: number;
    if (islemTuru === "satis") {
      komisyonTutar = tutar * KOMISYON_ORANI_SATIS;
    } else {
      komisyonTutar = tutar * KOMISYON_ORANI_KIRA;
    }

    if (kdvDahil) {
      const kdvHaric = komisyonTutar / (1 + KDV_ORANI);
      const kdvTutar = komisyonTutar - kdvHaric;
      setSonuc({
        komisyonTutar: kdvHaric,
        kdvTutar,
        toplamOdeme: komisyonTutar,
        kdvDahilMi: true,
      });
    } else {
      const kdvTutar = komisyonTutar * KDV_ORANI;
      setSonuc({
        komisyonTutar,
        kdvTutar,
        toplamOdeme: komisyonTutar + kdvTutar,
        kdvDahilMi: false,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBedel(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">İşlem türünü seçin, bedeli girin, KDV tercihinizi belirleyin.</p>
        </div>

        <div className="space-y-6">
          <fieldset>
            <legend className="form-label">İşlem Türü</legend>
            <div className="flex gap-4" role="radiogroup" aria-label="İşlem türü seçimi">
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                islemTuru === "satis" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="islem-turu"
                  value="satis"
                  checked={islemTuru === "satis"}
                  onChange={() => { setIslemTuru("satis"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={islemTuru === "satis" ? "text-primary" : "text-muted-foreground"} aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="font-medium">Satış</span>
                <span className="text-sm text-muted-foreground ml-auto">%2 + KDV</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                islemTuru === "kira" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="islem-turu"
                  value="kira"
                  checked={islemTuru === "kira"}
                  onChange={() => { setIslemTuru("kira"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={islemTuru === "kira" ? "text-primary" : "text-muted-foreground"} aria-hidden="true">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                  <path d="M3 5v14a2 2 0 0 0 2 2h14v-4" />
                </svg>
                <span className="font-medium">Kiralama</span>
                <span className="text-sm text-muted-foreground ml-auto">1 Ay + KDV</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="bedel" className="form-label">
              {islemTuru === "satis" ? "Satış Bedeli (TL)" : "Aylık Kira Bedeli (TL)"} <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="bedel"
                name="bedel"
                value={bedel}
                onChange={handleInputChange}
                placeholder={islemTuru === "satis" ? "Örn: 1.500.000" : "Örn: 15.000"}
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
                aria-describedby="bedel-hint"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p id="bedel-hint" className="form-hint">
              {islemTuru === "satis"
                ? "Gayrimenkul satış bedeli. Her iki taraf (alıcı/satıcı) için ayrı hesaplanır."
                : "Aylık kira bedeli. Komisyon en fazla 1 ay kira bedeli + KDV kadardır; piyasa uygulamasında bu bedeli genellikle kiracı öder."}
            </p>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={kdvDahil}
                onChange={(e) => { setKdvDahil(e.target.checked); if (sonuc) setSonuc(null); }}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-2"
              />
              <span className="font-medium text-foreground">Girdiğim tutar KDV dahildir (KDV&apos;yi ayır)</span>
            </label>
            <p className="form-hint mt-1">
              İşaretlerseniz: Girilen tutar KDV dahil komisyon kabul edilir, KDV ayrılır.
              İşaretlemezseniz: Girilen tutar KDV hariç komisyon kabul edilir, KDV eklenir.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!bedel || parseFloat(bedel.replace(/[.,]/g, "")) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              {islemTuru === "satis" ? "Satış komisyonu (her taraf için)" : "Kiralama komisyonu (kiracı tarafından ödenir)"}
              {sonuc.kdvDahilMi ? " — Girilen tutar KDV dahildi, KDV ayrıldı." : " — Girilen tutar KDV hariçti, KDV eklendi."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">{islemTuru === "satis" ? "Komisyon (KDV Hariç)" : "Kiracının Komisyonu (KDV Hariç)"}</div>
                <div className="result-value font-mono">{formatTRY(sonuc.komisyonTutar)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">KDV (%20)</div>
                <div className="result-value font-mono">{formatTRY(sonuc.kdvTutar)}</div>
              </div>
              <div className="p-4 bg-surface-alt rounded-lg border border-border text-center">
                <div className="result-label">{islemTuru === "satis" ? "Toplam Ödenecek" : "Kiracının Ödeyeceği Toplam"}</div>
                <div className="result-value font-mono">{formatTRY(sonuc.toplamOdeme)}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">{islemTuru === "satis" ? "Satış Bedeli" : "Aylık Kira Bedeli"}</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseFloat(bedel.replace(/[.,]/g, "")))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Komisyon Oranı</span>
                <span className="result-breakdown-value">{islemTuru === "satis" ? "%2" : "1 Ay Kira"}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">{islemTuru === "satis" ? "Komisyon Tutarı (KDV Hariç)" : "Kiracının Komisyonu (KDV Hariç)"}</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.komisyonTutar)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">KDV (%20)</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.kdvTutar)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">{islemTuru === "satis" ? "Toplam Ödenecek" : "Kiracının Ödeyeceği Toplam"}</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.toplamOdeme)}</span>
              </div>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
              {islemTuru === "satis" ? (
                <p>
                  <strong>Not:</strong> Bu tutar her taraf (alıcı/satıcı) için ayrı ayrı geçerlidir.
                  Alıcı ve satıcı da ödeme yaparsa toplam komisyon bu tutarın 2 katıdır.
                </p>
              ) : (
                <p>
                  <strong>Not:</strong> Varsayılan sonuç piyasa uygulamasını yansıtır: kiralama komisyonunu (en fazla
                  1 aylık kira + KDV) genellikle kiracı öder. Yönetmeliğe göre bu bedel aksi kararlaştırılmadıkça ev sahibi
                  ve kiracı arasında eşit paylaştırılır; kesin uygulama sözleşmenizde belirlenir.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}