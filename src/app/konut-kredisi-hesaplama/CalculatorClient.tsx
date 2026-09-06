"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput, parseAmountInput, parsePercentageInput, formatTRY, formatNumber } from "../../lib/format";

function formatPercent(value: number, decimals = 2): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + "%";
}

export default function KonutKredisiClient() {
  const [krediTutar, setKrediTutar] = useState("");
  const [faizOran, setFaizOran] = useState("");
  const [faizTuru, setFaizTuru] = useState<"yillik" | "aylik">("yillik");
  const [vadeAy, setVadeAy] = useState("");
  const [sonuc, setSonuc] = useState<{
    taksit: number;
    aylikFaizYuzde: number;
    toplamGeriOdeme: number;
    toplamFaiz: number;
    vade: number;
  } | null>(null);
  const [hata, setHata] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHata("");

    const P = parseAmountInput(krediTutar);
    const faiz = parsePercentageInput(faizOran);
    const n = parseInt(vadeAy);

    if (P <= 0 || faiz <= 0 || !n || n <= 0) {
      setHata("Lütfen kredi tutarı, faiz oranı ve vade bilgilerini girin.");
      return;
    }
    if (n > 600) {
      setHata("Vade 600 ay (50 yıl) üzerinde olamaz.");
      return;
    }

    const aylikFaizYuzde = faizTuru === "yillik" ? faiz / 12 : faiz;
    const r = aylikFaizYuzde / 100;

    const taksit = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const toplamGeriOdeme = taksit * n;
    const toplamFaiz = toplamGeriOdeme - P;

    setSonuc({
      taksit,
      aylikFaizYuzde,
      toplamGeriOdeme,
      toplamFaiz,
      vade: n,
    });
  };

  const handleVadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVadeAy(e.target.value.replace(/[^\d]/g, "").slice(0, 3));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Kredi tutarı, faiz oranı ve vade bilgilerinizi girin, anlık taksit hesabı yapın.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="kredi-tutar" className="form-label">
              Kredi Tutarı (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="kredi-tutar"
                name="kredi-tutar"
                value={krediTutar}
                onChange={(e) => { setKrediTutar(formatThousandsInput(e.target.value)); if (sonuc) setSonuc(null); }}
                placeholder="Örn: 1.500.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Bankadan çekmeyi planladığınız anapara tutarı.</p>
          </div>

          <div>
            <label htmlFor="faiz-oran" className="form-label">
              Faiz Oranı (%) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="faiz-oran"
                  name="faiz-oran"
                  value={faizOran}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^\d.,]/g, "");
                    const parts = value.split(",");
                    if (parts.length > 2) value = parts[0] + "," + parts.slice(1).join("");
                    setFaizOran(value);
                    if (sonuc) setSonuc(null);
                  }}
                  placeholder="Örn: 2,79 veya 0,50"
                  className="form-input font-mono text-lg pr-10"
                  inputMode="decimal"
                  autoComplete="off"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">%</span>
              </div>
              <div className="flex items-center gap-2" role="radiogroup" aria-label="Faiz oranı türü">
                <button
                  type="button"
                  onClick={() => { setFaizTuru("yillik"); if (sonuc) setSonuc(null); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                    faizTuru === "yillik" ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-secondary/50"
                  }`}
                  aria-pressed={faizTuru === "yillik"}
                >
                  Yıllık
                </button>
                <button
                  type="button"
                  onClick={() => { setFaizTuru("aylik"); if (sonuc) setSonuc(null); }}
                  className={`px-3 py-2 rounded-md text-sm font-medium border transition-colors ${
                    faizTuru === "aylik" ? "border-accent bg-accent text-accent-foreground" : "border-border hover:border-secondary/50"
                  }`}
                  aria-pressed={faizTuru === "aylik"}
                >
                  Aylık
                </button>
              </div>
            </div>
            <p className="form-hint">
              {faizTuru === "yillik"
                ? "Yıllık faiz oranını girin; aylık oran otomatik olarak 12&apos;ye bölünür."
                : "Aylık faiz oranını girin; taksit hesabı doğrudan bu oranla yapılır."}
            </p>
          </div>

          <div>
            <label htmlFor="vade-ay" className="form-label">
              Vade (Ay) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="vade-ay"
                name="vade-ay"
                value={vadeAy}
                onChange={handleVadeChange}
                placeholder="Örn: 120"
                className="form-input font-mono text-lg pr-14"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">ay</span>
            </div>
            <p className="form-hint">Örn: 120 ay (10 yıl), 240 ay (20 yıl). Uzun vade taksidi düşürür ama toplam faizi artırır.</p>
          </div>

          {hata && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive" role="alert">
              {hata}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={!krediTutar || !faizOran || !vadeAy}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              {sonuc.vade} ay vade ve aylık {formatPercent(sonuc.aylikFaizYuzde, 4)} faiz ile anüite (eşit taksit) yöntemine göre hesaplandı.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-surface-alt rounded-lg border border-border">
              <div className="result-label">Aylık Taksit</div>
              <div className="result-value">{formatTRY(sonuc.taksit)}</div>
              <div className="mt-1 text-sm text-muted-foreground">Toplam {formatNumber(sonuc.vade)} taksit</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Toplam Geri Ödeme</div>
                <div className="result-value font-mono">{formatTRY(sonuc.toplamGeriOdeme)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Toplam Faiz Maliyeti</div>
                <div className="result-value font-mono">{formatTRY(sonuc.toplamFaiz)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Kredi Anaparası</div>
                <div className="result-value font-mono">{formatTRY(parseAmountInput(krediTutar))}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Kredi Tutarı</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseAmountInput(krediTutar))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Faiz Türü</span>
                <span className="result-breakdown-value">{faizTuru === "yillik" ? "Yıllık" : "Aylık"}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Aylık Faiz Oranı</span>
                <span className="result-breakdown-value">{formatPercent(sonuc.aylikFaizYuzde, 4)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Vade</span>
                <span className="result-breakdown-value">{formatNumber(sonuc.vade)} ay ({formatNumber(sonuc.vade / 12)} yıl)</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Aylık Taksit</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.taksit)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Toplam Faiz</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.toplamFaiz)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Toplam Geri Ödeme</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.toplamGeriOdeme)}</span>
              </div>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
              <strong>Not:</strong> Bu hesap yalnızca anapara ve faizi içerir. Dosya masrafı, ekspertiz ücreti, zorunlu sigorta
              ve diğer banka komisyonları toplam maliyete eklenir.
            </div>
          </div>
        </div>
      )}
    </>
  );
}