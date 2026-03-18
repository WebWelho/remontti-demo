/* ================================================================
   NORDIC CRAFT — Home Page
   Remontti Yritys — Demo
   Sections: Hero, Trust Bar, Services Slider, Why Us, Portfolio,
             Process, Testimonials, CTA, Contact, Footer
   ================================================================ */
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Navbar from "@/components/Navbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  ArrowRight, ChevronLeft, ChevronRight, Shield, Clock, Star,
  CheckCircle, Mail, MapPin, Award, Users, ThumbsUp,
} from "lucide-react";

/* ── Image CDN URLs ── */
const IMG = {
  hero:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663368561525/exECHDPVF8F5CnGUq7ELUm/hero-renovation-SgLhaqh4hCWHa3tJLFUA8z.webp",
  bathroom: "https://d2xsxph8kpxj0f.cloudfront.net/310519663368561525/exECHDPVF8F5CnGUq7ELUm/bathroom-reno-RtuUUrpb2RnSD6ck5kwtaX.webp",
  kitchen:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663368561525/exECHDPVF8F5CnGUq7ELUm/kitchen-reno-domC35NjNXYwHX5AFLU8rg.webp",
  craftsman:"https://d2xsxph8kpxj0f.cloudfront.net/310519663368561525/exECHDPVF8F5CnGUq7ELUm/craftsman-work-fLfuLWHG6Ee8NeujkquC5V.webp",
  team:     "https://d2xsxph8kpxj0f.cloudfront.net/310519663368561525/exECHDPVF8F5CnGUq7ELUm/renovation-team-Pv5s7uWj6aLRixdmkTBVjM.webp",
};

/* ── Services data ── */
const SERVICES = [
  {
    icon: "🛁",
    title: "Kylpyhuoneremontti",
    desc: "Täydellinen kylpyhuonesaneeraus vedeneristyksestä kaakeli- ja kalusteasennuksiin. Laadukkaasti, siististi ja ajallaan.",
    img: IMG.bathroom,
  },
  {
    icon: "🍳",
    title: "Keittiöremontti",
    desc: "Unelmiesi keittiö räätälöitynä. Kaappien, työtasojen, kodinkoneiden asennus sekä putki- ja sähkötyöt — avaimet käteen.",
    img: IMG.kitchen,
  },
  {
    icon: "🏠",
    title: "Kokonaisremontti",
    desc: "Koordinoimme koko remontin suunnittelusta luovutukseen. Yksi yhteyshenkilö, yksi sopimus, yksi vastuu.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format",
  },
  {
    icon: "🪵",
    title: "Lattia- ja parkettiasennukset",
    desc: "Parketti, laminaatti, laatta tai vinyyli — asennamme kaikki lattiamateriaalit huolellisesti ja vanhat lattiat poistetaan siististi.",
    img: IMG.craftsman,
  },
  {
    icon: "🎨",
    title: "Maalaus & tasoitus",
    desc: "Ammattimainen pintakäsittely seinistä kattoon. Tasoitus, pohjatyöt ja maalaus — tulos on aina tasainen ja kestävä.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format",
  },
  {
    icon: "🔧",
    title: "Saneeraus & LVI-työt",
    desc: "Putkiremontti, käyttövesiuusinnat ja viemäröinti. Teemme kaiken suunnittelusta toteutukseen yhteistyössä pätevien LVI-asentajien kanssa.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format",
  },
];

