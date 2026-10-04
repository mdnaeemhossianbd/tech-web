import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Clock, Calendar, ArrowRight, Smartphone, Youtube, X } from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import type { GuideItem } from '../types';

export const GuidesView: React.FC = () => {
  const { guides, mobiles, currentParam, navigateTo } = useApp();
  const [selectedGuideModal, setSelectedGuideModal] = useState<GuideItem | null>(null);

  // If a guide slug was navigated to via hash
  const activeGuide = currentParam ? guides.find(g => g.slug === currentParam) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          Knowledge Base
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Tech Guides & Buying Advice
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Clear, jargon-free explanations to help you choose the right smartphone, understand hardware architectures, and save money.
        </p>
      </div>

      {/* If an active guide is selected directly */}
      {activeGuide ? (
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-8">
          <button
            onClick={() => navigateTo('guides')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            ← Back to all guides
          </button>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {activeGuide.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {activeGuide.date}
              </span>
              <span>·</span>
              <span>By MD Naeem Hossin</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight">
              {activeGuide.title}
            </h1>
            <div className="pt-3 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs text-slate-500 font-medium">Share this tech guide:</span>
              <SocialShare
                title={activeGuide.title}
                description={activeGuide.summary}
              />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-21/9 bg-slate-100 dark:bg-slate-800">
            <img
              src={activeGuide.featuredImage}
              alt={activeGuide.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {activeGuide.summary}
          </div>

          {/* Guide Sections */}
          <div className="space-y-6 pt-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeGuide.sections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  {sec.heading}
                </h3>
                <p>{sec.content}</p>
              </div>
            ))}
          </div>

          {/* Related Products Section (#25) */}
          {activeGuide.relatedProductSlugs.length > 0 && (
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-blue-600" /> Phones Mentioned in this Guide
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activeGuide.relatedProductSlugs.map(slug => {
                  const p = mobiles.find(m => m.slug === slug);
                  if (!p) return null;
                  return (
                    <div
                      key={p.id}
                      onClick={() => navigateTo('mobile-detail', p.slug)}
                      className="group p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer transition-colors flex items-center gap-3"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600">
                          {p.name}
                        </h4>
                        <span className="text-[11px] text-blue-600 font-semibold">
                          {p.price.bangladesh}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      ) : (
        /* Grid of all guides */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map(guide => (
            <div
              key={guide.id}
              onClick={() => navigateTo('guides', guide.slug)}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={guide.featuredImage}
                    alt={guide.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-md">
                    Tech Guide
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {guide.readTime}
                    </span>
                    <span>·</span>
                    <span>{guide.date}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {guide.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-50 dark:border-slate-800/40">
                  <span>Share:</span>
                  <SocialShare
                    title={guide.title}
                    description={guide.summary}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
