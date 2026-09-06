"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput, parseAmountInput, formatTRY } from "../../lib/format";

function formatPercent(value: number, decimals = 1): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + "%";
}

export default function KiraGetirisiClient() {
  const [alisFiyati, setAlisFiyati] = useState("");
  const [aylikKira, setAylikKira] = useState("");
  const [yillikGider, setYillikGider] = useState("");
  const [sonuc, setSonuc] = useState<{
    brutYillikKira: number;
    brutGetiri: number;
    netGelir: number;
    netGetiri: number;
    amortismanYil: number | null;
  } | null>(null);
  const [hata, setHata] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHata("");

    const alis = parseAmountInput(alisFiyati);
    const aylik = parseAmountInput(aylikKira);
    const gider = parseAmountInput(yillikGider);

    if (alis <= 0) {
      setHata("Lütfen gayrimenkul alış fiyatını girin.");
      return;
    }

    const brutYillikKira = aylik * 12;
    const brutGetiri = (brutYillikKira / alis) * 100;
    const netGelir = Math.max(0, brutYillikKira - gider);
    const netGetiri = (netGelir / alis) * 100;
    const amortismanYil = netGelir > 0 ? alis / netGelir : null;

    setSonuc({
      brutYillikKira,
      brutGetiri,
      netGelir,
      netGetiri,
      amortismanYil,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "alis-fiyati") setAlisFiyati(formatThousandsInput(e.target.value));
    if (e.target.name === "aylik-kira") setAylikKira(formatThousandsInput(e.target.value));
    if (e.target.name === "yillik-gider") setYillikGider(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Alış fiyatı, aylık kira ve yıllık giderlerle yatırım getirinizi hesaplayın.</p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="alis-fiyati" className="form-label">
              Gayrimenkul Alış Fiyatı (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="alis-fiyati"
                name="alis-fiyati"
                value={alisFiyati}
                onChange={handleInputChange}
                placeholder="Örn: 3.000.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Yatırım olarak aldığınız/yatırdığınız toplam tutar.</p>
          </div>

          <div>
            <label htmlFor="aylik-kira" className="form-label">
              Aylık Kira Geliri (TL) <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="aylik-kira"
                name="aylik-kira"
                value={aylikKira}
                onChange={handleInputChange}
                placeholder="Örn: 25.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Gayrimenkulden elde etmeyi beklediğiniz aylık kira bedeli.</p>
          </div>

          <div>
            <label htmlFor="yillik-gider" className="form-label">
              Yıllık Giderler (TL) (opsiyonel)
            </label>
            <div className="relative">
              <input
                type="text"
                id="yillik-gider"
                name="yillik-gider"
                value={yillikGider}
                onChange={handleInputChange}
                placeholder="Örn: 60.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Aidat, emlak vergisi, bakım-onarım, sigorta gibi yıllık sabit giderler.</p>
          </div>

          {hata && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive" role="alert">
              {hata}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={!alisFiyati}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              Brüt ve net yıllık getiri ile yatırımın kendini ödeme süresi hesaplandı.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 bg-surface-alt rounded-lg border border-border text-center">
                <div className="result-label">Net Yıllık Getiri</div>
                <div className="result-value">{formatPercent(sonuc.netGetiri)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Brüt Yıllık Getiri</div>
                <div className="result-value font-mono">{formatPercent(sonuc.brutGetiri)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Amortisman Süresi</div>
                <div className="result-value font-mono">
                  {sonuc.amortismanYil !== null
                    ? new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 1 }).format(sonuc.amortismanYil) + " yıl"
                    : "—"}
                </div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Alış Fiyatı</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseAmountInput(alisFiyati))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Aylık Kira Geliri</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseAmountInput(aylikKira))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Yıllık Brüt Kira Geliri</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.brutYillikKira)}</span>
              </div>
              {parseAmountInput(yillikGider) > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">Yıllık Giderler</span>
                  <span className="result-breakdown-value">- {formatTRY(parseAmountInput(yillikGider))}</span>
                </div>
              )}
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Yıllık Net Kira Geliri</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.netGelir)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Brüt Getiri</span>
                <span className="result-breakdown-value">{formatPercent(sonuc.brutGetiri)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Net Getiri</span>
                <span className="result-breakdown-value font-medium">{formatPercent(sonuc.netGetiri)}</span>
              </div>
            </div>

            {sonuc.amortismanYil === null ? (
              <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
                <strong>Not:</strong> Yıllık kira geliri giderleri karşılamadığı için yatırım kendini ödemiyor. Kira bedelini
                artırmayı veya giderleri azaltmayı değerlendirin.
              </div>
            ) : (
              <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
                <strong>Not:</strong> Amortisman süresi, kira gelirinin sabit kaldığı varsayımıyla hesaplanır. Kira artışları,
                boş dönemler ve vergi durumu gerçek süreyi değiştirir.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}