/* ── Portfolio data ── */
const PORTFOLIO = [
  { tag: "Kylpyhuoneremontti", title: "Alue 2024", img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=80&auto=format" },
  { tag: "Keittiöremontti",    title: "Alue 2024",         img: IMG.kitchen },
  { tag: "Kokonaisremontti",   title: "Alue 2023",            img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700&q=80&auto=format" },
  { tag: "Lattia & maalaus",   title: "Alue 2023", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700&q=80&auto=format" },
  { tag: "Kylpyhuone",         title: "Alue 2023",         img: IMG.bathroom },
];

/* ── Testimonials ── */
const TESTIMONIACS = [
  {
    stars: 5,
    text: "Kylpyhuoneremontti meni täysin aikataulussa ja lopputulos ylitti odotukset. Ammattitaitoista porukkaa alusta loppuun. Erityisesti pidimme siitä, miten siististi he pitivät työmaan.",
    name: "Asiakas A",
    loc: "Kaupunki, kylpyhuoneremontti 2024",
    initials: "AA",
  },
  {
    stars: 5,
    text: "Tilasimme keittiöremontin ja olemme erittäin tyytyväisiä. Hinta oli kilpailukykyinen, työ laadukasta ja kommunikointi sujuvaa. Suosittelen lämpimästi!",
    name: "Asiakas B",
    loc: "Kaupunki, keittiöremontti 2024",
    initials: "AB",
  },
  {
    stars: 5,
    text: "Täydellinen kokonaisremontti vanhaan omakotitaloon. Yritys koordinoi kaikki alihankkijat ja pysyi budjetissa. Ei stressiä, vain upea lopputulos!",
    name: "Asiakas C",
    loc: "Kaupunki, kokonaisremontti 2023",
    initials: "AC",
  },
];

/* ── AnimatedSection wrapper ── */
function AnimatedSection({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useScrollAnimation();
  return (
    <div ref={ref} className={`fade-up flex flex-col ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ── Hero ── */
function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const img = imgRef.current;
      if (!hero || !img) return;
      const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
      img.style.transform = `scale(${1 + progress * 0.07}) translateY(${progress * -3}%)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: "clamp(680px, 95vh, 820px)",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
      }}
    >
      {/* Background image with parallax */}
      <div
        ref={imgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform",
          zIndex: 0,
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0.18 0.04 250 / 0.75) 0%, oklch(0.18 0.04 250 / 0.3) 65%, transparent 100%)", zIndex: 1 }} />
      <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, oklch(0.18 0.04 250 / 0.65) 0%, transparent 60%)", zIndex: 1 }} />

      {/* Content */}
      <div className="relative w-full" style={{ zIndex: 5 }}>
        <div className="container pt-[88px] sm:pt-[120px] pb-16 md:pb-24">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6"
            style={{
              background: "oklch(0.62 0.13 55 / 0.18)",
              border: "1px solid oklch(0.62 0.13 55 / 0.45)",
              color: "oklch(0.85 0.1 60)",
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              animation: "fadeInUp 0.8s ease both",
            }}
          >
            <span
              style={{
                width: 7, height: 7,
                background: "oklch(0.72 0.12 60)",
                borderRadius: "50%",
                animation: "pulse-dot 2s infinite",
              }}
            />
            Alueen luotetuin remonttiyritys
          </div>

          {/* Headline */}
          <h1
            className="text-white mb-5"
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: "clamp(2.6rem, 7vw, 5.2rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              animation: "fadeInUp 0.8s ease 0.1s both",
              maxWidth: "700px",
            }}
          >
            Remontit,<br />
            jotka <em style={{ color: "oklch(0.78 0.12 60)", fontStyle: "normal" }}>puhuvat</em><br />
            puolestaan.
          </h1>

          {/* Sub */}
          <p
            className="mb-8"
            style={{
              color: "oklch(1 0 0 / 0.78)",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              maxWidth: "520px",
              lineHeight: 1.7,
              animation: "fadeInUp 0.8s ease 0.2s both",
            }}
          >
            Ammattimaista remontointia kodille ja yritykselle — kylpyhuoneista keittiöihin,
            lattioista kattoihin. Yli 15 vuotta kokemusta, satoja tyytyväisiä asiakkaita.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3"
            style={{ animation: "fadeInUp 0.8s ease 0.3s both" }}
          >
            <button onClick={() => scrollTo("yhteystiedot")} className="btn-amber">
              Pyydä ilmainen tarjous <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo("referenssit")} className="btn-ghost" style={{ color: "white", borderColor: "oklch(1 0 0 / 0.35)" }}>
              Katso töitämme
            </button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          background: "oklch(0.18 0.04 250 / 0.88)",
          backdropFilter: "blur(8px)",
          zIndex: 5,
          animation: "fadeInUp 0.8s ease 0.5s both",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { num: "15+", label: "Vuotta kokemusta" },
              { num: "350+", label: "Tyytyväistä asiakasta" },
              { num: "100%", label: "Tyytyväisyystakuu" },
              { num: "4.9★", label: "Keskiarvo, Google" },
            ].map((s) => (
              <div key={s.label} className="text-center py-4 px-2">
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.8rem", fontWeight: 800, color: "oklch(0.78 0.12 60)", lineHeight: 1 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: "0.72rem", color: "oklch(1 0 0 / 0.65)", letterSpacing: "0.06em", textTransform: "uppercase", marginTop: "0.2rem" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Bar ── */
function TrustBar() {
  const items = [
    { icon: <Shield size={16} />, text: "Takuutyö kaikissa projekteissa" },
    { icon: <Award size={16} />, text: "Y-tunnus | Kotitalousvähennys" },
    { icon: <Clock size={16} />, text: "Ilmainen tarjouskäynti" },
    { icon: <CheckCircle size={16} />, text: "Rakennusmestari joka kohteessa" },
    { icon: <Shield size={16} />, text: "Takuutyö kaikissa projekteissa" },
    { icon: <Award size={16} />, text: "Y-tunnus | Kotitalousvähennys" },
    { icon: <Clock size={16} />, text: "Ilmainen tarjouskäynti" },
    { icon: <CheckCircle size={16} />, text: "Rakennusmestari joka kohteessa" },
  ];

  return (
    <div className="trust-bar overflow-hidden">
      <div className="animate-marquee">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-8 py-3 whitespace-nowrap"
            style={{ color: "oklch(0.78 0.12 60)", fontSize: "0.82rem", fontWeight: 600, letterSpacing: "0.06em" }}
          >
            {item.icon}
            <span style={{ color: "white" }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Services Slider ── */
function ServicesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();

  return (
    <section id="palvelut" style={{ padding: "5rem 0", background: "var(--linen)" }}>
      <div className="container">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div ref={ref1} className="fade-up">
            <div className="section-badge">Palvelumme</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1 }}>
              Mitä teemme<br />paremmin kuin muut
            </h2>
            <div className="amber-rule" />
          </div>
          {/* Carousel controls */}
          <div ref={ref2} className="fade-up fade-up-delay-1 flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all"
              style={{
                borderColor: canPrev ? "var(--amber)" : "var(--border)",
                color: canPrev ? "var(--amber)" : "var(--warm-gray-lt)",
                background: "white",
              }}
              aria-label="Edellinen"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="w-11 h-11 rounded-full border flex items-center justify-center transition-all"
              style={{
                borderColor: canNext ? "var(--amber)" : "var(--border)",
                color: canNext ? "var(--amber)" : "var(--warm-gray-lt)",
                background: "white",
              }}
              aria-label="Seuraava"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {SERVICES.map((s, i) => (
              <div key={i} className="embla__slide">
                <div className="service-card" style={{ height: "420px" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    className="service-card-img"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="service-card-overlay">
                    <span className="service-card-icon">{s.icon}</span>
                    <div className="service-card-title">{s.title}</div>
                    <p className="service-card-desc">{s.desc}</p>
                    <button
                      className="service-card-link"
                      onClick={() => {
                        const el = document.getElementById("yhteystiedot");
                        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
                      }}
                    >
                      Kysy lisää <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Why Us ── */
function WhyUsSection() {
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();

  const points = [
    { icon: <Star size={20} />, title: "Kokenut tiimi, todistettu laatu", desc: "Jokaisessa kohteessa on mukana kokenut rakennusmestari. Emme ota enemmän töitä kuin pystymme tekemään hyvin." },
    { icon: <Clock size={20} />, title: "Aikataulussa, budjetissa", desc: "Laaditaan realistinen aikataulu ja pidetään siitä kiinni. Mahdolliset muutokset kommunikoidaan välittömästi." },
    { icon: <Shield size={20} />, title: "Täysi vastuuvakuutus & takuu", desc: "Kaikki työmme ovat vakuutettuja ja tarjoamme 2 vuoden takuun kaikille töille. Asiakas voi nukkua yönsä rauhassa." },
    { icon: <Users size={20} />, title: "Avoin viestintä alusta loppuun", desc: "Pidämme sinut ajan tasalla koko projektin ajan. Vastaamme mahdollisimman pian." },
  ];

  return (
    <section id="miksi-me" style={{ padding: "5rem 0", background: "white" }}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div ref={ref1} className="fade-up relative">
            <div
              style={{
                width: "100%",
                height: "500px",
                borderRadius: "4px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={IMG.team}
                alt="Remontti Yritys tiimi"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* Float badge */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                background: "var(--amber)",
                color: "white",
                padding: "1.5rem",
                textAlign: "center",
                minWidth: "130px",
                borderRadius: "3px",
              }}
            >
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: "2.5rem", fontWeight: 800, lineHeight: 1 }}>15+</div>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: "0.2rem" }}>Vuotta alalla</div>
            </div>
          </div>

          {/* Content */}
          <div ref={ref2} className="fade-up fade-up-delay-1">
            <div className="section-badge">Miksi Remontti Yritys</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
              Remontti tehdään<br />kerralla oikein.
            </h2>
            <div className="amber-rule" />
            <p style={{ color: "var(--warm-gray)", fontSize: "0.95rem", lineHeight: 1.75, marginBottom: "2rem" }}>
              Me emme tehdä remontointia hätäillen tai lyhytnäköisesti. Jokainen projekti on meille mahdollisuus osoittaa ammattitaito — ja se näkyy lopputuloksessa.
            </p>
            <div className="flex flex-col gap-5">
              {points.map((p, i) => (
                <div key={i} className="flex gap-4">
                  <div
                    style={{
                      width: 44, height: 44,
                      background: "oklch(0.62 0.13 55 / 0.1)",
                      border: "1px solid oklch(0.62 0.13 55 / 0.25)",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: "var(--amber)",
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: "0.2rem", color: "var(--charcoal)" }}>{p.title}</div>
                    <p style={{ color: "var(--warm-gray)", fontSize: "0.88rem", lineHeight: 1.65 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Portfolio ── */
function PortfolioSection() {
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }

  return (
    <section id="referenssit" style={{ padding: "5rem 0", background: "var(--stone)" }}>
      <div className="container">
        <div ref={ref1} className="fade-up flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="section-badge">Viimeisimmät kohteet</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1 }}>
              Työmme puhuvat<br />puolestaan
            </h2>
            <div className="amber-rule" />
          </div>
          <button onClick={() => scrollTo("yhteystiedot")} className="btn-amber">
            Pyydä vastaava tulos <ArrowRight size={16} />
          </button>
        </div>

        {/* Masonry-style grid — desktop only */}
        <div ref={ref2} className="fade-up fade-up-delay-1">
          <div className="hidden md:grid grid-cols-12 gap-3" style={{ gridTemplateRows: "280px 280px" }}>
            {PORTFOLIO.map((p, i) => (
              <div
                key={i}
                className="portfolio-item"
                style={{
                  gridColumn: i === 0 ? "span 7" : i === 1 ? "span 5" : i === 2 ? "span 4" : i === 3 ? "span 4" : "span 4",
                }}
              >
                <img src={p.img} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="portfolio-overlay">
                  <div>
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.78 0.12 60)", marginBottom: "0.25rem" }}>
                      {p.tag}
                    </div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1.1rem", fontWeight: 700, color: "white" }}>
                      {p.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="flex flex-col md:hidden gap-3 mt-3">
            {PORTFOLIO.slice(0, 3).map((p, i) => (
              <div key={i} className="portfolio-item" style={{ height: "220px" }}>
                <img src={p.img} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="portfolio-overlay">
                  <div>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "oklch(0.78 0.12 60)", marginBottom: "0.2rem" }}>{p.tag}</div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: "1rem", fontWeight: 700, color: "white" }}>{p.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Process ── */
function ProcessSection() {
  const ref = useScrollAnimation();
  const steps = [
    { num: "01", title: "Ilmainen tarjouskäynti", desc: "Tulemme katsomaan kohteen ja teemme tarjouksen. Ei sitoumuksia, ei piilokuluja." },
    { num: "02", title: "Suunnittelu & materiaalit", desc: "Autamme materiaalivalinnoissa ja teemme yksityiskohtaisen projektisuunnitelman aikatauluineen." },
    { num: "03", title: "Toteutus ammattitaidolla", desc: "Oma kokenut tiimimme toteuttaa työn siististi. Pidämme sinut ajan tasalla koko ajan." },
    { num: "04", title: "Luovutus & takuu", desc: "Käymme kohteen yhdessä läpi, siivotaan jäljet ja annetaan 2 vuoden työtakuu kirjallisesti." },
  ];

  return (
    <section id="prosessi" style={{ padding: "5rem 0", background: "white" }}>
      <div className="container">
        <div className="text-center mb-12" style={{ maxWidth: 600, margin: "0 auto 3rem" }}>
          <AnimatedSection>
            <div className="section-badge" style={{ justifyContent: "center" }}>Näin toimimme</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1 }}>
              Remontti sujuu<br />ilman stressiä
            </h2>
            <div className="amber-rule" style={{ margin: "1.25rem auto" }} />
            <p style={{ color: "var(--warm-gray)", fontSize: "0.95rem", lineHeight: 1.7 }}>
              Selkeä prosessi takaa sen, että tiedät aina missä mennään.
            </p>
          </AnimatedSection>
        </div>

        <div ref={ref} className="fade-up grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="process-step" style={{ transitionDelay: `${i * 0.08}s` }}>
              <span className="process-num">{s.num}</span>
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.6rem", color: "var(--charcoal)" }}>{s.title}</div>
              <p style={{ color: "var(--warm-gray)", fontSize: "0.88rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ── */
function TestimonialsSection() {
  const ref = useScrollAnimation();

  return (
    <section id="arvostelut" style={{ padding: "5rem 0", background: "var(--stone)" }}>
      <div className="container">
        <div className="text-center mb-12" style={{ maxWidth: 600, margin: "0 auto 3rem" }}>
          <AnimatedSection>
            <div className="section-badge" style={{ justifyContent: "center" }}>Asiakkaidemme sanoin</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1 }}>
              Tyytyväiset asiakkaat<br />kertovat kaiken
            </h2>
            <div className="amber-rule" style={{ margin: "1.25rem auto" }} />
          </AnimatedSection>
        </div>

        <div ref={ref} className="fade-up grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIACS.map((t, i) => (
            <div key={i} className="testimonial-card" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div style={{ color: "var(--amber)", fontSize: "1rem", letterSpacing: 2, marginBottom: "1rem" }}>
                {"★".repeat(t.stars)}
              </div>
              <p style={{ color: "var(--warm-gray)", fontSize: "0.93rem", lineHeight: 1.75, marginBottom: "1.5rem", fontStyle: "italic" }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: "2.5rem", color: "oklch(0.62 0.13 55 / 0.2)", lineHeight: 0, verticalAlign: "-0.8rem", marginRight: "0.2rem" }}>"</span>
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "var(--amber)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, color: "white", fontSize: "0.9rem", flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--charcoal)" }}>{t.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "var(--warm-gray)" }}>{t.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ── */
function CTABanner() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }

  return (
    <section
      style={{
        padding: "5rem 2rem",
        background: "linear-gradient(135deg, oklch(0.62 0.13 55 / 0.12) 0%, oklch(0.18 0.04 250) 100%)",
        borderTop: "1px solid oklch(0.62 0.13 55 / 0.2)",
        borderBottom: "1px solid oklch(0.62 0.13 55 / 0.2)",
      }}
    >
      <AnimatedSection style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", alignItems: "center" }}>
        <div className="section-badge" style={{ justifyContent: "center", color: "oklch(0.78 0.12 60)" }}>Ei maksa mitään kysyä</div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: "1rem" }}>
          Valmiina aloittamaan?<br />Me olemme.
        </h2>
        <p style={{ color: "oklch(1 0 0 / 0.72)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 560 }}>
          Tarjouskäynti on aina ilmainen ja velvoittamaton. Tulemme katsomaan kohteen,
          kuuntelemme toiveesi ja teemme selkeän tarjouksen mahdollisimman pian.
        </p>
        <button onClick={() => scrollTo("yhteystiedot")} className="btn-amber" style={{ fontSize: "1rem", padding: "1rem 2.2rem" }}>
          Pyydä ilmainen tarjous <ArrowRight size={18} />
        </button>
      </AnimatedSection>
    </section>
  );
}

/* ── Contact ── */
function ContactSection() {
  const ref1 = useScrollAnimation();
  const ref2 = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <section id="yhteystiedot" style={{ padding: "5rem 0", background: "white" }}>
      <div className="container">
        <div ref={ref1} className="fade-up mb-10">
          <div className="section-badge">Ota yhteyttä</div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "var(--charcoal)", lineHeight: 1.1 }}>
            Aloitetaan<br />projekti yhdessä
          </h2>
          <div className="amber-rule" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <div ref={ref1} className="fade-up flex flex-col gap-5">
            {[
              { icon: <Mail size={20} />, label: "Sähköposti", value: <a href="mailto:info@esimerkki.fi" style={{ color: "inherit", textDecoration: "none" }}>info@esimerkki.fi</a> },
              { icon: <MapPin size={20} />, label: "Toimialue", value: "Kaupunki & Alue" },
              { icon: <Clock size={20} />, label: "Aukioloajat", value: <>Ma–Pe: 7:00–17:00<br />La: 8:00–14:00 (sopimuksen mukaan)</> },
              { icon: <Award size={20} />, label: "Y-tunnus", value: <>FI00000000<br /><small style={{ color: "var(--warm-gray)", fontSize: "0.8rem" }}>ACV-rekisterissä | Kotitalousvähennys käytettävissä</small></> },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div
                  style={{
                    width: 44, height: 44,
                    background: "oklch(0.62 0.13 55 / 0.1)",
                    border: "1px solid oklch(0.62 0.13 55 / 0.2)",
                    borderRadius: "3px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: "var(--amber)",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "0.2rem" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.95rem", color: "var(--warm-gray)", lineHeight: 1.5 }}>{item.value}</div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { icon: <ThumbsUp size={14} />, text: "Tyytyväisyystakuu" },
                { icon: <Shield size={14} />, text: "2v työtakuu" },
                { icon: <CheckCircle size={14} />, text: "Ilmainen tarjouskäynti" },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2"
                  style={{
                    background: "var(--linen)",
                    border: "1px solid var(--border)",
                    borderRadius: "3px",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--charcoal)",
                  }}
                >
                  <span style={{ color: "var(--amber)" }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div
            ref={ref2}
            className="fade-up fade-up-delay-1"
            style={{
              background: "var(--linen)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              padding: "2.5rem",
            }}
          >
            {!submitted ? (
              <>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--charcoal)", marginBottom: "0.4rem" }}>
                  Pyydä ilmainen tarjous
                </h3>
                <p style={{ color: "var(--warm-gray)", fontSize: "0.88rem", marginBottom: "1.75rem" }}>
                  Vastaamme mahdollisimman pian ja tarjouskäynti on aina maksuton.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Etunimi</label>
                      <input type="text" placeholder="Matti" required className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Sukunimi</label>
                      <input type="text" placeholder="Virtanen" required className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Sähköposti</label>
                    <input type="email" placeholder="matti@email.fi" required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Palvelu</label>
                    <select required className="form-input" defaultValue="">
                      <option value="" disabled>Valitse palvelu...</option>
                      <option>Kylpyhuoneremontti</option>
                      <option>Keittiöremontti</option>
                      <option>Kokonaisremontti</option>
                      <option>Lattia- ja parkettiasennukset</option>
                      <option>Maalaus & tasoitus</option>
                      <option>Saneeraus & LVI-työt</option>
                      <option>Muu / useita palveluita</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Kerro projektista</label>
                    <textarea
                      placeholder="Lyhyt kuvaus remontista, tilavuus, aikataulu, erityistoiveet..."
                      required
                      className="form-input"
                      style={{ minHeight: "110px", resize: "vertical" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-amber justify-center"
                    style={{ marginTop: "0.25rem", fontSize: "0.95rem", padding: "1rem" }}
                  >
                    {loading ? "Lähetetään..." : "Lähetä tarjouspyyntö →"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--amber)", marginBottom: "0.5rem" }}>
                  Kiitos yhteydenotosta!
                </h3>
                <p style={{ color: "var(--warm-gray)", fontSize: "0.9rem" }}>
                  Olemme vastaanottaneet tarjouspyyntösi ja otamme yhteyttä mahdollisimman pian. Nähdään pian!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer() {
  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  }

  return (
    <footer style={{ background: "var(--navy)", color: "white", padding: "4rem 0 2rem" }}>
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex flex-col leading-none text-left mb-4">
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--amber-light)" }}>
                Luotettava remontoija
              </span>
              <span style={{ fontFamily: "'Fraunces', serif", fontSize: "1.3rem", fontWeight: 700, color: "white" }}>
                Remontti Yritys
              </span>
            </button>
            <p style={{ color: "oklch(1 0 0 / 0.55)", fontSize: "0.88rem", lineHeight: 1.75, maxWidth: 260 }}>
              Ammattimaista remontointia yli 15 vuoden kokemuksella.
              Teemme remontit kerralla oikein — laadukkaasti, ajallaan ja budjetissa.
            </p>
            <div className="flex gap-2 mt-4">
              {["f", "ig", "in"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36, height: 36,
                    border: "1px solid oklch(1 0 0 / 0.15)",
                    borderRadius: "3px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "oklch(1 0 0 / 0.55)",
                    fontSize: "0.82rem", fontWeight: 700,
                    textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--amber)";
                    (e.currentTarget as HTMLElement).style.color = "var(--amber)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 0.15)";
                    (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.55)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "white", marginBottom: "1rem" }}>
              Palvelut
            </div>
            <ul className="flex flex-col gap-2">
              {["Kylpyhuoneremontti", "Keittiöremontti", "Kokonaisremontti", "Lattia-asennukset", "Maalaus & tasoitus", "Saneeraus & LVI"].map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo("palvelut")}
                    style={{ color: "oklch(1 0 0 / 0.55)", fontSize: "0.88rem", textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amber)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.55)"; }}
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "white", marginBottom: "1rem" }}>
              Yritys
            </div>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Miksi me", anchor: "miksi-me" },
                { label: "Referenssit", anchor: "referenssit" },
                { label: "Arvostelut", anchor: "arvostelut" },
                { label: "Prosessi", anchor: "prosessi" },
                { label: "Yhteystiedot", anchor: "yhteystiedot" },
              ].map((item) => (
                <li key={item.anchor}>
                  <button
                    onClick={() => scrollTo(item.anchor)}
                    style={{ color: "oklch(1 0 0 / 0.55)", fontSize: "0.88rem", background: "none", border: "none", cursor: "pointer", padding: 0, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amber)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.55)"; }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "white", marginBottom: "1rem" }}>
              Yhteystiedot
            </div>
            <ul className="flex flex-col gap-2" style={{ color: "oklch(1 0 0 / 0.55)", fontSize: "0.88rem" }}>
              <li>
                <a href="mailto:info@esimerkki.fi" style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amber)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.55)"; }}
                >
                  info@esimerkki.fi
                </a>
              </li>
              <li>Kaupunki & Alue</li>
              <li>Ma–Pe 7–17, La 8–14</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}
        >
          <p style={{ color: "oklch(1 0 0 / 0.4)", fontSize: "0.82rem" }}>
            © 2025 Remontti Yritys. Kaikki oikeudet pidätetään.
          </p>
          <div className="flex gap-4">
            {["Tietosuoja", "Evästeseloste", "Käyttöehdot"].map((l) => (
              <a
                key={l}
                href="#"
                style={{ color: "oklch(1 0 0 / 0.4)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--amber)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "oklch(1 0 0 / 0.4)"; }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Mobile sticky bottom bar ── */
function MobileStickyBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex border-t"
      style={{ borderColor: "oklch(1 0 0 / 0.1)", background: "var(--navy)" }}
    >
      <a
        href="mailto:info@esimerkki.fi"
        className="flex-1 flex items-center justify-center gap-2 py-4"
        style={{ color: "white", fontWeight: 600, fontSize: "0.88rem", borderRight: "1px solid oklch(1 0 0 / 0.1)", textDecoration: "none" }}
      >
        <Mail size={16} /> Sähköposti
      </a>
      <button
        onClick={() => {
          const el = document.getElementById("yhteystiedot");
          if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 64, behavior: "smooth" });
        }}
        className="flex-1 flex items-center justify-center gap-2 py-4"
        style={{ background: "var(--amber)", color: "white", fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: "pointer" }}
      >
        Pyydä tarjous <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ── Main export ── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: "hidden" }}>
      <Navbar />
      <main className="flex-1 pb-16 md:pb-0" style={{ isolation: "isolate" }}>
        <Hero />
        <TrustBar />
        <ServicesSection />
        <WhyUsSection />
        <PortfolioSection />
        <ProcessSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
      {/* Portfolio footer */}
      <div style={{textAlign:"center",padding:"14px",fontSize:"12px",color:"#999",borderTop:"1px solid rgba(0,0,0,0.1)"}}>
        Toteutettu{" "}<a href="https://webwelho.com" style={{color:"#666",textDecoration:"none"}}>WebWelho</a>{" "}Perus-paketilla · webwelho.com
      </div>
  );
}
