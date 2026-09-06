"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { calculatorCategories, calculatorsByCategory } from "../../lib/calculators";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const linkClass =
  "block px-3 py-2 rounded-md text-sm font-normal text-muted-foreground hover:text-primary hover:bg-surface-alt/70 transition-colors";

export default function HeaderMegaMenu() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [megaPanel, setMegaPanel] = useState<{ left: number; top: number; width: number } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLDivElement>(null);

  const openDesktopMenu = () => {
    const el = megaTriggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.min(880, window.innerWidth - 24);
    const left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
    setMegaPanel({ left, top: rect.bottom, width });
    setMegaOpen(true);
  };

  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [megaOpen, mobileOpen]);

  const toggleCategory = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div ref={rootRef} className="relative flex items-center h-full">
      {/* Desktop: tek "Hesaplayıcılar" mega menü */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Ana navigasyon">
        <div
          ref={megaTriggerRef}
          className="relative"
          onMouseEnter={openDesktopMenu}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <button
            type="button"
            onClick={() => (megaOpen ? setMegaOpen(false) : openDesktopMenu())}
            aria-expanded={megaOpen}
            aria-controls="hesaplayicilar-desktop-menu"
            className={`flex items-center gap-1.5 text-sm font-medium rounded-md px-3 py-2 transition-colors ${
              megaOpen
                ? "text-foreground bg-surface-alt"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-alt"
            }`}
          >
            Hesaplayıcılar
            <ChevronDown className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
          </button>
          {megaOpen && megaPanel && (
            <div
              id="hesaplayicilar-desktop-menu"
              className="fixed z-50 rounded-xl border border-border bg-surface shadow-xl grid grid-cols-3 gap-8 p-6"
              style={{ left: megaPanel.left, top: megaPanel.top, width: megaPanel.width }}
            >
              {calculatorCategories.map((cat) => (
                <div key={cat.id}>
                  <h3 className="text-[13px] font-semibold tracking-wide uppercase text-secondary mb-3">
                    {cat.title}
                  </h3>
                  <ul className="space-y-0.5">
                    {calculatorsByCategory(cat.id).map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${item.slug}`} className={linkClass} onClick={() => setMegaOpen(false)}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <a
          href="/hakkimizda"
          className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-colors rounded-md px-3 py-2"
        >
          Hakkımızda
        </a>
        <a
          href="/iletisim"
          className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-colors rounded-md px-3 py-2"
        >
          İletişim
        </a>
      </nav>

      {/* Mobil: hamburger + kategori accordion */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="hesaplayicilar-mobile-menu"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          className="flex items-center justify-center w-10 h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-colors"
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          )}
        </button>
        {mobileOpen && (
          <div
            id="hesaplayicilar-mobile-menu"
            className="absolute right-0 top-full mt-2 rounded-xl border border-border bg-surface shadow-xl z-50 overflow-hidden"
            style={{ width: "calc(100vw - 2rem)" }}
          >
            {calculatorCategories.map((cat) => (
              <div key={cat.id} className="border-b border-border last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  aria-expanded={!!expanded[cat.id]}
                  aria-controls={`category-${cat.id}-panel`}
                  className="flex items-center justify-between w-full px-4 py-3.5 text-sm font-semibold text-secondary text-left hover:bg-surface-alt/60 transition-colors"
                >
                  {cat.title}
                  <ChevronDown className={`transition-transform ${expanded[cat.id] ? "rotate-180" : ""}`} />
                </button>
                {expanded[cat.id] && (
                  <ul id={`category-${cat.id}-panel`} className="px-2 pb-3 space-y-0.5">
                    {calculatorsByCategory(cat.id).map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${item.slug}`} className={linkClass} onClick={() => setMobileOpen(false)}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="flex flex-col p-2 gap-0.5">
              <a href="/hakkimizda" className={linkClass} onClick={() => setMobileOpen(false)}>
                Hakkımızda
              </a>
              <a href="/iletisim" className={linkClass} onClick={() => setMobileOpen(false)}>
                İletişim
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}