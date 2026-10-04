import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Youtube, ArrowRight, Star, Clock, User, Filter, X } from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import type { ReviewItem } from '../types';

export const ReviewsView: React.FC = () => {
  const { reviews, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeReviewModal, setActiveReviewModal] = useState<ReviewItem | null>(null);

  const allReviews = reviews;

  const categories = [
    'all',
    'Smartphone Reviews',
    'Laptops',
    'Gadgets',
    'Accessories',
    'AI Tools',
    'Tech Products',
  ];

  const filteredReviews =
    selectedCategory === 'all'
      ? allReviews
      : allReviews.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">
          Editorial & Lab Tests
        </div>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          In-Depth Tech Reviews
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
          Unbiased, real-world evaluations of smartphones, laptops, audio gear, and productivity AI tools tested by MD Naeem Hossin.
        </p>
      </div>

      {/* Category Pills (#23) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-colors capitalize font-medium ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat === 'all' ? 'All Reviews' : cat}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map(review => (
          <div
            key={review.id}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image */}
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <img
                  src={review.image}
                  alt={review.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-md">
                  {review.category}
                </span>
                {review.score && (
                  <span className="absolute top-3 right-3 bg-blue-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> {review.score}/10
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {review.readTime}
                  </span>
                  <span>·</span>
                  <span>{review.date}</span>
                </div>

                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {review.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {review.shortDescription}
                </p>
              </div>
            </div>

            {/* Footer Buttons & Social Share */}
            <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-3 mt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (review.linkedPhoneSlug) {
                      navigateTo('mobile-detail', review.linkedPhoneSlug);
                    } else {
                      setActiveReviewModal(review);
                    }
                  }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Read Review</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {review.youtubeVideoId && (
                  <button
                    onClick={() => navigateTo('videos')}
                    className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 rounded-xl transition-colors"
                    title="Watch Video Review"
                  >
                    <Youtube className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Social Media Sharing */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span className="font-medium">Share:</span>
                <SocialShare
                  title={review.title}
                  description={review.shortDescription}
                  compact={true}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Review Modal */}
      {activeReviewModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveReviewModal(null)}
        >
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {activeReviewModal.category}
              </span>
              <button
                onClick={() => setActiveReviewModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {activeReviewModal.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span>By {activeReviewModal.author}</span>
              <span>·</span>
              <span>{activeReviewModal.date}</span>
              <span>·</span>
              <span>{activeReviewModal.readTime}</span>
            </div>

            <div className="h-60 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={activeReviewModal.image}
                alt={activeReviewModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
              {activeReviewModal.content.map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">Share this article:</span>
                <SocialShare
                  title={activeReviewModal.title}
                  description={activeReviewModal.shortDescription}
                />
              </div>
              <button
                onClick={() => setActiveReviewModal(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
