import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Cpu,
  Layers,
  HardDrive,
  Battery,
  Zap,
  Camera,
  Radio,
  Volume2,
  Shield,
  Wifi,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Play,
  Youtube,
  Scale,
  Share2,
  Sparkles,
  HelpCircle,
  Flame,
  ArrowRight,
  ExternalLink,
  Eye
} from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import { LightboxModal } from '../components/LightboxModal';
import type { MobilePhone } from '../types';

export const MobileDetailsView: React.FC = () => {
  const { mobiles, videos, currentParam, navigateTo, addToComparison } = useApp();

  const allPhones = mobiles;
  // Find target phone by slug or fallback to Infinix GT 30
  const phone: MobilePhone =
    allPhones.find(m => m.slug === currentParam) ||
    allPhones.find(m => m.id === 'infinix-gt-30') ||
    allPhones[0];

  // Active gallery category filter & Lightbox
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Expanded spec categories accordion
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    network: true,
    body: true,
    display: true,
    platform: true,
    memory: true,
    camera: true,
    sound: true,
    connectivity: true,
    battery: true,
    security: true,
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Expand all / Collapse all specs
  const toggleAllSpecs = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    Object.keys(expandedSections).forEach(k => (next[k] = expand));
    setExpandedSections(next);
  };

  // Related phones
  const relatedPhones = mobiles.filter(m =>
    phone.relatedPhoneSlugs.includes(m.slug) || (m.brand === phone.brand && m.id !== phone.id)
  );

  // Related Munshi YouTube videos
  const relatedVideos = videos.filter(
    v => v.linkedPhoneSlug === phone.slug || v.type === 'Gaming Test' || v.type === 'Review'
  ).slice(0, 3);

  // Filter gallery
  const filteredGallery =
    activeGalleryTab === 'all'
      ? phone.gallery
      : phone.gallery.filter(g => g.category === activeGalleryTab);

  // Update dynamic document title & inject Product / FAQ Schema
  useEffect(() => {
    document.title = `${phone.name} — Full Specifications, Price, Review & Comparison | Tech With Munshi`;

    // Inject JSON-LD Schema for this specific product
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'twm-product-schema';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: phone.name,
      image: phone.image,
      description: `${phone.name} full specifications, real gaming tests, and honest review by MD Naeem Hossin.`,
      brand: {
        '@type': 'Brand',
        name: phone.brand,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'SAR',
        lowPrice: phone.price.saudi.replace(/[^0-9]/g, '') || '1099',
        highPrice: phone.price.saudi.replace(/[^0-9]/g, '') || '1199',
        priceValidUntil: '2026-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
      },
    });

    const existing = document.getElementById('twm-product-schema');
    if (existing) existing.remove();
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById('twm-product-schema');
      if (el) el.remove();
    };
  }, [phone]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 sm:space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <button onClick={() => navigateTo('home')} className="hover:text-blue-600">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('mobiles')} className="hover:text-blue-600">
          Mobiles
        </button>
        <span>/</span>
        <span className="text-slate-400">{phone.brand}</span>
        <span>/</span>
        <span className="text-slate-900 dark:text-white font-medium">{phone.name}</span>
      </nav>

      {/* TOP HERO & QUICK SPECS SECTION (#11, #12) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Product Image & Badges */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 aspect-4/3 group">
              <img
                src={phone.image}
                alt={phone.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {phone.badge && (
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                  {phone.badge}
                </span>
              )}
              <button
                onClick={() => {
                  setLightboxIndex(0);
                  setLightboxOpen(true);
                }}
                className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-xs flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Photos</span>
              </button>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3">
              <a
                href="#youtube-review"
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Youtube className="w-4 h-4" />
                <span>Watch Video Review</span>
              </a>

              <button
                onClick={() => {
                  addToComparison(phone.slug);
                  navigateTo('compare');
                }}
                className="py-3 px-4 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Compare against other smartphones"
              >
                <Scale className="w-4 h-4" />
                <span>Compare</span>
              </button>
            </div>

            {/* Social Sharing bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Share this review:</span>
              <SocialShare
                title={`${phone.name} Full Specifications & Review - Tech With Munshi`}
                description={`Check out MD Naeem Hossin's in-depth review and testing of ${phone.name}.`}
              />
            </div>
          </div>

          {/* Right: Phone Title, Pricing, & Quick Specs Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
                <span>{phone.brand}</span>
                <span>·</span>
                <span>Released: {phone.releaseDate}</span>
              </div>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight">
                {phone.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Full Specifications, Regional Price, Real Gaming Benchmarks & Munshi's Review
              </p>
            </div>

            {/* Pricing Card Section (#14) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Official & Market Pricing
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="text-base">🇸🇦</span>
                    <span className="font-medium">Saudi Arabia Price</span>
                  </div>
                  <div className="font-heading font-extrabold text-xl text-blue-600 dark:text-blue-400">
                    {phone.price.saudi}
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                    <span className="text-base">🇧🇩</span>
                    <span className="font-medium">Bangladesh Price</span>
                  </div>
                  <div className="font-heading font-extrabold text-xl text-blue-600 dark:text-blue-400">
                    {phone.price.bangladesh}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                * Note: Price may vary depending on retailer, storage variant, import duty, promotions, and stock availability.
              </p>
            </div>

            {/* Quick Specs Cards Grid (#12) */}
            <div>
              <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white mb-3">
                Quick Specifications
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Smartphone className="w-3.5 h-3.5 text-blue-500" /> Display
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {phone.quickSpecs.display}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" /> Processor
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {phone.performance.chipset.split('(')[0]}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Layers className="w-3.5 h-3.5 text-purple-500" /> RAM & Storage
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {phone.quickSpecs.ram} · {phone.quickSpecs.storage}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Battery className="w-3.5 h-3.5 text-emerald-500" /> Battery & Speed
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                    {phone.quickSpecs.battery} · {phone.quickSpecs.charging}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Camera className="w-3.5 h-3.5 text-amber-500" /> Camera
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block line-clamp-1">
                    {phone.quickSpecs.camera}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 text-[10px] uppercase font-bold flex items-center gap-1 mb-1">
                    <Zap className="w-3.5 h-3.5 text-rose-500" /> OS & UI
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block line-clamp-1">
                    {phone.quickSpecs.os}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GAMING & PERFORMANCE SECTION (#18) */}
      {phone.gaming && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>Munshi Studio Gaming Test</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-white">
                Gaming & Thermal Performance
              </h2>
            </div>
            <span className="text-xs text-slate-400">
              Tested on {phone.performance.chipset}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs mb-6">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">PUBG Mobile</span>
              <span className="font-heading font-bold text-base text-emerald-400 block">
                {phone.gaming.pubgFps}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">Free Fire</span>
              <span className="font-heading font-bold text-base text-emerald-400 block">
                {phone.gaming.freeFireFps}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">Genshin Impact</span>
              <span className="font-heading font-bold text-base text-blue-400 block">
                {phone.gaming.genshinImpact}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">Peak Heating</span>
              <span className="font-heading font-bold text-base text-amber-400 block">
                {phone.gaming.heating}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">Stability Rating</span>
              <span className="font-heading font-bold text-base text-white block">
                {phone.gaming.stability}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-slate-400 block mb-1">Bypass Charging</span>
              <span className="font-heading font-bold text-base text-purple-400 block">
                {phone.gaming.bypassCharging.includes('Supported') ? 'Yes (Active)' : 'No'}
              </span>
            </div>
          </div>

          {phone.benchmarks && (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-around gap-4 text-xs">
              <div>
                <span className="text-slate-400">AnTuTu Benchmark: </span>
                <strong className="text-blue-300 font-mono text-sm">{phone.benchmarks.antutu}</strong>
              </div>
              <div className="hidden sm:block text-slate-600">|</div>
              <div>
                <span className="text-slate-400">Geekbench Single-Core: </span>
                <strong className="text-blue-300 font-mono text-sm">{phone.benchmarks.geekbenchSingle}</strong>
              </div>
              <div className="hidden sm:block text-slate-600">|</div>
              <div>
                <span className="text-slate-400">Geekbench Multi-Core: </span>
                <strong className="text-blue-300 font-mono text-sm">{phone.benchmarks.geekbenchMulti}</strong>
              </div>
            </div>
          )}
        </section>
      )}

      {/* PROS AND CONS SECTION (#17) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50">
          <div className="flex items-center gap-2 mb-4 text-emerald-700 dark:text-emerald-400 font-heading font-bold text-lg">
            <CheckCircle2 className="w-5 h-5" />
            <h3>Reasons to Buy (Pros)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {phone.pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="p-6 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/50">
          <div className="flex items-center gap-2 mb-4 text-rose-700 dark:text-rose-400 font-heading font-bold text-lg">
            <XCircle className="w-5 h-5" />
            <h3>Things to Keep in Mind (Cons)</h3>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {phone.cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold mt-0.5">✕</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* YOUTUBE VIDEO REVIEW SECTION (#15) */}
      <section id="youtube-review" className="scroll-mt-24">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                <Youtube className="w-4 h-4" />
                <span>Tech With Munshi Video</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                Watch My Full Video Review
              </h2>
            </div>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe to Tech With Munshi</span>
            </a>
          </div>

          {/* Video Player */}
          <div className="rounded-2xl overflow-hidden shadow-xl bg-black aspect-video max-w-4xl mx-auto border border-slate-200 dark:border-slate-800">
            <iframe
              className="w-full h-full object-cover"
              src={`https://www.youtube-nocookie.com/embed/${phone.youtubeVideoId}?rel=0`}
              title={`${phone.name} Full Review by MD Naeem Hossin`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            Video embed streamed directly from YouTube. Real testing conducted by MD Naeem Hossin.
          </p>
        </div>
      </section>

      {/* MY PERSONAL WRITTEN REVIEW (#16) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
        <div>
          <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            Editorial Take
          </div>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            MD Naeem Hossin's Personal Review
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hands-on studio experience, thermal stress logs, and everyday usage verdict.
          </p>
        </div>

        {/* Verdict box */}
        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
          <strong className="text-blue-700 dark:text-blue-400 block mb-1 font-heading text-base">
            Verdict Summary:
          </strong>
          {phone.review.verdict}
        </div>

        {/* Subsections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🎨</span> Design & Ergonomics
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.design}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🖥️</span> Display & Eye Comfort
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.display}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>⚡</span> Performance & Daily Multitasking
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.performance}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🎮</span> Gaming & Sustained Frame Rates
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.gaming}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>📸</span> Camera Quality & Video OIS
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.camera}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🔋</span> Battery Life & Fast Charging
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.battery}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>⚙️</span> Software, Updates & Bloatware
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.software}
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <h4 className="font-heading font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>🏆</span> Overall Recommendation
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {phone.review.overall}
            </p>
          </div>
        </div>
      </section>

      {/* COMPLETE CATEGORIZED SPECIFICATIONS (#13) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
              Technical Sheet
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              Complete Specifications
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleAllSpecs(true)}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={() => toggleAllSpecs(false)}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-4 text-xs sm:text-sm">
          {/* Network */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('network')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-500" /> Network & Frequency Bands
              </span>
              {expandedSections.network ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.network && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Technology</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.technology}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">5G Bands</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">
                    {phone.network.fiveG ? 'Supported (SA/NSA Sub-6GHz Dual Active)' : 'Not Supported'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">SIM Support</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.sim}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Wi-Fi</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.wifi}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Bluetooth</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.bluetooth}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">NFC</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.nfc}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">GPS</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.network.gps}</span>
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('body')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-500" /> Body & Dimensions
              </span>
              {expandedSections.body ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.body && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Dimensions</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.body.dimensions}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Weight</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.body.weight}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Build Quality</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.body.build}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Available Colors</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.body.colors}</span>
                </div>
              </div>
            )}
          </div>

          {/* Display */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('display')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" /> Display Panel & Glass
              </span>
              {expandedSections.display ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.display && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Panel Type</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.type}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Diagonal Size</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.size}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Resolution</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.resolution}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Refresh Rate</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.refreshRate}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Brightness</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.brightness}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Glass Protection</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.display.protection}</span>
                </div>
              </div>
            )}
          </div>

          {/* Platform / Processor */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('platform')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-500" /> Platform & Processing Architecture
              </span>
              {expandedSections.platform ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.platform && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Operating System</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.software.os}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Custom Skin / UI</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.software.ui}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Chipset</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-semibold">{phone.performance.chipset}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">CPU Configuration</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.performance.cpu}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">GPU</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.performance.gpu}</span>
                </div>
              </div>
            )}
          </div>

          {/* Memory */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('memory')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-emerald-500" /> Memory & Storage
              </span>
              {expandedSections.memory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.memory && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">RAM</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.memory.ram}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Internal Storage</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.memory.storage}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Card Slot Expansion</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.memory.cardSupport}</span>
                </div>
              </div>
            )}
          </div>

          {/* Camera */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('camera')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-500" /> Camera Hardware & Video
              </span>
              {expandedSections.camera ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.camera && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Rear Main Camera</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-medium">{phone.camera.rear}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Front Selfie Camera</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.camera.front}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Features</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.camera.features}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Video Capability</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.camera.video}</span>
                </div>
              </div>
            )}
          </div>

          {/* Battery */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('battery')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Battery className="w-4 h-4 text-emerald-500" /> Battery & Charging Speeds
              </span>
              {expandedSections.battery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.battery && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Capacity</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-semibold">{phone.battery.capacity}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Wired Charging</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.battery.charging}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Wireless Charging</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.battery.wirelessCharging}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Reverse Charging</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.battery.reverseCharging}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sound & Security */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('sound')}
              className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-left font-heading font-semibold text-slate-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-rose-500" /> Audio, Security & Extra Features
              </span>
              {expandedSections.sound ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections.sound && (
              <div className="p-5 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Speakers</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.sound.speaker}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">3.5mm Headphone Jack</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200 font-medium">{phone.sound.headphoneJack}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 py-2">
                  <span className="text-slate-400 font-medium">Biometric Security</span>
                  <span className="sm:col-span-2 text-slate-800 dark:text-slate-200">{phone.security.fingerprint} & {phone.security.faceUnlock}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY SECTION (#19) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
              Visual Inspection
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              Studio Photo Gallery
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Click any photo to open the high-resolution lightbox viewer.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-xs font-medium">
            {['all', 'back', 'display', 'camera', 'front', 'box', 'real-life'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveGalleryTab(cat)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  activeGalleryTab === cat
                    ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-semibold shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                const globalIdx = phone.gallery.findIndex(g => g.url === item.url);
                setLightboxIndex(globalIdx >= 0 ? globalIdx : 0);
                setLightboxOpen(true);
              }}
              className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-4/3 cursor-pointer border border-slate-100 dark:border-slate-800"
            >
              <img
                src={item.url}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium line-clamp-1">
                  {item.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS SECTION (#28) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Buyer's FAQ</span>
          </div>
          <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Common questions answered directly by MD Naeem Hossin based on real tests.
          </p>
        </div>

        <div className="space-y-3">
          {phone.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2"
            >
              <h3 className="font-heading font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED TECH WITH MUNSHI VIDEOS (#27) */}
      {relatedVideos.length > 0 && (
        <section className="space-y-6">
          <div>
            <div className="text-xs font-semibold text-red-600 dark:text-red-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube Video Tests</span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              Related Tech With Munshi Videos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedVideos.map(video => (
              <div
                key={video.id}
                onClick={() => navigateTo('videos')}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {video.type}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0 text-xs text-slate-400 flex items-center justify-between">
                  <span>{video.views}</span>
                  <span>{video.uploadDate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS / "YOU MAY ALSO LIKE" (#26) */}
      {relatedPhones.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
                Alternatives
              </div>
              <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                You May Also Like
              </h2>
            </div>
            <button
              onClick={() => navigateTo('mobiles')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All Mobiles →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPhones.slice(0, 4).map(rel => (
              <div
                key={rel.id}
                onClick={() => navigateTo('mobile-detail', rel.slug)}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {rel.brand}
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {rel.quickSpecs.display} · {rel.quickSpecs.processor.split('(')[0]}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    {rel.price.bangladesh}
                  </span>
                  <span className="text-slate-400">
                    {rel.price.saudi}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Component */}
      <LightboxModal
        images={phone.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : phone.gallery.length - 1))}
        onNext={() => setLightboxIndex(prev => (prev < phone.gallery.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
