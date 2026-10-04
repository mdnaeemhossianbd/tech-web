import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Youtube,
  Play,
  Users,
  Eye,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { SocialShare } from '../components/SocialShare';
import type { VideoItem } from '../types';

export const VideosView: React.FC = () => {
  const { navigateTo, videos } = useApp();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activePlayingVideo, setActivePlayingVideo] = useState<VideoItem | null>(null);

  const allVideos = videos;
  const types = ['all', 'Review', 'Gaming Test', 'Comparison', 'Unboxing', 'Guide'];

  const featuredVideo = allVideos.find(v => v.featured) || allVideos[0];

  const filteredVideos =
    selectedType === 'all'
      ? allVideos
      : allVideos.filter(v => v.type.toLowerCase() === selectedType.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Channel Header Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white text-red-600 shadow-md flex items-center justify-center shrink-0">
              <Youtube className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  Tech With Munshi
                </h1>
                <CheckCircle2 className="w-5 h-5 text-white/90" />
              </div>
              <p className="text-white/80 text-xs sm:text-sm mt-0.5">
                Official YouTube Hub · Hosted by MD Naeem Hossin
              </p>
              <div className="flex items-center gap-3 text-xs text-white/90 mt-2">
                <span>100K+ Subscribers</span>
                <span>·</span>
                <span>250+ Videos</span>
                <span>·</span>
                <span>4.8M Views</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-white text-red-600 hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Youtube className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Video Spotlight */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Featured Video Spotlight</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video">
              <iframe
                className="w-full h-full object-cover"
                src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}?rel=0`}
                title={featuredVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded uppercase">
              {featuredVideo.type}
            </span>
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
              {featuredVideo.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {featuredVideo.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {featuredVideo.views}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {featuredVideo.uploadDate}
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              {featuredVideo.linkedPhoneSlug ? (
                <button
                  onClick={() => navigateTo('mobile-detail', featuredVideo.linkedPhoneSlug)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Read Written Specs for this Phone</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : <div />}

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Share:</span>
                <SocialShare
                  title={featuredVideo.title}
                  url={`https://youtube.com/watch?v=${featuredVideo.youtubeId}`}
                  description={featuredVideo.description}
                  compact={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Filter and Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              All Videos & Tests
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a category to filter through unboxings, FPS tests, and camera comparisons.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                  selectedType === t
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {t === 'all' ? 'All Types' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div
                  onClick={() => setActivePlayingVideo(video)}
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold uppercase">
                      {video.type}
                    </span>
                    <span>{video.uploadDate}</span>
                  </div>

                  <h3
                    onClick={() => setActivePlayingVideo(video)}
                    className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 cursor-pointer transition-colors line-clamp-2"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Card Footer & Share */}
              <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{video.views}</span>
                  {video.linkedPhoneSlug && (
                    <button
                      onClick={() => navigateTo('mobile-detail', video.linkedPhoneSlug)}
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View Phone Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-slate-800/40 text-[11px] text-slate-400">
                  <span>Share:</span>
                  <SocialShare
                    title={video.title}
                    url={`https://youtube.com/watch?v=${video.youtubeId}`}
                    description={video.description}
                    compact={true}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Player Modal */}
      {activePlayingVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePlayingVideo(null)}
        >
          <div
            className="w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activePlayingVideo.youtubeId}?autoplay=1&rel=0`}
                title={activePlayingVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
              <span className="font-heading font-semibold line-clamp-1 max-w-md">
                {activePlayingVideo.title}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                <SocialShare
                  title={activePlayingVideo.title}
                  url={`https://youtube.com/watch?v=${activePlayingVideo.youtubeId}`}
                  description={activePlayingVideo.description}
                  compact={true}
                />
                <button
                  onClick={() => setActivePlayingVideo(null)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs"
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
