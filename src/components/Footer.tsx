import React from 'react';
import { useApp } from '../context/AppContext';
import { Youtube, Facebook, Instagram, Share2, ShieldCheck, Mail, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md font-heading font-black text-sm">
                TWM
              </div>
              <div>
                <span className="font-heading font-bold text-lg text-white tracking-tight">
                  Tech With Munshi
                </span>
                <p className="text-xs text-blue-400 font-medium tracking-wide">
                  Technology Made Simple.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The official technology platform by <strong>MD Naeem Hossin</strong>. Combining rigorous studio testing, real-world gaming benchmarks, honest mobile reviews, and in-depth video coverage for tech lovers across Bangladesh, Saudi Arabia, and beyond.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                title="YouTube"
                aria-label="YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                title="Facebook"
                aria-label="Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                title="Instagram"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                title="TikTok"
                aria-label="TikTok"
              >
                <span className="text-xs font-bold font-mono">TT</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mobiles')}
                  className="hover:text-blue-400 transition-colors"
                >
                  All Mobiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('compare')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Compare Phones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('reviews')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('videos')}
                  className="hover:text-blue-400 transition-colors"
                >
                  YouTube Videos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('guides')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Tech Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Top Devices */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-3">
              Featured Devices
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('mobile-detail', 'infinix-gt-30')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Infinix GT 30 Review
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mobile-detail', 'samsung-galaxy-a55')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Samsung Galaxy A55 5G
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mobile-detail', 'redmi-note-13-pro-plus')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Redmi Note 13 Pro+ 5G
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mobile-detail', 'realme-gt-6t')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Realme GT 6T 5G
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('mobile-detail', 'poco-x6-pro')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Poco X6 Pro 5G
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Editorial Policy */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-white tracking-wider uppercase mb-3">
              About & Trust
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About MD Naeem Hossin
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Business & Review Collabs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('admin')}
                  className="hover:text-blue-400 transition-colors text-amber-400/90 font-medium flex items-center gap-1.5"
                >
                  <span>🔐 Admin Login</span>
                </button>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Editorial Independence
                </span>
              </li>
            </ul>

            <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-400">
              <strong>Monetization Disclosure:</strong> Future links may include verified merchant affiliate channels at no additional cost to you.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Tech With Munshi. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Designed & Maintained by MD Naeem Hossin</span>
            <span>·</span>
            <span>Technology Made Simple</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
