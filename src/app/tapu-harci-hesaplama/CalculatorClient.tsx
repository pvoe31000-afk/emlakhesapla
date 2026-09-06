"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

const TAPU_HARC_ORANI = 0.04;
const TAPU_HARC_ALICI_PAYI = 0.02;
const TAPU_HARC_SATICI_PAYI = 0.02;

function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TapuHarciClient() {
  const [satisBedeli, setSatisBedeli] = useState("");
  const [sonuc, setSonuc] = useState<{
    toplam: number;
    alici: number;
    satici: number;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bedel = parseFloat(satisBedeli.replace(/[.,]/g, "").replace(",", ".")) || 0;
    if (bedel > 0) {
      setSonuc({
        toplam: bedel * TAPU_HARC_ORANI,
        alici: bedel * TAPU_HARC_ALICI_PAYI,
        satici: bedel * TAPU_HARC_SATICI_PAYI,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSatisBedeli(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Satış bedelini TL cinsinden girin, sonuçlar anlık görünecektir.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="satis-bedeli" className="form-label">
              Satış Bedeli (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="satis-bedeli"
                name="satis-bedeli"
                value={satisBedeli}
                onChange={handleInputChange}
                placeholder="Örn: 1.500.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
                aria-describedby="satis-bedeli-hint"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p id="satis-bedeli-hint" className="form-hint">
              Belediye rayiç değerinden düşük olamaz. Rayiç değer daha yüksekse harç rayiç değer üzerinden hesaplanır.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!satisBedeli || parseFloat(satisBedeli.replace(/[.,]/g, "")) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">Güncel %4 tapu harcı oranına göre hesaplanan tutarlar.</p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-surface-alt rounded-lg border border-border">
              <div className="result-label">Toplam Tapu Harcı</div>
              <div className="result-value">{formatTRY(sonuc.toplam)}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-medium text-foreground">Alıcı Payı (%2)</span>
                </div>
                <div className="result-value text-secondary">{formatTRY(sonuc.alici)}</div>
              </div>

              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="font-medium text-foreground">Satıcı Payı (%2)</span>
                </div>
                <div className="result-value text-secondary">{formatTRY(sonuc.satici)}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Satış Bedeli</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseFloat(satisBedeli.replace(/[.,]/g, "")))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Tapu Harcı Oranı</span>
                <span className="result-breakdown-value">%4</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Toplam Tapu Harcı</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.toplam)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}