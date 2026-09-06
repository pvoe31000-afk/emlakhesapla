"use client";

import { useState, FormEvent } from "react";
import { formatThousandsInput } from "../../lib/format";

const VERGI_DILIMLERI = [
  { ustLimit: 360000, oran: 0.15 },
  { ustLimit: 800000, oran: 0.2 },
  { ustLimit: 1600000, oran: 0.27 },
  { ustLimit: 3000000, oran: 0.3 },
  { ustLimit: Infinity, oran: 0.4 },
];

const ISTISNA_TUTARI = 150000;

const ORNEK_UFE = {
  mevcutAy: 1450,
  oncekiAy: 1400,
};

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

function cevir(v: string): number {
  const n = parseFloat(v.replace(/[.,]/g, ""));
  return isFinite(n) ? n : 0;
}

export default function DegerArtisClient() {
  const [alisBedel, setAlisBedel] = useState("");
  const [satisBedel, setSatisBedel] = useState("");
  const [alisYili, setAlisYili] = useState("");
  const [satisYili, setSatisYili] = useState("");
  const [giderler, setGiderler] = useState("");
  const [sonuc, setSonuc] = useState<{
    endekslenmisAlis: number;
    brutKazanc: number;
    istisna: number;
    matrah: number;
    vergi: number;
    netKazanc: number;
  } | null>(null);
  const [hata, setHata] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHata("");

    const alis = parseFloat(alisBedel.replace(/[.,]/g, "").replace(",", ".")) || 0;
    const satis = parseFloat(satisBedel.replace(/[.,]/g, "").replace(",", ".")) || 0;
    const alisY = parseInt(alisYili);
    const satisY = parseInt(satisYili);
    const gider = parseFloat(giderler.replace(/[.,]/g, "").replace(",", ".")) || 0;

    if (alis <= 0 || satis <= 0 || !alisY || !satisY) {
      setHata("Lütfen gerekli tüm alanları doldurun.");
      return;
    }
    if (alisY > satisY) {
      setHata("Alış yılı satış yılından sonra olamaz.");
      return;
    }
    if (satisY - alisY >= 5) {
      setHata("Gayrimenkul 5 yıl ve üzeri elde tutulmuş; bu durumda değer artış kazancı vergisi ödenmez.");
      return;
    }

    const yilFark = satisY - alisY;
    const endeksKatsayisi = Math.pow(ORNEK_UFE.mevcutAy / ORNEK_UFE.oncekiAy, yilFark);
    const endekslenmisAlis = alis * endeksKatsayisi;

    let brutKazanc = satis - endekslenmisAlis - gider;
    if (brutKazanc < 0) brutKazanc = 0;

    const istisnaUygulanan = Math.max(0, brutKazanc - ISTISNA_TUTARI);
    const vergi = hesaplaVergi(istisnaUygulanan);
    const netKazanc = brutKazanc - istisnaUygulanan - vergi;

    setSonuc({
      endekslenmisAlis,
      brutKazanc,
      istisna: Math.min(ISTISNA_TUTARI, brutKazanc),
      matrah: istisnaUygulanan,
      vergi,
      netKazanc,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "alis-bedel") setAlisBedel(formatThousandsInput(e.target.value));
    if (e.target.name === "satis-bedel") setSatisBedel(formatThousandsInput(e.target.value));
    if (e.target.name === "giderler") setGiderler(formatThousandsInput(e.target.value));
    if (e.target.name === "alis-yil") setAlisYili(e.target.value.replace(/[^\d]/g, ""));
    if (e.target.name === "satis-yil") setSatisYili(e.target.value.replace(/[^\d]/g, ""));
    if (sonuc) setSonuc(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="card-header">
          <h2 className="card-title">Hesaplama Formu</h2>
          <p className="card-description">Alım ve satım bilgilerinizi girerek kazancınızı hesaplayın.</p>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="alis-bedel" className="form-label">Alış Bedeli (TL) <span className="text-destructive" aria-hidden="true">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  id="alis-bedel"
                  name="alis-bedel"
                  value={alisBedel}
                  onChange={handleInputChange}
                  placeholder="Örn: 500.000"
                  className="form-input font-mono pr-10"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
              </div>
            </div>
            <div>
              <label htmlFor="satis-bedel" className="form-label">Satış Bedeli (TL) <span className="text-destructive" aria-hidden="true">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  id="satis-bedel"
                  name="satis-bedel"
                  value={satisBedel}
                  onChange={handleInputChange}
                  placeholder="Örn: 1.500.000"
                  className="form-input font-mono pr-10"
                  inputMode="numeric"
                  autoComplete="off"
                  required
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="alis-yil" className="form-label">Alış Yılı <span className="text-destructive" aria-hidden="true">*</span></label>
              <input
                type="text"
                id="alis-yil"
                name="alis-yil"
                value={alisYili}
                onChange={handleInputChange}
                placeholder="Örn: YYYY"
                className="form-input font-mono"
                inputMode="numeric"
                autoComplete="off"
                required
              />
            </div>
            <div>
              <label htmlFor="satis-yil" className="form-label">Satış Yılı <span className="text-destructive" aria-hidden="true">*</span></label>
              <input
                type="text"
                id="satis-yil"
                name="satis-yil"
                value={satisYili}
                onChange={handleInputChange}
                placeholder="Örn: YYYY"
                className="form-input font-mono"
                inputMode="numeric"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="giderler" className="form-label">Satış Giderleri (TL) (opsiyonel)</label>
            <div className="relative">
              <input
                type="text"
                id="giderler"
                name="giderler"
                value={giderler}
                onChange={handleInputChange}
                placeholder="Örn: 25.000"
                className="form-input font-mono pr-10"
                inputMode="numeric"
                autoComplete="off"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">TL</span>
            </div>
            <p className="form-hint">Komisyon, noter, harç gibi satışa bağlı giderler.</p>
          </div>

          {hata && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive" role="alert">
              {hata}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={!alisBedel || !satisBedel || !alisYili || !satisYili}>
            Hesapla
          </button>
        </div>
      </form>

      {sonuc && (
        <div className="mt-6 result-card" role="region" aria-label="Hesaplama sonucu" aria-live="polite">
          <div className="card-header">
            <h2 className="card-title">Hesaplama Sonucu</h2>
            <p className="card-description">Güncel istisna tutarı ({formatNumber(ISTISNA_TUTARI)} TL) ve vergi tarifesine göre hesaplandı.</p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-surface-alt rounded-lg border border-border text-center">
                <div className="result-label">Ödenecek Vergi</div>
                <div className="result-value">{formatTRY(sonuc.vergi)}</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border text-center">
                <div className="result-label">Net Kazanç (Vergi Sonrası)</div>
                <div className="result-value font-mono">{formatTRY(sonuc.netKazanc)}</div>
              </div>
            </div>

            <div className="result-breakdown">
              <h3 className="font-medium text-foreground mb-3">Detaylı Kırılım</h3>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Alış Bedeli</span>
                <span className="result-breakdown-value font-mono">{formatTRY(cevir(alisBedel))}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Endekslenmiş Alış Bedeli (ÜFE)</span>
                <span className="result-breakdown-value font-mono">{formatTRY(sonuc.endekslenmisAlis)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Satış Bedeli</span>
                <span className="result-breakdown-value font-mono">{formatTRY(cevir(satisBedel))}</span>
              </div>
              {cevir(giderler) > 0 && (
                <div className="result-breakdown-item">
                  <span className="result-breakdown-label">Satış Giderleri</span>
                  <span className="result-breakdown-value font-mono">- {formatTRY(cevir(giderler))}</span>
                </div>
              )}
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">Brüt Kazanç</span>
                <span className="result-breakdown-value">{formatTRY(sonuc.brutKazanc)}</span>
              </div>
              <div className="result-breakdown-item">
                <span className="result-breakdown-label">İstisna Tutarı</span>
                <span className="result-breakdown-value">- {formatTRY(sonuc.istisna)}</span>
              </div>
              <div className="result-breakdown-item" style={{ borderBottom: "none" }}>
                <span className="result-breakdown-label font-medium">Vergi Matrahı</span>
                <span className="result-breakdown-value font-medium">{formatTRY(sonuc.matrah)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}