/* ================================================================
   NORDIC CRAFT — Navbar
   Transparent on hero, frosted-glass pill on scroll.
   Mobile hamburger menu slides in from right.
   ================================================================ */
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Palvelut", anchor: "palvelut" },
  { label: "Miksi me", anchor: "miksi-me" },
  { label: "Referenssit", anchor: "referenssit" },
  { label: "Arvostelut", anchor: "arvostelut" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = window.innerWidth >= 640 ? 80 : 64;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 8, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // iOS-safe scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [mobileOpen]);

  const isTransparent = !scrolled && !mobileOpen;

  return (
    <>
      {/* Outer wrapper: pointer-events:none so hero content is clickable */}
      <div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center w-full px-0 sm:px-4 py-0 sm:py-3 transition-all duration-300 isolate"
        style={{ pointerEvents: "none" }}
      >
        <header
          className={`w-full pointer-events-auto transition-all duration-500 ${
            isTransparent
              ? "bg-transparent"
              : scrolled
              ? "sm:max-w-6xl sm:rounded-xl glass-nav"
              : "bg-white border-b border-[var(--border)]"
          }`}
        >
          <div className="container flex items-center justify-between" style={{ height: "68px" }}>
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col leading-none text-left"
              style={{ pointerEvents: "auto" }}
            >
              <span
                className="text-[0.6rem] font-bold tracking-[0.2em] uppercase"
                style={{ color: isTransparent ? "oklch(0.98 0.008 85 / 0.85)" : "var(--amber)" }}
              >
                Luotettava remontoija
              </span>
              <span
                className="font-serif text-xl font-bold leading-tight"
                style={{
                  fontFamily: "'Fraunces', serif",
                  color: isTransparent ? "white" : "var(--charcoal)",
                }}
              >
                Remontti Yritys
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.anchor}
                  onClick={() => scrollToSection(item.anchor)}
                  className="px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded"
                  style={{
                    color: isTransparent ? "oklch(1 0 0 / 0.85)" : "var(--warm-gray)",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = isTransparent ? "white" : "var(--charcoal)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = isTransparent ? "oklch(1 0 0 / 0.85)" : "var(--warm-gray)";
                  }}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("yhteystiedot")}
                className="btn-amber ml-4"
                style={{ padding: "0.6rem 1.4rem", fontSize: "0.85rem" }}
              >
                Pyydä tarjous
              </button>
            </nav>

            {/* Hamburger */}
            <button
              className="lg:hidden flex items-center justify-center"
              style={{
                width: "48px",
                height: "48px",
                position: "relative",
                zIndex: 101,
                pointerEvents: "auto",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
                cursor: "pointer",
                color: isTransparent ? "white" : "var(--charcoal)",
              }}
              onClick={(e) => { e.stopPropagation(); setMobileOpen((p) => !p); }}
              type="button"
              aria-label={mobileOpen ? "Sulje valikko" : "Avaa valikko"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile menu panel */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "white",
          overflowY: "auto",
          zIndex: 98,
          paddingTop: "68px",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          WebkitOverflowScrolling: "touch",
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col p-6 gap-2">
          {navItems.map((item) => (
            <button
              key={item.anchor}
              onClick={() => { scrollToSection(item.anchor); setMobileOpen(false); }}
              className="text-left py-4 px-2 text-2xl font-bold border-b border-[var(--border)] transition-colors"
              style={{ fontFamily: "'Fraunces', serif", color: "var(--charcoal)" }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { scrollToSection("yhteystiedot"); setMobileOpen(false); }}
            className="btn-amber mt-6 justify-center"
            style={{ fontSize: "1rem", padding: "1rem 2rem" }}
          >
            Pyydä ilmainen tarjous
          </button>
          <a
            href="mailto:info@remonttiremontit-esimerkki.fi"
            className="mt-3 text-center text-sm font-medium"
            style={{ color: "var(--warm-gray)" }}
          >
            info@remonttiremontit-esimerkki.fi
          </a>
        </div>
      </div>
    </>
  );
}
