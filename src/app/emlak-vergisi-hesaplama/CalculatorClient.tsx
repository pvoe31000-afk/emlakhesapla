"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

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

export default function EmlakVergisiClient() {
  const [rayicBedel, setRayicBedel] = useState("");
  const [kullanimTuru, setKullanimTuru] = useState<"konut" | "isyeri" | "arsa" | "arazi">("konut");
  const [buyuksehir, setBuyuksehir] = useState(false);
  const [sonuc, setSonuc] = useState<{
    yillik: number;
    taksitIki: number;
    oran: number;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bedel = parseFloat(rayicBedel.replace(/[.,]/g, "").replace(",", ".")) || 0;
    if (bedel <= 0) return;

    let oran: number;
    switch (kullanimTuru) {
      case "konut":
        oran = 0.001;
        break;
      case "isyeri":
        oran = 0.002;
        break;
      case "arsa":
        oran = 0.003;
        break;
      case "arazi":
        oran = 0.001;
        break;
      default:
        oran = 0.001;
    }

    if (buyuksehir) {
      oran *= 2;
    }

    const yillik = bedel * oran;
    setSonuc({
      yillik,
      taksitIki: yillik / 2,
      oran,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRayicBedel(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Gayrimenkulünüzün rayiç bedelini girin ve kullanım türünü seçin.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="rayic-bedel" className="form-label">
              Belediye Rayiç Bedeli (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="rayic-bedel"
                name="rayic-bedel"
                value={rayicBedel}
                onChange={handleInputChange}
                placeholder="Örn: 1.200.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
                aria-describedby="rayic-hint"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p id="rayic-hint" className="form-hint">
              Rayiç bedeli emlak vergisi beyannamesinde veya belediye web sitesinden sorgulayarak öğrenebilirsiniz.
            </p>
          </div>

          <fieldset>
            <legend className="form-label">Kullanım Türü</legend>
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Kullanım türü seçimi">
              {[
                { value: "konut", label: "Konut (Mesken)", oran: "%0,1" },
                { value: "isyeri", label: "İşyeri", oran: "%0,2" },
                { value: "arsa", label: "Arsa (İmarlı)", oran: "%0,3" },
                { value: "arazi", label: "Arazi (Tarla)", oran: "%0,1" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    kullanimTuru === opt.value
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-secondary/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="kullanim-turu"
                    value={opt.value}
                    checked={kullanimTuru === opt.value}
                    onChange={() => { setKullanimTuru(opt.value as typeof kullanimTuru); if (sonuc) setSonuc(null); }}
                    className="sr-only"
                  />
                  <span className="font-medium text-foreground text-sm">{opt.label}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{opt.oran}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={buyuksehir}
                onChange={(e) => { setBuyuksehir(e.target.checked); if (sonuc) setSonuc(null); }}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent focus:ring-2"
              />
              <span className="font-medium text-foreground">Gayrimenkul büyükşehir belediye sınırları içinde (oran %100 artırılır)</span>
            </label>
            <p className="form-hint mt-1">
              6360 sayılı Kanun gereği büyükşehir olan illerin tamamında oranlar 2 katı uygulanır.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!rayicBedel || parseFloat(rayicBedel.replace(/[.,]/g, "")) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              Uygulanan oran: <strong>{formatNumber(sonuc.oran * 1000)}‰</strong>{" "}
              ({buyuksehir ? "büyükşehir farkı ile 2 katı" : "normal oran"})
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-surface-alt rounded-lg border border-border">
              <div className="result-label">Yıllık Emlak Vergisi</div>
              <div className="result-value">{formatTRY(sonuc.yillik)}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="result-label">1. Taksit (Mart)</div>
                <div className="result-value font-mono">{formatTRY(sonuc.taksitIki)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="result-label">2. Taksit (Kasım)</div>
                <div className="result-value font-mono">{formatTRY(sonuc.taksitIki)}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Rayiç Bedel</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseFloat(rayicBedel.replace(/[.,]/g, "")))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Kullanım Türü</span>
                <span className="result-breakdown-value">
                  {kullanimTuru === "konut" ? "Konut" : kullanimTuru === "isyeri" ? "İşyeri" : kullanimTuru === "arsa" ? "Arsa" : "Arazi"}
                </span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Uygulanan Oran</span>
                <span className="result-breakdown-value">{formatNumber(sonuc.oran * 1000)}‰</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Yıllık Vergi</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.yillik)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}