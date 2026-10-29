import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  Factory,
  Compass,
  CheckCircle2,
  Download,
  SlidersHorizontal,
} from 'lucide-react';
import {
  TRUST_HIGHLIGHTS,
  WHY_CHOOSE_FEATURES,
  PRODUCTS_DATA,
  INDUSTRIES_DATA,
  QUALITY_PROCESS_STEPS,
  RESOURCE_DOCUMENTS,
  ProductItem,
  ResourceDocument,
} from './data/siteData';
import { Navbar } from './components/Navbar';
import { AnimatedHeadline, ScrollReveal } from './components/AnimatedUI';
import { ProductCard } from './components/ProductCard';
import { IndustryVisualCard } from './components/IndustryVisualCard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import {
  ProductDetailModal,
  QuoteRequestModal,
  ResourcePreviewModal,
} from './components/Modals';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAllProducts, setShowAllProducts] = useState<boolean>(true);
  const [activeProductModal, setActiveProductModal] =
    useState<ProductItem | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteModalProduct, setQuoteModalProduct] = useState<string>('');
  const [activeResourceModal, setActiveResourceModal] =
    useState<ResourceDocument | null>(null);

  const categories = [
    'All',
    'Parallel Thread',
    'Taper Thread',
  ];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  const displayedProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 6);

  const handleOpenQuoteModal = (defaultProduct?: string) => {
    setQuoteModalProduct(defaultProduct || PRODUCTS_DATA[0].name);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-600 selection:text-white">
      {/* Header & Sticky Navigation */}
      <Navbar
        onSelectProduct={(prod) => setActiveProductModal(prod)}
        onOpenQuoteModal={handleOpenQuoteModal}
      />

      <main className="flex-grow">
        {/* SECTION 3: PREMIUM FULL-WIDTH HERO SECTION */}
        <section
          id="home"
          className="relative bg-white text-slate-900 py-16 sm:py-24 lg:py-28 border-b border-slate-200 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8">
            <div className="lg:col-span-7 max-w-3xl space-y-6">
              {/* Small Uppercase Label */}
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold">
                ENGINEERED FOR STRENGTH
              </div>

              {/* Large Headline with Line-by-Line Slide-Up Animation */}
              <AnimatedHeadline
                text="Building Stronger Connections. Engineering a Better Future."
                as="h1"
                variant="line-slide"
                className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold tracking-tight leading-[1.1] text-slate-900"
              />

              {/* Supporting Paragraph */}
              <ScrollReveal delay={0.15}>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  We manufacture precision-machined mechanical rebar couplers,
                  cold-forged parallel thread systems, and headed reinforcement
                  anchors designed to deliver dependable structural continuity
                  across heavy civil infrastructure and high-rise construction.
                </p>
              </ScrollReveal>

              {/* Primary & Secondary CTAs */}
              <ScrollReveal delay={0.22}>
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenQuoteModal()}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Request a Quote</span>
                  </button>
                </div>
              </ScrollReveal>

              {/* Unboxed Quality & Traceability Trust Footnote */}
              <ScrollReveal delay={0.28}>
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-mono-tabular">
                  <span className="inline-flex items-center gap-1.5 text-slate-900 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>BIS IS 16172 : 2023 Compliant</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-900 font-semibold">ISO 9001:2015 Certified</span>
                  <span aria-hidden="true">·</span>
                  <span>Ø 12mm – 40mm Bar Capacity</span>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero engineering animation: supplied reference frames converted into a lightweight looping video */}
            <div className="hero-engineering-visual lg:col-span-5" aria-label="Animated technical visualization of a threaded rebar coupler">
              <div className="hero-video-shell">
                <div className="hero-video-topline">
                  <span className="hero-live-dot" />
                  <span>MECHANICAL SPLICE SYSTEM</span>
                  <span className="hero-video-index">VSS / 01</span>
                </div>
                <video
                  className="hero-engineering-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/assets/rebar-coupler-animation-poster.jpg"
                  aria-label="Technical animation showing a threaded rebar coupler assembly"
                >
                  <source src="/assets/rebar-coupler-engineering.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-caption">
                  <span className="hero-caption-kicker">PRECISION CONNECTION</span>
                  <span className="hero-caption-title">Threaded. Aligned. Secured.</span>
                </div>
                <div className="hero-float-tag hero-float-tag-top">
                  <span className="hero-tag-line" />
                  <span><strong>01</strong> Thread engagement</span>
                </div>
                <div className="hero-float-tag hero-float-tag-bottom">
                  <span className="hero-tag-line" />
                  <span><strong>02</strong> Structural continuity</span>
                </div>
              </div>
              <div className="hero-visual-footnote">
                <span>ENGINEERING VISUALIZATION</span>
                <span>BUILT FOR LOAD TRANSFER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* SECTION 4: TRUST AND CREDIBILITY SECTION */}
        <section
          aria-label="Trust and Manufacturing Credentials"
          className="bg-slate-900 text-white border-b border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-800">
              {TRUST_HIGHLIGHTS.map((stat, idx) => (
                <ScrollReveal
                  key={stat.id}
                  delay={idx * 0.08}
                  className="lg:px-8 first:lg:pl-0 last:lg:pr-0"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono-tabular text-orange-500 tracking-tight">
                    {stat.metricPlaceholder}
                  </div>
                  <h2 className="mt-2 text-base font-bold text-white">
                    {stat.title}
                  </h2>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {stat.description}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: ABOUT THE COMPANY */}
        <section id="about" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Side: Industrial Facility & Rebar Coupler Engineering Visual */}
              <ScrollReveal className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <div className="sm:col-span-6 bg-white flex items-center justify-center">
                      <img
                        src="/assets/precision-rebar-couplers.webp"
                        alt="Precision-machined stainless and carbon steel threaded rebar couplers"
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={600}
                        referrerPolicy="no-referrer"
                        className="w-full h-80 sm:h-full object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-6 p-6 sm:p-7 flex flex-col justify-between bg-slate-900 text-white">
                      <div className="space-y-3">
                        <div className="text-xs font-mono-tabular text-orange-400">
                          STRUCTURAL SPLICING TECHNOLOGY
                        </div>
                        <h3 className="text-lg font-bold leading-snug">
                          Engineered to Replace Congested Lap Splices
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Our mechanical couplers transfer tensile and
                          compressive forces directly along the axis of the
                          reinforcing bar, maintaining continuous load paths in
                          columns, shear walls, and deep foundations.
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-slate-800 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>Strong Mechanical Connection</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>Faster On-Site Cage Installation</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                          <span>Consistent Axial Load Performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Right Side: Company Introduction Content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold">
                  ABOUT OUR COMPANY
                </div>

                <AnimatedHeadline
                  text="Precision Engineering. Uncompromising Quality."
                  as="h2"
                  variant="word-stagger"
                  highlightWords={['Precision', 'Quality']}
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight"
                />

                <ScrollReveal delay={0.1}>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Chirag Enterprises specializes in the design and
                    precision manufacturing of mechanical rebar splicing couplers,
                    headed anchorage assemblies, and on-site bar threading
                    equipment. Built for structural engineers and civil
                    contractors, our systems provide a dependable alternative to
                    traditional lap splicing and site welding.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.18}>
                  <p className="text-base text-slate-600 leading-relaxed">
                    From raw carbon-steel bar stock verification to automated CNC
                    thread machining and destructive Universal Testing Machine
                    (UTM) verification, every production batch is governed by
                    documented quality control procedures and full heat-number
                    traceability.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.24}>
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href="#manufacturing"
                      className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 hover:bg-orange-600 rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Discover Our Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                    <a
                      href="#products"
                      className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
                    >
                      <span>View Product Range</span>
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY CHOOSE OUR SOLUTIONS? */}
        <section
          id="why-choose"
          className="py-20 sm:py-28 bg-slate-50 border-y border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold mb-2">
                STRUCTURAL ADVANTAGES
              </div>
              <AnimatedHeadline
                text="Why Choose Us?"
                as="h2"
                variant="scale-up"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              />
              <ScrollReveal delay={0.1}>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Modern reinforced concrete structures demand high reinforcement
                  ratios and rapid construction cycles. Mechanical splicing
                  solves the structural and logistical limitations of traditional
                  lapped joints.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_CHOOSE_FEATURES.map((feat, idx) => (
                <ScrollReveal
                  key={feat.id}
                  delay={idx * 0.08}
                  className="bg-white rounded-xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-orange-500/70 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-xs font-mono-tabular font-bold text-orange-600">
                        {feat.index}. CAPABILITY
                      </span>
                      {idx === 0 && (
                        <ShieldCheck className="w-5 h-5 text-slate-700" />
                      )}
                      {idx === 1 && <Wrench className="w-5 h-5 text-slate-700" />}
                      {idx === 2 && (
                        <Compass className="w-5 h-5 text-slate-700" />
                      )}
                      {idx === 3 && (
                        <Factory className="w-5 h-5 text-slate-700" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-mono-tabular">
                    {feat.engineeringNote}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: FEATURED PRODUCTS */}
        <section id="products" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div className="max-w-2xl">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold mb-2">
                  MECHANICAL SPLICING &amp; ANCHORAGE CATALOGUE
                </div>
                <AnimatedHeadline
                  text="Our Products"
                  as="h2"
                  variant="mask-reveal"
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
                />
                <ScrollReveal delay={0.1}>
                  <p className="mt-3 text-base text-slate-600 leading-relaxed">
                    Precision-machined couplers and headed anchors engineered for
                    bar diameters from 12 mm to 40 mm. Select any product below
                    to inspect thread geometry, dimensional tables, and
                    installation procedures.
                  </p>
                </ScrollReveal>
              </div>

              {/* Interactive Category Filter Controls */}
              <ScrollReveal delay={0.15}>
                <div
                  role="tablist"
                  aria-label="Filter products by thread and application category"
                  className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200"
                >
                  {categories.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>

            {/* Product Grid with Staggered Reveal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {displayedProducts.map((product, index) => (
                <ScrollReveal key={product.id} delay={index * 0.06}>
                  <ProductCard
                    product={product}
                    onViewDetails={(prod) => setActiveProductModal(prod)}
                    onRequestQuoteForProduct={(prodName) =>
                      handleOpenQuoteModal(prodName)
                    }
                  />
                </ScrollReveal>
              ))}
            </div>

            {/* View All Products / Reset Filter Action Bar */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs sm:text-sm text-slate-600 font-mono-tabular">
                Showing {displayedProducts.length} of {PRODUCTS_DATA.length}{' '}
                engineered reinforcement products
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {selectedCategory !== 'All' && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setShowAllProducts(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>View All Products ({PRODUCTS_DATA.length})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    handleOpenQuoteModal(
                      'Full Project Package (Couplers + Threading Equipment)'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request Custom Diameter Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: MANUFACTURING AND QUALITY SECTION (+ CERTIFICATIONS & RESOURCES) */}
        <section
          id="manufacturing"
          className="py-20 sm:py-28 bg-slate-950 text-white border-y border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            {/* Two-Column Manufacturing & Quality Control Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Content & 4-Step Quality Control Process */}
              <div className="lg:col-span-6 space-y-6">
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-400 font-semibold">
                  PRODUCTION &amp; METALLURGICAL INTEGRITY
                </div>

                <AnimatedHeadline
                  text="Manufacturing Excellence"
                  as="h2"
                  variant="fade-up"
                  className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
                />

                <ScrollReveal delay={0.1}>
                  <p className="text-base text-slate-300 leading-relaxed">
                    Every rebar coupler is a structural load-bearing element. Our
                    manufacturing workflow integrates raw steel verification,
                    automated CNC threading, calibrated Go/No-Go gauging, and
                    batch axial tensile testing to ensure consistent site
                    performance.
                  </p>
                </ScrollReveal>

                <div className="space-y-4 pt-2">
                  {QUALITY_PROCESS_STEPS.map((item, idx) => (
                    <ScrollReveal
                      key={item.step}
                      delay={idx * 0.08}
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5"
                    >
                      <div className="flex items-center gap-2.5 text-xs font-mono-tabular text-orange-400">
                        <span>STAGE {item.step}</span>
                        <span>·</span>
                        <span>QUALITY PROTOCOL</span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              {/* Right Column: Facility Visuals, Product Testing & Inspection */}
              <ScrollReveal delay={0.15} className="lg:col-span-6 space-y-6">
                {/* Visual 1: CNC Machining & Thread Inspection Schematic */}
                <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs font-mono-tabular text-orange-400">
                        IN-HOUSE TESTING &amp; METROLOGY
                      </div>
                      <h3 className="text-lg font-bold text-white mt-0.5">
                        Universal Testing Machine (UTM) &amp; Thread Gauging
                      </h3>
                    </div>
                    <span className="text-xs font-mono-tabular text-slate-400">
                      BATCH VERIFIED
                    </span>
                  </div>

                  {/* Technical UTM Tensile & Thread Gauge SVG Illustration */}
                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-5">
                    <svg
                      viewBox="0 0 460 210"
                      className="w-full h-48"
                      role="img"
                      aria-label="Universal Testing Machine axial tensile verification and Go/No-Go thread gauge inspection diagram"
                    >
                      {/* Left Panel: UTM Axial Pull Test */}
                      <rect
                        x="12"
                        y="12"
                        width="210"
                        height="186"
                        rx="6"
                        fill="#0f172a"
                        stroke="#1e293b"
                      />
                      <text
                        x="26"
                        y="32"
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        01. AXIAL TENSILE TEST (UTM)
                      </text>
                      {/* Upper & Lower Crossheads */}
                      <rect x="65" y="45" width="104" height="16" fill="#334155" />
                      <rect x="65" y="155" width="104" height="16" fill="#334155" />
                      {/* Rebar Specimen & Coupler under Tension */}
                      <rect x="111" y="61" width="12" height="94" fill="#64748b" />
                      <rect
                        x="105"
                        y="90"
                        width="24"
                        height="36"
                        rx="2"
                        fill="#e2e8f0"
                        stroke="#f97316"
                        strokeWidth="1.5"
                      />
                      {/* Tension Force Arrows */}
                      <path
                        d="M50 75 L50 48 M46 54 L50 48 L54 54"
                        stroke="#f97316"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M50 135 L50 162 M46 156 L50 162 L54 156"
                        stroke="#f97316"
                        strokeWidth="2"
                        fill="none"
                      />
                      <text
                        x="140"
                        y="105"
                        fill="#f97316"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        SPLICE ZONE
                      </text>
                      <text
                        x="140"
                        y="118"
                        fill="#cbd5e1"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        SLIP &amp; YIELD
                      </text>

                      {/* Right Panel: Go / No-Go Plug Gauge Calibration */}
                      <rect
                        x="238"
                        y="12"
                        width="210"
                        height="186"
                        rx="6"
                        fill="#0f172a"
                        stroke="#1e293b"
                      />
                      <text
                        x="252"
                        y="32"
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        02. GO / NO-GO THREAD GAUGE
                      </text>
                      {/* Thread Profile Waveform */}
                      <polyline
                        points="258,115 272,85 286,115 300,85 314,115 328,85 342,115 356,85 370,115 384,85 398,115 412,85 426,115"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                      />
                      <line
                        x1="254"
                        y1="85"
                        x2="430"
                        y2="85"
                        stroke="#f97316"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                      />
                      <line
                        x1="254"
                        y1="115"
                        x2="430"
                        y2="115"
                        stroke="#f97316"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                      />
                      <text
                        x="258"
                        y="148"
                        fill="#e2e8f0"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        PITCH &amp; ROOT RADIUS CHECK
                      </text>
                      <text
                        x="258"
                        y="164"
                        fill="#94a3b8"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        100% LOT TRACEABILITY
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="font-mono-tabular text-orange-400">
                        DIMENSIONAL INSPECTION
                      </div>
                      <div className="font-semibold text-white mt-1">
                        Thread Pitch, Concentricity &amp; Length
                      </div>
                      <p className="text-slate-400 mt-1 leading-relaxed">
                        Verified at every CNC machining center using calibrated
                        thread plug and ring gauges.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="font-mono-tabular text-orange-400">
                        LOT TRACEABILITY
                      </div>
                      <div className="font-semibold text-white mt-1">
                        Heat Number &amp; Mill Cert Archiving
                      </div>
                      <p className="text-slate-400 mt-1 leading-relaxed">
                        Each dispatch crate is tagged with raw steel heat numbers
                        and internal QC release records.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Certifications & Standards Area (Anchor #certifications) */}
                <div
                  id="certifications"
                  className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 scroll-mt-24"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-mono-tabular text-orange-400 uppercase tracking-wider">
                        CERTIFICATIONS &amp; QUALITY STANDARDS
                      </div>
                      <h3 className="text-xl font-bold text-white mt-1">
                        BIS IS 16172 : 2023 &amp; ISO 9001:2015 Certified Standards
                      </h3>
                    </div>
                    <span className="text-xs font-mono-tabular text-emerald-400">
                      VERIFIED STANDARDS
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Chirag Enterprises manufactures mechanical reinforcement couplers in compliance with Indian Standard <strong>IS 16172 : 2023</strong> under an <strong>ISO 9001:2015</strong> certified Quality Management System.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* BIS IS 16172 : 2023 Card with Logo */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/60 transition-colors flex flex-col justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* BIS Standard Mark Logo SVG */}
                        <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                            role="img"
                            aria-label="BIS IS 16172 : 2023 Standard Logo"
                          >
                            <rect
                              x="6"
                              y="6"
                              width="88"
                              height="88"
                              rx="10"
                              fill="#ffffff"
                              stroke="#1e3a8a"
                              strokeWidth="6"
                            />
                            <polygon
                              points="50,14 86,82 14,82"
                              fill="none"
                              stroke="#dc2626"
                              strokeWidth="5"
                              strokeLinejoin="round"
                            />
                            <text
                              x="50"
                              y="62"
                              textAnchor="middle"
                              fill="#1e3a8a"
                              fontSize="24"
                              fontWeight="900"
                              fontFamily="sans-serif"
                            >
                              ISI
                            </text>
                            <text
                              x="50"
                              y="78"
                              textAnchor="middle"
                              fill="#dc2626"
                              fontSize="10"
                              fontWeight="800"
                              fontFamily="monospace"
                            >
                              BIS
                            </text>
                          </svg>
                        </div>

                        <div>
                          <div className="text-xs font-mono-tabular text-orange-400 font-semibold">
                            BUREAU OF INDIAN STANDARDS
                          </div>
                          <div className="text-base font-extrabold text-white tracking-tight">
                            BIS IS 16172 : 2023
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Reinforcement Couplers for Mechanical Splices of Bars in Concrete — Specification for static tensile strength, slip, and thread accuracy.
                      </p>
                    </div>

                    {/* ISO 9001:2015 Card with Logo */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/60 transition-colors flex flex-col justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        {/* ISO 9001:2015 Emblem Logo SVG */}
                        <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                            role="img"
                            aria-label="ISO 9001:2015 Certified Logo"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="44"
                              fill="#0f172a"
                              stroke="#0284c7"
                              strokeWidth="5"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="35"
                              fill="none"
                              stroke="#38bdf8"
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                            />
                            <ellipse
                              cx="50"
                              cy="50"
                              rx="20"
                              ry="35"
                              fill="none"
                              stroke="#1e293b"
                              strokeWidth="2"
                            />
                            <line
                              x1="15"
                              y1="50"
                              x2="85"
                              y2="50"
                              stroke="#1e293b"
                              strokeWidth="2"
                            />
                            <text
                              x="50"
                              y="47"
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="22"
                              fontWeight="900"
                              fontFamily="sans-serif"
                            >
                              ISO
                            </text>
                            <text
                              x="50"
                              y="65"
                              textAnchor="middle"
                              fill="#38bdf8"
                              fontSize="12"
                              fontWeight="700"
                              fontFamily="monospace"
                            >
                              9001:2015
                            </text>
                          </svg>
                        </div>

                        <div>
                          <div className="text-xs font-mono-tabular text-orange-400 font-semibold">
                            QUALITY MANAGEMENT SYSTEM
                          </div>
                          <div className="text-base font-extrabold text-white tracking-tight">
                            ISO 9001:2015
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Certified Quality Management System covering raw material traceability, CNC thread machining, and 100% batch inspection protocols.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Document Download & Technical Resources Area (Anchor #resources) */}
            <div
              id="resources"
              className="pt-12 border-t border-slate-800 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs font-mono-tabular text-orange-400 uppercase tracking-wider">
                    TECHNICAL DOCUMENTATION &amp; CATALOGUES
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Engineering Catalogues &amp; Certificate Dossiers
                  </h3>
                </div>
                <p className="text-xs text-slate-400 max-w-md">
                  Select any document below to inspect its contents or request a
                  verified copy from our technical desk.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {RESOURCE_DOCUMENTS.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-6 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-orange-500/60 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-400 mb-3">
                        <span>{doc.category}</span>
                        <span className="text-orange-400">{doc.documentCode}</span>
                      </div>
                      <h4 className="text-base font-bold text-white">
                        {doc.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                        {doc.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono-tabular text-slate-400">
                        {doc.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveResourceModal(doc)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Inspect / Request</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: INDUSTRIES AND APPLICATIONS */}
        <section id="industries" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-14">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold mb-2">
                SECTORS WE SERVE
              </div>
              <AnimatedHeadline
                text="Industries & Structural Applications"
                as="h2"
                variant="fade-up"
                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              />
              <ScrollReveal delay={0.1}>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  Our mechanical reinforcement couplers and headed anchors are
                  deployed across demanding civil engineering and commercial
                  building sectors where structural continuity and congestion
                  relief are critical.
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES_DATA.map((industry, idx) => (
                <ScrollReveal key={industry.id} delay={idx * 0.06}>
                  <IndustryVisualCard item={industry} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: CALL-TO-ACTION SECTION */}
        <section className="py-20 sm:py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal className="max-w-3xl mx-auto text-center space-y-6">
              <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-500 font-semibold">
                PROJECT CONSULTATION &amp; SPLICING SCHEDULES
              </div>

              <AnimatedHeadline
                text="Looking for Reliable Reinforcement Solutions?"
                as="h2"
                variant="scale-up"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              />

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
                Connect with our team to discuss your project requirements and
                find the right solution.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenQuoteModal()}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                >
                  <span>Contact Our Team</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION 12: CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* SECTION 13: FOOTER */}
      <Footer
        onSelectProduct={(prod) => setActiveProductModal(prod)}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* INTERACTIVE MODALS (Triggered strictly by user interaction) */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onRequestQuoteForProduct={(prodName) => handleOpenQuoteModal(prodName)}
      />

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        defaultProduct={quoteModalProduct}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ResourcePreviewModal
        resource={activeResourceModal}
        onClose={() => setActiveResourceModal(null)}
        onRequestDocumentCopy={(docTitle) =>
          handleOpenQuoteModal(`Document Request: ${docTitle}`)
        }
      />
    </div>
  );
}
