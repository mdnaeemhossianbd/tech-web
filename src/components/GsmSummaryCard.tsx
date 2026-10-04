import React, { useState } from 'react';
import {
  Calendar,
  Smartphone,
  Layers,
  HardDrive,
  Cpu,
  Battery,
  Camera,
  Share2,
  Heart,
  TrendingUp,
  Zap,
  Check,
  Link2,
  MessageCircle,
  Send,
  X
} from 'lucide-react';
import type { MobilePhone } from '../types';

interface GsmSummaryCardProps {
  phone: MobilePhone;
  className?: string;
  onShareClick?: () => void;
}

export const GsmSummaryCard: React.FC<GsmSummaryCardProps> = ({
  phone,
  className = '',
  onShareClick,
}) => {
  // Fan state persisted in localStorage
  const fanStorageKey = `twm_fan_${phone.id || phone.slug}`;
  const [isFan, setIsFan] = useState<boolean>(() => {
    return localStorage.getItem(fanStorageKey) === 'true';
  });
  const [fanCount, setFanCount] = useState<number>(() => {
    const base = phone.misc?.fans || 28;
    return localStorage.getItem(fanStorageKey) === 'true' ? base + 1 : base;
  });

  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleFan = () => {
    if (isFan) {
      setIsFan(false);
      setFanCount(prev => Math.max(1, prev - 1));
      localStorage.removeItem(fanStorageKey);
    } else {
      setIsFan(true);
      setFanCount(prev => prev + 1);
      localStorage.setItem(fanStorageKey, 'true');
    }
  };

  const handleShare = () => {
    if (onShareClick) {
      onShareClick();
      return;
    }
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: `${phone.name} — Full Specifications & Review`,
          text: `Check out full specs, benchmarks, and prices for ${phone.name} on Tech With Munshi!`,
          url: window.location.href,
        })
        .catch(() => {
          setShareModalOpen(true);
        });
    } else {
      setShareModalOpen(true);
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${phone.name} — Full Specifications, Price & Review | Tech With Munshi`;

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract display size (e.g. 6.78")
  const displaySize =
    phone.display?.size?.match(/\d+(\.\d+)?["']?/)?.[0] ||
    phone.quickSpecs?.display?.match(/\d+(\.\d+)?["']?/)?.[0] ||
    '6.78"';

  // Extract display resolution
  const displayRes =
    phone.display?.resolution?.split(',')[0] ||
    phone.display?.resolution ||
    '1080x2436 pixels';

  // Extract camera MP
  const cameraMp =
    phone.mainCamera?.single ||
    phone.mainCamera?.setup?.split(',')[0] ||
    phone.camera?.rear?.split(',')[0] ||
    '108MP';

  // Extract camera video
  const cameraVideo =
    phone.mainCamera?.video?.split(',')[0] ||
    phone.camera?.video?.split(',')[0] ||
    '4K Video';

  // Extract RAM & Chipset
  const ramText =
    phone.memory?.ram ||
    phone.quickSpecs?.ram?.split(' ')[0] ||
    '12GB RAM';

  const chipsetShort =
    phone.platform?.chipset?.split('(')[0]?.trim() ||
    phone.performance?.chipset?.split('(')[0]?.trim() ||
    'Dimensity 8200';

  // Extract Battery & Charging
  const batteryCap =
    phone.battery?.capacity?.split(' ')[0] ||
    phone.quickSpecs?.battery?.split(' ')[0] ||
    '5000mAh';

  const chargingSpeed =
    phone.battery?.charging?.match(/\d+W/i)?.[0] ||
    phone.quickSpecs?.charging?.match(/\d+W/i)?.[0] ||
    '45W';

  // Thickness extract from dimensions (e.g. 164 x 75.4 x 8.1 mm -> 8.1mm)
  const thicknessMatch = phone.body?.dimensions?.match(/\d+(\.\d+)?\s*mm/gi);
  const thicknessText = thicknessMatch && thicknessMatch.length > 0
    ? thicknessMatch[thicknessMatch.length - 1]
    : '8.2mm thickness';

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-emerald-900/30 dark:border-emerald-700/30 bg-gradient-to-br from-[#9db69f] via-[#91ad94] to-[#7f9e83] dark:from-[#1b2a20] dark:via-[#16231a] dark:to-[#0f1712] text-slate-900 dark:text-slate-100 shadow-xl transition-all ${className}`}
    >
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: Phone Name & Share Icon */}
      <div className="px-5 sm:px-8 pt-5 sm:pt-6 pb-3 flex items-center justify-between border-b border-black/10 dark:border-white/10">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight drop-shadow-xs">
          {phone.name}
        </h2>

        <button
          onClick={handleShare}
          className="p-2 sm:p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-xs transition-transform active:scale-95 shadow-xs"
          title="Share phone specs"
          aria-label="Share this phone"
        >
          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* MIDDLE SECTION: Photo + Released & Dimensions + Stats & Fan counter */}
      <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Phone Image Cutout */}
        <div className="md:col-span-4 flex items-center justify-center">
          <div className="relative group max-w-[200px] sm:max-w-[220px]">
            <img
              src={phone.image}
              alt={phone.name}
              className="w-full h-auto object-contain max-h-64 sm:max-h-72 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />
            {phone.badge && (
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                {phone.badge}
              </span>
            )}
          </div>
        </div>

        {/* Middle Column: Key Spec Overview List */}
        <div className="md:col-span-5 space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-emerald-950 dark:text-emerald-400 shrink-0" />
            <span>
              Released {phone.releaseDate || '2026, Latest Market Edition'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Smartphone className="w-4 h-4 text-emerald-950 dark:text-emerald-400 shrink-0" />
            <span>
              {phone.body?.weight || '210g'}, {thicknessText}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-4 text-center font-mono font-bold text-emerald-950 dark:text-emerald-400 text-xs shrink-0">
              ‹›
            </span>
            <span>
              {phone.software?.os || 'Android 15'}
              {phone.software?.ui ? `, ${phone.software.ui}` : ''}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <HardDrive className="w-4 h-4 text-emerald-950 dark:text-emerald-400 shrink-0" />
            <span>
              {phone.memory?.storage || '128GB/256GB'} storage,{' '}
              {phone.memory?.cardSlot || phone.memory?.cardSupport || 'microSDXC'}
            </span>
          </div>
        </div>

        {/* Right Column: Hits & Become A Fan */}
        <div className="md:col-span-3 flex flex-row md:flex-col items-center justify-around md:justify-center gap-4 md:border-l border-black/10 dark:border-white/10 md:pl-6 py-2">
          {/* Hits Counter */}
          <div className="text-center md:text-left space-y-0.5">
            <div className="flex items-center gap-1.5 font-heading font-extrabold text-xl sm:text-2xl text-white">
              <TrendingUp className="w-5 h-5 text-white/90" />
              <span>{phone.misc?.popularity || '~ 7.5%'}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-white/80 font-bold uppercase tracking-wider block">
              {phone.misc?.hits || '847,860 HITS'}
            </span>
          </div>

          {/* Become a Fan Button */}
          <button
            onClick={toggleFan}
            className={`w-full max-w-[170px] px-3.5 py-2 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm ${
              isFan
                ? 'bg-rose-500 text-white font-bold scale-102 ring-2 ring-white/50'
                : 'bg-white/20 hover:bg-white/30 text-white font-semibold'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFan ? 'fill-current text-white' : 'text-white'}`} />
            <div>
              <div className="font-heading font-extrabold text-xs sm:text-sm leading-none">
                {fanCount}
              </div>
              <span className="text-[9px] uppercase tracking-wider font-bold block mt-0.5">
                {isFan ? 'FAN OF THIS' : 'BECOME A FAN'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* BOTTOM SECTION: 4 BIG SPEC TILES */}
      <div className="border-t border-black/10 dark:border-white/10 bg-black/10 dark:bg-black/25 px-4 sm:px-8 py-4 sm:py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Tile 1: Display */}
        <div className="flex items-start gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/20 text-white shrink-0">
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-extrabold text-base sm:text-xl text-white leading-tight">
              {displaySize}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
              {displayRes}
            </div>
          </div>
        </div>

        {/* Tile 2: Camera */}
        <div className="flex items-start gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/20 text-white shrink-0">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-extrabold text-base sm:text-xl text-white leading-tight flex items-center gap-1">
              <span>{cameraMp}</span>
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
              {cameraVideo}
            </div>
          </div>
        </div>

        {/* Tile 3: Performance */}
        <div className="flex items-start gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/20 text-white shrink-0">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-extrabold text-base sm:text-xl text-white leading-tight">
              {ramText}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5">
              {chipsetShort}
            </div>
          </div>
        </div>

        {/* Tile 4: Battery */}
        <div className="flex items-start gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-white/20 text-white shrink-0">
            <Battery className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="font-heading font-extrabold text-base sm:text-xl text-white leading-tight">
              {batteryCap}
            </div>
            <div className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5 flex items-center gap-0.5">
              <Zap className="w-3 h-3 text-amber-300 fill-current" />
              <span>{chargingSpeed}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SHARE MODAL */}
      {shareModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Share {phone.name}</span>
              </h3>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-2"
              >
                <span className="font-bold font-heading">f</span>
                <span>Facebook</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2"
              >
                <span className="font-mono font-bold">𝕏</span>
                <span>Twitter / X</span>
              </a>

              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 font-semibold flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>
            </div>

            <button
              onClick={copyLink}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Link Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4" />
                  <span>Copy Page Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
