"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

const ORNEK_TUFE_12_AYLIK = 43.64;

function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + "%";
}

export default function KiraArtisClient() {
  const [mevcutKira, setMevcutKira] = useState("");
  const [tuferOran, setTuferOran] = useState(String(ORNEK_TUFE_12_AYLIK));
  const [sonuc, setSonuc] = useState<{
    yeniKira: number;
    artisTutar: number;
    artisOran: number;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const kira = parseFloat(mevcutKira.replace(/[.,]/g, "").replace(",", ".")) || 0;
    const oran = parseFloat(tuferOran.replace(",", ".")) / 100 || 0;
    if (kira <= 0 || oran <= 0) return;

    const artisTutar = kira * oran;
    setSonuc({
      yeniKira: kira + artisTutar,
      artisTutar,
      artisOran: oran * 100,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMevcutKira(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Mevcut kira tutarını ve uygulanacak artış oranını girin.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="mevcut-kira" className="form-label">
              Mevcut Aylık Kira (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="mevcut-kira"
                name="mevcut-kira"
                value={mevcutKira}
                onChange={handleInputChange}
                placeholder="Örn: 15.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
                aria-describedby="kira-hint"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p id="kira-hint" className="form-hint">Sözleşmenizde yazan aylık kira bedelini girin (artış öncesi).</p>
          </div>

          <div>
            <label htmlFor="artis-orani" className="form-label">
              Artış Oranı (%) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="artis-orani"
                name="artis-orani"
                value={tuferOran}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.,]/g, "");
                  setTuferOran(value);
                  if (sonuc) setSonuc(null);
                }}
                className="form-input font-mono text-lg pr-10"
                inputMode="decimal"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">%</span>
            </div>
            <p className="form-hint">
              Resmi artış oranı (TÜFE 12 aylık ortalama) otomatik olarak{" "}
              <strong>{formatPercent(ORNEK_TUFE_12_AYLIK)}</strong> ayarlanmıştır. Güncel TÜİK verisini girebilirsiniz.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!mevcutKira || !tuferOran || parseFloat(mevcutKira.replace(/[.,]/g, "")) <= 0 || parseFloat(tuferOran.replace(",", ".")) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">{formatPercent(sonuc.artisOran)} artış oranı ile hesaplanan yeni kira tutarı.</p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-surface-alt rounded-lg border border-border">
              <div className="result-label">Yeni Aylık Kira (Artış Sonrası)</div>
              <div className="result-value">{formatTRY(sonuc.yeniKira)}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="result-label">Artış Tutarı</div>
                <div className="result-value font-mono">+ {formatTRY(sonuc.artisTutar)}</div>
                <p className="mt-1 text-sm text-muted-foreground">{formatPercent(sonuc.artisOran)} oranında</p>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border">
                <div className="result-label">Mevcut Kira</div>
                <div className="result-value font-mono">{formatTRY(parseFloat(mevcutKira.replace(/[.,]/g, "")))}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Mevcut Kira</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseFloat(mevcutKira.replace(/[.,]/g, "")))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Artış Oranı</span>
                <span className="result-breakdown-value">{formatPercent(sonuc.artisOran)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Artış Tutarı</span>
                <span className="result-breakdown-value">+ {formatTRY(sonuc.artisTutar)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Yeni Kira</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.yeniKira)}</span>
              </div>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
              <strong>Not:</strong> Bu hesaplama konut kiralamalarında azami oranı (TÜFE 12 aylık ortalama) baz alır.
              Kiracı ve ev sahibi bu oranın <strong>altında</strong> anlaşabilir; ancak üzerinde bir artış yapılamaz.
            </div>
          </div>
        </div>
      )}
    </>
  );
}