"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

const VERGI_DILIMLERI = [
  { ustLimit: 360000, oran: 0.15 },
  { ustLimit: 800000, oran: 0.20 },
  { ustLimit: 1600000, oran: 0.27 },
  { ustLimit: 3000000, oran: 0.30 },
  { ustLimit: Infinity, oran: 0.40 },
];

const KIRA_ISTISNA_TUTARI = 33000;

function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR").format(Math.round(value));
}

function hesaplaVergi(matrah: number): number {
  if (matrah <= 0) return 0;
  let vergi = 0;
  let oncekiUst = 0;
  for (const dilim of VERGI_DILIMLERI) {
    const kademe = Math.min(matrah, dilim.ustLimit) - oncekiUst;
    if (kademe > 0) {
      vergi += kademe * dilim.oran;
    } else {
      break;
    }
    oncekiUst = dilim.ustLimit;
  }
  return vergi;
}

export default function KiraStopajiClient() {
  const [kiraTuru, setKiraTuru] = useState<"konut" | "isyeri">("konut");
  const [aylikKira, setAylikKira] = useState("");
  const [baskaGelir, setBaskaGelir] = useState("");
  const [sonuc, setSonuc] = useState<{
    yillikKira: number;
    brutKira: number;
    stopajYillik: number;
    istisna: number;
    matrah: number;
    vergi: number;
    odenmesiGereken: number;
    konutMu: boolean;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const kira = parseFloat(aylikKira.replace(/[.,]/g, "").replace(",", ".")) || 0;
    const diger = parseFloat(baskaGelir.replace(/[.,]/g, "").replace(",", ".")) || 0;
    if (kira <= 0) return;

    const yillikKira = kira * 12;
    let brutKira: number;
    let stopajYillik = 0;

    if (kiraTuru === "isyeri") {
      const net = yillikKira;
      brutKira = net / 0.8;
      stopajYillik = brutKira - net;
    } else {
      brutKira = yillikKira;
    }

    const istisna = kiraTuru === "konut" ? Math.min(brutKira, KIRA_ISTISNA_TUTARI) : 0;
    const matrah = Math.max(0, brutKira - istisna + diger);
    const vergi = hesaplaVergi(matrah);
    const odenmesiGereken = Math.max(0, vergi - stopajYillik);

    setSonuc({
      yillikKira,
      brutKira,
      stopajYillik,
      istisna,
      matrah,
      vergi,
      odenmesiGereken,
      konutMu: kiraTuru === "konut",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "aylik-kira") setAylikKira(formatThousandsInput(e.target.value));
    if (e.target.name === "baska-gelir") setBaskaGelir(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Kira türünü ve aylık tutarı girerek hesaplamayı başlatın.</p>
        </div>

        <div className="space-y-6">
          <fieldset>
            <legend className="form-label">Kira Türü</legend>
            <div className="flex gap-4" role="radiogroup" aria-label="Kira türü seçimi">
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                kiraTuru === "konut" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="kira-turu"
                  value="konut"
                  checked={kiraTuru === "konut"}
                  onChange={() => { setKiraTuru("konut"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <span className="font-medium">Konut</span>
                <span className="text-sm text-muted-foreground ml-auto">Stopaj yok, istisna var</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                kiraTuru === "isyeri" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="kira-turu"
                  value="isyeri"
                  checked={kiraTuru === "isyeri"}
                  onChange={() => { setKiraTuru("isyeri"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <span className="font-medium">İşyeri</span>
                <span className="text-sm text-muted-foreground ml-auto">%20 stopaj</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="aylik-kira" className="form-label">
              Aylık Kira (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="aylik-kira"
                name="aylik-kira"
                value={aylikKira}
                onChange={handleInputChange}
                placeholder="Örn: 20.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">
              {kiraTuru === "isyeri"
                ? "Kiracının size ödediği net (stopaj kesilmeden önceki) miktarı girin."
                : "Aylık konut kira bedelini girin."}
            </p>
          </div>

          <div>
            <label htmlFor="baska-gelir" className="form-label">
              Diğer Beyan Edilecek Gelir (TL/yıl) (opsiyonel)
            </label>
            <div className="relative">
              <input
                type="text"
                id="baska-gelir"
                name="baska-gelir"
                value={baskaGelir}
                onChange={handleInputChange}
                placeholder="Örn: 0"
                className="form-input font-mono pr-10"
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Ücret, faiz veya diğer vergiye tabi gelirleriniz (matrahı etkiler).</p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!aylikKira || parseFloat(aylikKira.replace(/[.,]/g, "")) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              {sonuc.konutMu
                ? "Konut kira geliri - istisna ve gelir vergisi hesaplandı."
                : "İşyeri kira geliri - %20 stopaj ve gelir vergisi hesaplandı."}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-surface-alt rounded-lg border border-border text-center">
                <div className="result-label">
                  {sonuc.konutMu ? "Ödenecek Gelir Vergisi" : "Beyan Sonrası Ödenecek Vergi (stopaj dahil)"}
                </div>
                <div className="result-value">{formatTRY(sonuc.odenmesiGereken)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Yıllık Kira Geliri</div>
                <div className="result-value font-mono">{formatTRY(sonuc.yillikKira)}</div>
              </div>
            </div>

            {!sonuc.konutMu && (
              <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
                <strong>Bilgi:</strong> Bu hesaplamada {formatTRY(sonuc.stopajYillik)} tutarındaki %20 stopaj,
                kiracı tarafından kesilip devlete ödenecektir. Bu tutar, hesap sonucundaki vergiden <strong>mahsup edilmiştir</strong>.
              </div>
            )}

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Aylık Kira</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseFloat(aylikKira.replace(/[.,]/g, "")))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Yıllık Kira Geliri</span>
                <span className="result-breakdown-value font-mono">{formatTRY(sonuc.yillikKira)}</span>
              </div>
              {!sonuc.konutMu && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">Stopaj (yıllık, %20)</span>
                  <span className="result-breakdown-value">{formatTRY(sonuc.stopajYillik)}</span>
                </div>
              )}
              {sonuc.konutMu && sonuc.istisna > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">İstisna ({formatNumber(KIRA_ISTISNA_TUTARI)} TL)</span>
                  <span className="result-breakdown-value">- {formatTRY(sonuc.istisna)}</span>
                </div>
              )}
              {baskaGelir && parseFloat(baskaGelir.replace(/[.,]/g, "")) > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">Diğer Gelir</span>
                  <span className="result-breakdown-value font-mono">+ {formatTRY(parseFloat(baskaGelir.replace(/[.,]/g, "")))}</span>
                </div>
              )}
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Vergi Matrahı</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.matrah)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Hesaplanan Vergi</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.vergi)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}