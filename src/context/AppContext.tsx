import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, MobilePhone, ReviewItem, GuideItem, VideoItem } from '../types';
import en from '../locales/en.json';
import bn from '../locales/bn.json';
import ar from '../locales/ar.json';
import es from '../locales/es.json';
import initialMobiles from '../data/mobiles.json';
import initialReviews from '../data/reviews.json';
import initialGuides from '../data/guides.json';
import initialVideos from '../data/videos.json';

const translations: Record<Language, any> = { en, bn, ar, es };

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
  isRtl: boolean;
  openSearch: boolean;
  setOpenSearch: (open: boolean) => void;
  openAiAssistant: boolean;
  setOpenAiAssistant: (open: boolean) => void;
  activeView: string;
  navigateTo: (view: string, param?: string) => void;
  currentParam?: string;
  comparisonList: string[];
  addToComparison: (slug: string) => void;
  removeFromComparison: (slug: string) => void;
  clearComparison: () => void;

  // Admin authentication & Database management
  isAdminLoggedIn: boolean;
  adminLogin: (user: string, pass: string) => boolean;
  adminLogout: () => void;
  mobiles: MobilePhone[];
  addMobile: (phone: MobilePhone) => void;
  updateMobile: (phone: MobilePhone) => void;
  deleteMobile: (idOrSlug: string) => void;
  resetMobilesToDefault: () => void;

  // Reviews, Guides, & Videos dynamic management
  reviews: ReviewItem[];
  addReview: (review: ReviewItem) => void;
  deleteReview: (idOrSlug: string) => void;
  guides: GuideItem[];
  addGuide: (guide: GuideItem) => void;
  deleteGuide: (idOrSlug: string) => void;
  videos: VideoItem[];
  addVideo: (video: VideoItem) => void;
  deleteVideo: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('twm_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Language state
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('twm_lang') as Language;
    if (saved && ['en', 'bn', 'ar', 'es'].includes(saved)) return saved;
    return 'en';
  });

  // Routing state
  const [activeView, setActiveView] = useState<string>('home');
  const [currentParam, setCurrentParam] = useState<string | undefined>('infinix-gt-30');

  // Search and AI Assistant state
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openAiAssistant, setOpenAiAssistant] = useState<boolean>(false);

  // Phone comparison state (default starts with Infinix GT 30 and Samsung Galaxy A55)
  const [comparisonList, setComparisonList] = useState<string[]>(['infinix-gt-30', 'samsung-galaxy-a55']);

  // Admin State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('twm_admin_session') === 'true';
  });

  // Dynamic Mobiles Database State (persisted in localStorage)
  const [mobiles, setMobiles] = useState<MobilePhone[]>(() => {
    try {
      const saved = localStorage.getItem('twm_custom_mobiles');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved mobiles from localStorage', e);
    }
    return initialMobiles as unknown as MobilePhone[];
  });

  // Sync custom mobiles to localStorage
  useEffect(() => {
    localStorage.setItem('twm_custom_mobiles', JSON.stringify(mobiles));
  }, [mobiles]);

  const adminLogin = (user: string, pass: string): boolean => {
    const cleanUser = user.trim().toLowerCase();
    const cleanPass = pass.trim();
    // Support admin or munshi with password munshi2026 or admin123
    if (
      (cleanUser === 'admin' || cleanUser === 'munshi' || cleanUser === 'naeem') &&
      (cleanPass === 'munshi2026' || cleanPass === 'admin123' || cleanPass === 'admin')
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('twm_admin_session', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('twm_admin_session');
  };

  const addMobile = (newPhone: MobilePhone) => {
    setMobiles(prev => [newPhone, ...prev]);
  };

  const updateMobile = (updatedPhone: MobilePhone) => {
    setMobiles(prev =>
      prev.map(p => (p.id === updatedPhone.id || p.slug === updatedPhone.slug ? updatedPhone : p))
    );
  };

  const deleteMobile = (idOrSlug: string) => {
    setMobiles(prev => prev.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug));
  };

  const resetMobilesToDefault = () => {
    setMobiles(initialMobiles as unknown as MobilePhone[]);
    localStorage.removeItem('twm_custom_mobiles');
  };

  // Dynamic Reviews State
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('twm_custom_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialReviews as unknown as ReviewItem[];
  });

  useEffect(() => {
    localStorage.setItem('twm_custom_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (newReview: ReviewItem) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (idOrSlug: string) => {
    setReviews(prev => prev.filter(r => r.id !== idOrSlug && r.slug !== idOrSlug));
  };

  // Dynamic Guides State
  const [guides, setGuides] = useState<GuideItem[]>(() => {
    try {
      const saved = localStorage.getItem('twm_custom_guides');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialGuides as unknown as GuideItem[];
  });

  useEffect(() => {
    localStorage.setItem('twm_custom_guides', JSON.stringify(guides));
  }, [guides]);

  const addGuide = (newGuide: GuideItem) => {
    setGuides(prev => [newGuide, ...prev]);
  };

  const deleteGuide = (idOrSlug: string) => {
    setGuides(prev => prev.filter(g => g.id !== idOrSlug && g.slug !== idOrSlug));
  };

  // Dynamic Videos State (synced with localStorage)
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('twm_custom_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialVideos as unknown as VideoItem[];
  });

  useEffect(() => {
    localStorage.setItem('twm_custom_videos', JSON.stringify(videos));
  }, [videos]);

  const addVideo = (newVideo: VideoItem) => {
    setVideos(prev => [newVideo, ...prev]);
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id && v.youtubeId !== id));
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('twm_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('twm_lang', lang);
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRtl]);

  // Handle URL hash routing if present
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const parts = hash.split('/').filter(Boolean);
      if (parts.length === 0 || parts[0] === 'home') {
        setActiveView('home');
        setCurrentParam(undefined);
      } else if (parts[0] === 'mobile' && parts[1]) {
        setActiveView('mobile-detail');
        setCurrentParam(parts[1]);
      } else if (parts[0] === 'mobiles') {
        setActiveView('mobiles');
        setCurrentParam(undefined);
      } else if (parts[0] === 'compare') {
        setActiveView('compare');
        if (parts[1]) {
          const phones = parts[1].split('-vs-');
          if (phones.length > 0) setComparisonList(phones);
        }
      } else if (parts[0] === 'reviews') {
        setActiveView('reviews');
        setCurrentParam(parts[1]);
      } else if (parts[0] === 'videos') {
        setActiveView('videos');
        setCurrentParam(undefined);
      } else if (parts[0] === 'guides') {
        setActiveView('guides');
        setCurrentParam(parts[1]);
      } else if (parts[0] === 'about') {
        setActiveView('about');
        setCurrentParam(undefined);
      } else if (parts[0] === 'contact') {
        setActiveView('contact');
        setCurrentParam(undefined);
      } else if (parts[0] === 'admin') {
        setActiveView('admin');
        setCurrentParam(undefined);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigateTo = (view: string, param?: string) => {
    setActiveView(view);
    setCurrentParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update hash for friendly back/forward navigation and SEO URLs
    if (view === 'home') {
      window.location.hash = '#/';
    } else if (view === 'mobile-detail' && param) {
      window.location.hash = `#/mobile/${param}`;
    } else if (view === 'compare') {
      window.location.hash = `#/compare`;
    } else if (view === 'reviews') {
      window.location.hash = param ? `#/reviews/${param}` : `#/reviews`;
    } else if (view === 'guides') {
      window.location.hash = param ? `#/guides/${param}` : `#/guides`;
    } else {
      window.location.hash = `#/${view}`;
    }
  };

  // Comparison list functions
  const addToComparison = (slug: string) => {
    if (!comparisonList.includes(slug) && comparisonList.length < 3) {
      setComparisonList([...comparisonList, slug]);
    }
  };

  const removeFromComparison = (slug: string) => {
    setComparisonList(comparisonList.filter(s => s !== slug));
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  // Translation helper function
  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current = translations[language] || translations.en;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallbackVal: any = translations.en;
        for (const fKey of keys) {
          if (fallbackVal && typeof fallbackVal === 'object' && fKey in fallbackVal) {
            fallbackVal = fallbackVal[fKey];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackVal === 'string' ? fallbackVal : fallback || path;
      }
    }
    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        t,
        isRtl,
        openSearch,
        setOpenSearch,
        openAiAssistant,
        setOpenAiAssistant,
        activeView,
        navigateTo,
        currentParam,
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        mobiles,
        addMobile,
        updateMobile,
        deleteMobile,
        resetMobilesToDefault,
        reviews,
        addReview,
        deleteReview,
        guides,
        addGuide,
        deleteGuide,
        videos,
        addVideo,
        deleteVideo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
