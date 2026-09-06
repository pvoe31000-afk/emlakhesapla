"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput, parseAmountInput, formatTRY } from "../../lib/format";

const TAPU_HARC_TARAF_PAYI = 0.02;
const KOMISYON_ORANI = 0.02;
const KDV_ORANI = 0.2;

export default function ToplamSatisMaliyetiClient() {
  const [satisBedeli, setSatisBedeli] = useState("");
  const [taraf, setTaraf] = useState<"alici" | "satici">("alici");
  const [daskSigorta, setDaskSigorta] = useState("");
  const [digerGiderler, setDigerGiderler] = useState("");
  const [sonuc, setSonuc] = useState<{
    tapuHarci: number;
    komisyon: number;
    kdv: number;
    sigorta: number;
    diger: number;
    toplam: number;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bedel = parseAmountInput(satisBedeli);
    if (bedel <= 0) return;

    const sigorta = parseAmountInput(daskSigorta);
    const diger = parseAmountInput(digerGiderler);

    const tapuHarci = bedel * TAPU_HARC_TARAF_PAYI;
    const komisyon = bedel * KOMISYON_ORANI;
    const kdv = komisyon * KDV_ORANI;

    setSonuc({
      tapuHarci,
      komisyon,
      kdv,
      sigorta,
      diger,
      toplam: tapuHarci + komisyon + kdv + sigorta + diger,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "satis-bedeli") setSatisBedeli(formatThousandsInput(e.target.value));
    if (e.target.name === "dask-sigorta") setDaskSigorta(formatThousandsInput(e.target.value));
    if (e.target.name === "diger-giderler") setDigerGiderler(formatThousandsInput(e.target.value));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Satış bedelini girin, tarafınızı seçin; tüm maliyetler tek özette toplansın.</p>
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
                placeholder="Örn: 2.000.000"
                className="form-input font-mono text-lg pr-10"
                inputMode="numeric"
                autoComplete="off"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Gayrimenkulün satış (devir) bedeli.</p>
          </div>

          <fieldset>
            <legend className="form-label">Hangi Tarafsınız?</legend>
            <div className="flex gap-4" role="radiogroup" aria-label="Taraf seçimi">
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                taraf === "alici" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="taraf"
                  value="alici"
                  checked={taraf === "alici"}
                  onChange={() => { setTaraf("alici"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <span className="font-medium">Alıcı</span>
                <span className="text-sm text-muted-foreground ml-auto">Tapu %2 + Komisyon %2</span>
              </label>
              <label className={`flex items-center gap-2 cursor-pointer flex-1 p-3 border-2 rounded-lg transition-colors ${
                taraf === "satici" ? "border-accent bg-accent/5" : "border-border hover:border-secondary/50"
              }`}>
                <input
                  type="radio"
                  name="taraf"
                  value="satici"
                  checked={taraf === "satici"}
                  onChange={() => { setTaraf("satici"); if (sonuc) setSonuc(null); }}
                  className="sr-only"
                />
                <span className="font-medium">Satıcı</span>
                <span className="text-sm text-muted-foreground ml-auto">Tapu %2 + Komisyon %2</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label htmlFor="dask-sigorta" className="form-label">
              DASK / Konut Sigortası Bedeli (TL) (opsiyonel)
            </label>
            <div className="relative">
              <input
                type="text"
                id="dask-sigorta"
                name="dask-sigorta"
                value={daskSigorta}
                onChange={handleInputChange}
                placeholder="Örn: 1.850"
                className="form-input font-mono pr-10"
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Zorunlu deprem sigortası (DASK) ve/veya konut sigortası yıllık primi.</p>
          </div>

          <div>
            <label htmlFor="diger-giderler" className="form-label">
              Diğer Giderler (TL) (opsiyonel)
            </label>
            <div className="relative">
              <input
                type="text"
                id="diger-giderler"
                name="diger-giderler"
                value={digerGiderler}
                onChange={handleInputChange}
                placeholder="Örn: 10.000"
                className="form-input font-mono pr-10"
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Noter, ekspertiz, dosya masrafı, emlak danışmanlık hizmeti gibi ek kalemler.</p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={!satisBedeli || parseAmountInput(satisBedeli) <= 0}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">
              {taraf === "alici" ? "Alıcı" : "Satıcı"} tarafı için tüm maliyetlerin toplamı (tapu harcı %2 + komisyon %2 + KDV + opsiyonel kalemler).
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-surface-alt rounded-lg border border-border">
              <div className="result-label">Toplam Maliyet ({taraf === "alici" ? "Alıcı" : "Satıcı"})</div>
              <div className="result-value">{formatTRY(sonuc.toplam)}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Tapu Harcı (%2)</div>
                <div className="result-value font-mono">{formatTRY(sonuc.tapuHarci)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Komisyon + KDV</div>
                <div className="result-value font-mono">
                  {formatTRY(sonuc.komisyon)} <span className="text-base text-muted-foreground">+ {formatTRY(sonuc.kdv)} KDV</span>
                </div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">DASK / Sigorta</div>
                <div className="result-value font-mono">{formatTRY(sonuc.sigorta)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Diğer Giderler</div>
                <div className="result-value font-mono">{formatTRY(sonuc.diger)}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Satış Bedeli</span>
                <span className="result-breakdown-value font-mono">{formatTRY(parseAmountInput(satisBedeli))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Tapu Harcı (%2)</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.tapuHarci)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Emlakçı Komisyonu (%2)</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.komisyon)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">KDV (%20)</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.kdv)}</span>
              </div>
              {sonuc.sigorta > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">DASK / Sigorta</span>
                  <span className="result-breakdown-value">{formatTRY(sonuc.sigorta)}</span>
                </div>
              )}
              {sonuc.diger > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">Diğer Giderler</span>
                  <span className="result-breakdown-value">{formatTRY(sonuc.diger)}</span>
                </div>
              )}
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Toplam Maliyet</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.toplam)}</span>
              </div>
            </div>

            <div className="p-3 bg-surface-alt border border-border rounded-lg text-sm text-muted-foreground">
              <strong>Not:</strong> Tapu harcı ve komisyon payları taraflar arasında sözleşmeyle değişebilir. İşlemle ilgili
              kesin tutarlar için noteriniz ve emlakçınızla görüşün.
            </div>
          </div>
        </div>
      )}
    </>
  );
}