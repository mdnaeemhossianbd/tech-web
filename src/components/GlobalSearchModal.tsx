import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Smartphone, FileText, PlaySquare, BookOpen, ArrowRight } from 'lucide-react';
export const GlobalSearchModal: React.FC = () => {
  const { openSearch, setOpenSearch, navigateTo, addToComparison, mobiles, reviews, videos, guides } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpenSearch(!openSearch);
      }
      if (e.key === 'Escape' && openSearch) {
        setOpenSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openSearch, setOpenSearch]);

  useEffect(() => {
    if (openSearch) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [openSearch]);

  if (!openSearch) return null;

  const trimmed = query.trim().toLowerCase();

  // Search in mobiles
  const matchedPhones = trimmed
    ? mobiles.filter(
        p =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.quickSpecs.processor.toLowerCase().includes(trimmed) ||
          p.quickSpecs.display.toLowerCase().includes(trimmed)
      )
    : mobiles.slice(0, 3); // show popular phones by default

  // Search in reviews
  const matchedReviews = trimmed
    ? reviews.filter(
        r =>
          r.title.toLowerCase().includes(trimmed) ||
          r.category.toLowerCase().includes(trimmed) ||
          r.shortDescription.toLowerCase().includes(trimmed)
      )
    : reviews.slice(0, 2);

  // Search in videos
  const matchedVideos = trimmed
    ? videos.filter(
        v =>
          v.title.toLowerCase().includes(trimmed) ||
          v.type.toLowerCase().includes(trimmed) ||
          v.description.toLowerCase().includes(trimmed)
      )
    : videos.slice(0, 2);

  // Search in guides
  const matchedGuides = trimmed
    ? guides.filter(
        g =>
          g.title.toLowerCase().includes(trimmed) ||
          g.summary.toLowerCase().includes(trimmed)
      )
    : guides.slice(0, 2);

  const totalResults =
    matchedPhones.length +
    matchedReviews.length +
    matchedVideos.length +
    matchedGuides.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 md:p-20">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search phones, specs, reviews, videos, guides (e.g. GT 30, AMOLED, Gaming)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {totalResults === 0 && (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Infinix GT 30", "Samsung A55", or "AMOLED"</p>
            </div>
          )}

          {/* Mobiles Result Section */}
          {matchedPhones.length > 0 && (
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-500" /> Mobile Phones ({matchedPhones.length})
                </span>
                {trimmed && (
                  <button
                    onClick={() => {
                      navigateTo('mobiles');
                      setOpenSearch(false);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5"
                  >
                    View All <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
              <div className="space-y-1.5">
                {matchedPhones.map(phone => (
                  <div
                    key={phone.id}
                    onClick={() => {
                      navigateTo('mobile-detail', phone.slug);
                      setOpenSearch(false);
                    }}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={phone.image}
                        alt={phone.name}
                        className="w-10 h-10 object-cover rounded-lg bg-slate-100 dark:bg-slate-800"
                        loading="lazy"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {phone.name}
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            {phone.brand}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                          {phone.quickSpecs.display} · {phone.quickSpecs.processor} · {phone.quickSpecs.battery}
                        </p>
                      </div>
                    </div>
                    <div className="text-right pl-3">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                        {phone.price.bangladesh}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {phone.price.saudi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Result Section */}
          {matchedReviews.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-500" /> In-Depth Reviews
              </div>
              <div className="space-y-1.5">
                {matchedReviews.map(review => (
                  <div
                    key={review.id}
                    onClick={() => {
                      navigateTo('reviews', review.slug);
                      setOpenSearch(false);
                    }}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <img
                      src={review.image}
                      alt={review.title}
                      className="w-12 h-10 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {review.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {review.category} · {review.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos Result Section */}
          {matchedVideos.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <PlaySquare className="w-3.5 h-3.5 text-red-500" /> YouTube Videos & Tests
              </div>
              <div className="space-y-1.5">
                {matchedVideos.map(video => (
                  <div
                    key={video.id}
                    onClick={() => {
                      navigateTo('videos');
                      setOpenSearch(false);
                    }}
                    className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[9px] text-white px-1 rounded font-mono">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {video.type} · {video.views}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Guides Result Section */}
          {matchedGuides.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Tech Guides
              </div>
              <div className="space-y-1.5">
                {matchedGuides.map(guide => (
                  <div
                    key={guide.id}
                    onClick={() => {
                      navigateTo('guides', guide.slug);
                      setOpenSearch(false);
                    }}
                    className="group p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {guide.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {guide.readTime} · {guide.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span>Tech With Munshi Instant Search</span>
          </div>
          <button
            onClick={() => setOpenSearch(false)}
            className="hover:text-slate-600 dark:hover:text-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
