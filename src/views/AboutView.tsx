import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Youtube,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Smartphone,
  Sparkles,
  ArrowRight,
  Mail,
  Award
} from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-12">
      {/* Profile Bio Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 shrink-0">
            <span className="font-heading font-black text-3xl sm:text-4xl">TWM</span>
          </div>

          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-4 h-4" /> Tech Creator & Reviewer
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              MD NAEEM HOSSIN
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Founder & Chief Tech Editor, <strong>Tech With Munshi</strong>
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Youtube className="w-4 h-4" />
                <span>Visit YouTube Channel</span>
              </a>
              <button
                onClick={() => navigateTo('contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Contact for Collabs</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            Welcome to <strong>Tech With Munshi</strong>. I am <strong>MD Naeem Hossin</strong>, a passionate technology content creator, mobile hardware reviewer, and consumer advocate.
          </p>
          <p>
            Over the years of creating video content for YouTube, I observed a common dilemma: viewers loved watching visual smartphone reviews, but when it came time to actually purchase a device, they struggled to find clear, unmanipulated technical specifications, honest thermal throttling figures, and verified retail pricing for regional markets like Bangladesh and Saudi Arabia.
          </p>
          <p>
            This platform was built to solve that problem. Every smartphone featured on Tech With Munshi is rigorously evaluated: from sustained 90/120 FPS gaming sessions and battery drain curves to low-light optical image stabilization tests.
          </p>
        </div>
      </div>

      {/* Core Focus Pillars */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
          What We Focus On
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-xs">
              📱
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Smartphone Deep Dives
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complete teardowns of display quality, PWM dimming, thermal dissipation chambers, and sustained gaming frame rates.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs">
              ⚖️
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Factual Comparisons
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Side-by-side matrices highlighting real hardware differences without declaring biased or sponsored "winners".
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-xs">
              🤖
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              AI Tools & Future Gadgets
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Practical guides on generative AI, smart wearables, laptops, and audio gear that enhance daily productivity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold text-xs">
              🛡️
            </div>
            <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              Editorial Independence
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We never falsify benchmark scores, accept payment to alter reviews, or hide known hardware defects from our audience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
