import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Smartphone,
  Youtube,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  Play,
  TrendingUp,
  Scale
} from 'lucide-react';
export const HomeView: React.FC = () => {
  const { navigateTo, t, addToComparison, mobiles, reviews, videos, guides } = useApp();

  const featuredPhone = mobiles.find(m => m.id === 'infinix-gt-30') || mobiles[0];
  const featuredVideo = videos.find(v => v.featured) || videos[0];
  const featuredReview = reviews[0];
  const latestPhones = mobiles.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 md:pt-14 pb-12 md:pb-16 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-blue-950/20 dark:via-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Tech With Munshi · Official Platform</span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span>By MD Naeem Hossin</span>
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-[1.12]">
                Technology <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Made Simple.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {t('hero.subheading')} From extreme gaming benchmarks to honest camera tests and dual-currency pricing for Bangladesh & Saudi Arabia.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('mobiles')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 group"
                >
                  <span>Explore Mobiles</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => navigateTo('videos')}
                  className="px-6 py-3.5 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs transition-all flex items-center gap-2.5"
                >
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>Watch YouTube</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-200/80 dark:border-slate-800/80 text-xs">
                <div>
                  <div className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    50+
                  </div>
                  <div className="text-slate-500">Studio Tested</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                    100K+
                  </div>
                  <div className="text-slate-500">Tech Audience</div>
                </div>
                <div>
                  <div className="font-heading font-bold text-emerald-600 dark:text-emerald-400 text-base sm:text-lg flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> 100%
                  </div>
                  <div className="text-slate-500">Unbiased Reviews</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-slate-200/80 dark:border-slate-800 transition-all hover:shadow-2xl">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Featured Flagship Killer
                  </span>
                  <span>{featuredPhone.releaseDate}</span>
                </div>

                {/* Hero Phone Showcase */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-5 group">
                  <img
                    src={featuredPhone.image}
                    alt={featuredPhone.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-white/80 text-xs uppercase tracking-wider font-semibold">
                      {featuredPhone.brand}
                    </span>
                    <h3 className="text-white font-heading font-bold text-2xl">
                      {featuredPhone.name}
                    </h3>
                  </div>
                </div>

                {/* Quick specs pill grid */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Display</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {featuredPhone.quickSpecs.display}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Processor</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      Dimensity 8200 Ultimate
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Gaming</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      90 FPS (PUBG Tested)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Price</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">
                      {featuredPhone.price.bangladesh}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('mobile-detail', featuredPhone.slug)}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Specs & Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      addToComparison(featuredPhone.slug);
                      navigateTo('compare');
                    }}
                    className="p-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-medium transition-colors"
                    title="Compare this phone"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Review & YouTube Spotlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left video preview */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video border border-slate-800 group">
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?rel=0`}
                  title={featuredVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right text info */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>Featured Video Review · Tech With Munshi</span>
              </div>

              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                {featuredVideo.title}
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                {featuredVideo.description} We thoroughly examine display brightness, Dimensity 8200 Ultimate 90 FPS gaming stability, bypass charging, and everyday camera quality.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('mobile-detail', 'infinix-gt-30')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Read Written Specs & Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Subscribe to Channel</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Mobile Phones Section (#9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
              Mobile Database
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Latest Mobile Phones
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Detailed specifications, real testing results, and dual-currency prices.
            </p>
          </div>

          <button
            onClick={() => navigateTo('mobiles')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Browse All Phones</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Phone cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestPhones.map(phone => (
            <div
              key={phone.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Phone Image Container */}
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={phone.image}
                  alt={phone.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {phone.badge && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {phone.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded-md">
                  {phone.brand}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {phone.name}
                  </h3>

                  {/* Spec Highlights */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-400">Display</span>
                      <span className="font-medium text-right line-clamp-1 max-w-[150px]">
                        {phone.quickSpecs.display}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-400">Processor</span>
                      <span className="font-medium text-right line-clamp-1 max-w-[150px]">
                        {phone.quickSpecs.processor.split('(')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-0.5 border-b border-slate-100 dark:border-slate-800/60">
                      <span className="text-slate-400">Battery</span>
                      <span className="font-medium">
                        {phone.quickSpecs.battery} · {phone.quickSpecs.charging}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <span className="text-slate-400">Memory</span>
                      <span className="font-medium">
                        {phone.quickSpecs.ram} + {phone.quickSpecs.storage}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Bangladesh
                      </span>
                      <span className="font-heading font-bold text-sm text-blue-600 dark:text-blue-400">
                        {phone.price.bangladesh}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">
                        Saudi Arabia
                      </span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {phone.price.saudi}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => navigateTo('mobile-detail', phone.slug)}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => {
                        addToComparison(phone.slug);
                        navigateTo('compare');
                      }}
                      className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
                      title="Compare phone"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Guides Section (#25) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
              Knowledge Hub
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              Tech Guides & Explanations
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Master phone specs, debunk marketing gimmicks, and pick the right hardware.
            </p>
          </div>

          <button
            onClick={() => navigateTo('guides')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.slice(0, 3).map(guide => (
            <div
              key={guide.id}
              onClick={() => navigateTo('guides', guide.slug)}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{guide.readTime}</span>
                  <span>{guide.date}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Philosophy / About Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              About The Creator
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              MD Naeem Hossin — Tech With Munshi
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              "My mission with Tech With Munshi is simple: bridge the gap between fast-paced YouTube tech reviews and deep, verifiable website spec sheets. When you watch a review on our channel, you can immediately come here to compare benchmarks, check actual retail prices in Bangladesh and Saudi Arabia, and make a confident decision."
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity"
              >
                Learn More About Munshi
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Business Collaboration →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
