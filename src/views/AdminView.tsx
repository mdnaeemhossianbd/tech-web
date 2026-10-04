import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Plus,
  Edit2,
  Trash2,
  Download,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  DollarSign,
  FileText,
  Youtube,
  Search,
  X,
  Save,
  Layers,
  Sparkles,
  LogOut,
  PenTool,
  BookOpen,
  Image as ImageIcon,
  Clock,
  Star,
  Activity,
  LayoutDashboard,
  Database,
  Moon,
  Sun,
  Eye,
  Check,
  Upload
} from 'lucide-react';
import type { MobilePhone, ReviewItem, GuideItem, VideoItem } from '../types';
import { GsmSummaryCard } from '../components/GsmSummaryCard';
import { SocialShare } from '../components/SocialShare';

export const AdminView: React.FC = () => {
  const {
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
    navigateTo,
    theme,
    toggleTheme,
  } = useApp();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'create-post' | 'manage-posts' | 'mobiles' | 'prices' | 'videos' | 'export'
  >('overview');

  // Mobile modal state
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [editingPhoneId, setEditingPhoneId] = useState<string | null>(null);
  const [adminPhoneSearch, setAdminPhoneSearch] = useState('');

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Post Creator State (100% English) - 4 Supported Types
  const [postType, setPostType] = useState<'review' | 'phone' | 'video' | 'guide'>('review');

  // Review & Guide form state
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postCategory, setPostCategory] = useState('Smartphone Reviews');
  const [postImage, setPostImage] = useState(
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'
  );
  const [postAuthor, setPostAuthor] = useState('MD Naeem Hossin');
  const [postReadTime, setPostReadTime] = useState('5 min read');
  const [postScore, setPostScore] = useState<number>(9.0);
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postYoutubeId, setPostYoutubeId] = useState('');
  const [postLinkedPhone, setPostLinkedPhone] = useState('infinix-gt-30');

  // Phone Post Creator form state
  const [newPhoneBrand, setNewPhoneBrand] = useState('Infinix');
  const [newPhoneName, setNewPhoneName] = useState('');
  const [newPhoneSlug, setNewPhoneSlug] = useState('');
  const [newPhoneImage, setNewPhoneImage] = useState('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80');
  const [newPhoneSaudiPrice, setNewPhoneSaudiPrice] = useState('SAR 1,099');
  const [newPhoneBdPrice, setNewPhoneBdPrice] = useState('৳ 29,999');
  const [newPhoneGlobalUSD, setNewPhoneGlobalUSD] = useState('$280');
  const [newPhoneDisplay, setNewPhoneDisplay] = useState('6.78" 144Hz AMOLED');
  const [newPhoneChipset, setNewPhoneChipset] = useState('MediaTek Dimensity 8200 Ultimate');
  const [newPhoneRam, setNewPhoneRam] = useState('12GB LPDDR5X');
  const [newPhoneStorage, setNewPhoneStorage] = useState('256GB UFS 3.1');
  const [newPhoneBattery, setNewPhoneBattery] = useState('5000 mAh');
  const [newPhoneCharging, setNewPhoneCharging] = useState('45W Fast PD3.0');
  const [newPhoneCamera, setNewPhoneCamera] = useState('108MP OIS Triple Cam');
  const [newPhoneGamingFps, setNewPhoneGamingFps] = useState('Steady 90 FPS');
  const [newPhoneYoutubeId, setNewPhoneYoutubeId] = useState('');
  const [newPhonePros, setNewPhonePros] = useState('Smooth 144Hz screen, Solid 90 FPS gaming, Bypass charging');
  const [newPhoneCons, setNewPhoneCons] = useState('No dedicated ultra-wide lens, Polycarbonate frame');
  const [newPhoneVerdict, setNewPhoneVerdict] = useState('Outstanding gaming value for budget conscious tech enthusiasts.');

  // Full GSMArena Spec Form States
  const [phoneNetworkTech, setPhoneNetworkTech] = useState('GSM / HSPA / LTE / 5G');
  const [phoneDimensions, setPhoneDimensions] = useState('164.2 x 75.8 x 8.2 mm');
  const [phoneSim, setPhoneSim] = useState('Dual Nano-SIM (5G Dual Standby)');
  const [phoneWeight, setPhoneWeight] = useState('210 g');
  const [phoneDisplayType, setPhoneDisplayType] = useState('AMOLED, 144Hz, HDR10+, 1B colors');
  const [phoneDisplaySize, setPhoneDisplaySize] = useState('6.78 inches, 111.0 cm2');
  const [phoneDisplayResolution, setPhoneDisplayResolution] = useState('1080 x 2436 pixels, 20:9 ratio');
  const [phonePlatformOs, setPhonePlatformOs] = useState('Android 16, HiOS 16 / XOS GT');
  const [phonePlatformChipset, setPhonePlatformChipset] = useState('MediaTek Dimensity 8200 Ultimate (4 nm)');
  const [phonePlatformCpu, setPhonePlatformCpu] = useState('Octa-core (1x3.1 GHz Cortex-A78 & 3x3.0 GHz & 4x2.0 GHz)');
  const [phonePlatformGpu, setPhonePlatformGpu] = useState('Mali-G610 MC6');
  const [phoneMemoryCardSlot, setPhoneMemoryCardSlot] = useState('microSDXC (dedicated slot)');
  const [phoneMemoryInternal, setPhoneMemoryInternal] = useState('128GB 8GB RAM, 256GB 12GB RAM, UFS 3.1');
  const [phoneMainCameraSingle, setPhoneMainCameraSingle] = useState('108 MP, f/1.8 (wide), OIS + 2 MP + 2 MP');
  const [phoneMainCameraFeatures, setPhoneMainCameraFeatures] = useState('Quad-LED flash, HDR, panorama, Super Night mode');
  const [phoneMainCameraVideo, setPhoneMainCameraVideo] = useState('4K@30/60fps, 1080p@30/60/120fps');
  const [phoneSelfieCameraSingle, setPhoneSelfieCameraSingle] = useState('32 MP, f/2.5 (wide), Dual-LED flash');
  const [phoneSelfieCameraVideo, setPhoneSelfieCameraVideo] = useState('1440p@30fps, 1080p@30/60fps');
  const [phoneSoundLoudspeaker, setPhoneSoundLoudspeaker] = useState('Yes, with stereo speakers, tuned by JBL');
  const [phoneSoundJack, setPhoneSoundJack] = useState('Yes (3.5mm jack)');
  const [phoneCommsWlan, setPhoneCommsWlan] = useState('Wi-Fi 802.11 a/b/g/n/ac/6, dual-band, Wi-Fi Direct');
  const [phoneCommsBluetooth, setPhoneCommsBluetooth] = useState('5.4, A2DP, LE');
  const [phoneCommsPositioning, setPhoneCommsPositioning] = useState('GPS, GLONASS, GALILEO, BDS');
  const [phoneCommsNfc, setPhoneCommsNfc] = useState('Yes');
  const [phoneCommsRadio, setPhoneCommsRadio] = useState('FM radio');
  const [phoneCommsUsb, setPhoneCommsUsb] = useState('USB Type-C 2.0, OTG');
  const [phoneFeaturesSensors, setPhoneFeaturesSensors] = useState('Fingerprint (under display, optical), accelerometer, gyro, proximity, compass');
  const [phoneBatteryType, setPhoneBatteryType] = useState('5000 mAh, non-removable');
  const [phoneBatteryCharging, setPhoneBatteryCharging] = useState('45W wired, PD3.0, 50% in 25 min');
  const [phoneMiscColors, setPhoneMiscColors] = useState('Mecha Silver, Shadow Dark, Cyber Green');
  const [phoneMiscHits, setPhoneMiscHits] = useState('847,860 HITS');
  const [phoneMiscFans, setPhoneMiscFans] = useState(28);
  const [phoneMiscPopularity, setPhoneMiscPopularity] = useState('~ 7.5%');
  const [phoneFreeFireFps, setPhoneFreeFireFps] = useState('120 FPS');
  const [phoneGenshinFps, setPhoneGenshinFps] = useState('50-55 FPS');
  const [phoneHeating, setPhoneHeating] = useState('41.2°C peak');
  const [phoneStability, setPhoneStability] = useState('94.8%');
  const [phoneBypassCharging, setPhoneBypassCharging] = useState('Supported');

  // Photo upload handler from local device
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('Selected image exceeds 10MB limit. Please choose a smaller photo.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setter(event.target.result as string);
        showToast('Photo successfully uploaded from device!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Smartphone Post Summary state & generator
  const [newPhoneSummary, setNewPhoneSummary] = useState('');

  const generatePhoneSummary = () => {
    const summary = `${newPhoneBrand || 'Infinix'} ${newPhoneName || 'New Phone'} is equipped with a ${phoneDisplaySize} ${phoneDisplayType} display (${phoneDisplayResolution}). Driven by the ${phonePlatformChipset} SoC (${phonePlatformCpu}) running ${phonePlatformOs}, it packs ${phoneMemoryInternal} internal storage with ${phoneMemoryCardSlot} expansion. Photography features a ${phoneMainCameraSingle} rear camera (${phoneMainCameraVideo}) with ${phoneMainCameraFeatures}, plus a ${phoneSelfieCameraSingle} selfie camera. Outfitted with a ${phoneBatteryType} battery and ${phoneBatteryCharging} fast charging, it delivers ${newPhoneGamingFps} in high gaming tests. Official prices: ${newPhoneSaudiPrice} in Saudi Arabia and ${newPhoneBdPrice} in Bangladesh.`;
    setNewPhoneSummary(summary);
    if (!newPhoneVerdict) {
      setNewPhoneVerdict(summary);
    }
    showToast('Dynamic smartphone summary created!');
  };

  // Video Post Creator form state
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoYoutubeId, setNewVideoYoutubeId] = useState('');
  const [newVideoType, setNewVideoType] = useState('Review');
  const [newVideoDuration, setNewVideoDuration] = useState('16:00');
  const [newVideoViews, setNewVideoViews] = useState('120K views');
  const [newVideoUploadDate, setNewVideoUploadDate] = useState('Just now');
  const [newVideoThumbnail, setNewVideoThumbnail] = useState('');
  const [newVideoFeatured, setNewVideoFeatured] = useState(false);
  const [newVideoLinkedPhone, setNewVideoLinkedPhone] = useState('infinix-gt-30');
  const [newVideoDescription, setNewVideoDescription] = useState('');

  // Sub-tabs in Manage Posts
  const [manageSubTab, setManageSubTab] = useState<'all' | 'reviews' | 'mobiles' | 'videos' | 'guides'>('all');
  const [manageSearchQuery, setManageSearchQuery] = useState('');

  // Quick preset images for tech posts
  const presetImages = [
    {
      label: 'Cyber Gaming Phone',
      url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Minimalist Flagship',
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'OIS Camera Sensor',
      url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'Creator Laptop Setup',
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'ANC Earbuds',
      url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    },
    {
      label: 'AI Processor / Chip',
      url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  const handleTitleChange = (val: string) => {
    setPostTitle(val);
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setPostSlug(generated);
  };

  const handleNewPhoneNameChange = (val: string) => {
    setNewPhoneName(val);
    const generated = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setNewPhoneSlug(generated);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (postType === 'review') {
      if (!postTitle.trim()) {
        alert('Please provide a review title.');
        return;
      }
      const slug =
        postSlug.trim() ||
        postTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const paragraphs = postContent
        .split('\n\n')
        .map(p => p.trim())
        .filter(Boolean);

      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        slug,
        title: postTitle,
        category: postCategory,
        image: postImage,
        shortDescription: postSummary || postContent.slice(0, 160) + '...',
        author: postAuthor || 'MD Naeem Hossin',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        readTime: postReadTime,
        score: postScore,
        youtubeVideoId: postYoutubeId || undefined,
        linkedPhoneSlug: postLinkedPhone || undefined,
        content: paragraphs.length > 0 ? paragraphs : [postSummary || postTitle],
      };

      addReview(newReview);
      showToast(`Review "${postTitle}" published successfully!`);
      setPostTitle('');
      setPostSlug('');
      setPostSummary('');
      setPostContent('');
      setManageSubTab('reviews');
      setActiveTab('manage-posts');
    } else if (postType === 'phone') {
      if (!newPhoneName.trim() || !newPhoneBrand.trim()) {
        alert('Please provide smartphone brand and model name.');
        return;
      }
      const slug =
        newPhoneSlug.trim() ||
        newPhoneName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const prosArray = newPhonePros.split(',').map(s => s.trim()).filter(Boolean);
      const consArray = newPhoneCons.split(',').map(s => s.trim()).filter(Boolean);

      const completePhone: MobilePhone = {
        ...initialPhoneForm,
        id: slug,
        brand: newPhoneBrand,
        name: newPhoneName,
        slug,
        image: newPhoneImage || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
        badge: 'Verified Test',
        releaseDate: '2026',
        isPopular: true,
        isFeatured: false,
        price: {
          saudi: newPhoneSaudiPrice || 'SAR 1,099',
          bangladesh: newPhoneBdPrice || '৳ 29,999',
          globalUSD: newPhoneGlobalUSD || '$280',
        },
        quickSpecs: {
          display: `${phoneDisplaySize} ${phoneDisplayType}`,
          processor: phonePlatformChipset,
          ram: phoneMemoryInternal.includes('RAM') ? phoneMemoryInternal.split('RAM')[0].trim() : '12GB LPDDR5X',
          storage: newPhoneStorage || '256GB UFS 3.1',
          battery: phoneBatteryType || '5000 mAh',
          charging: phoneBatteryCharging || '45W Fast Charging',
          camera: phoneMainCameraSingle || '108MP OIS Single/Triple',
          os: phonePlatformOs || 'Android 15',
        },
        display: {
          type: phoneDisplayType || 'AMOLED, 144Hz, HDR10+',
          size: phoneDisplaySize || '6.78 inches',
          resolution: phoneDisplayResolution || '1080 x 2436 pixels',
          refreshRate: '144Hz',
          brightness: '1300 nits peak',
          protection: 'Corning Gorilla Glass',
        },
        platform: {
          os: phonePlatformOs || 'Android 15',
          chipset: phonePlatformChipset || 'MediaTek Dimensity 8200 Ultimate (4 nm)',
          cpu: phonePlatformCpu || 'Octa-core 3.1 GHz',
          gpu: phonePlatformGpu || 'Mali-G610 MC6',
        },
        performance: {
          chipset: phonePlatformChipset || 'MediaTek Dimensity 8200 Ultimate (4 nm)',
          cpu: phonePlatformCpu || 'Octa-core 3.1 GHz',
          gpu: phonePlatformGpu || 'Mali-G610 MC6',
        },
        memory: {
          ram: '12GB LPDDR5X',
          storage: newPhoneStorage || '256GB UFS 3.1',
          cardSupport: phoneMemoryCardSlot || 'microSDXC (dedicated slot)',
          cardSlot: phoneMemoryCardSlot || 'microSDXC (dedicated slot)',
          internal: phoneMemoryInternal || '256GB 12GB RAM, UFS 3.1',
        },
        camera: {
          rear: phoneMainCameraSingle || '108 MP, f/1.8, OIS',
          front: phoneSelfieCameraSingle || '32 MP, f/2.5',
          features: phoneMainCameraFeatures || 'HDR, Super Night Mode, 4K Video',
          video: phoneMainCameraVideo || '4K@60fps, 1080p@120fps',
        },
        mainCamera: {
          single: phoneMainCameraSingle || '108 MP, f/1.8, OIS',
          features: phoneMainCameraFeatures || 'HDR, Super Night Mode, 4K Video',
          video: phoneMainCameraVideo || '4K@60fps, 1080p@120fps',
        },
        selfieCamera: {
          single: phoneSelfieCameraSingle || '32 MP, f/2.5, Dual-LED flash',
          video: phoneSelfieCameraVideo || '1440p@30fps, 1080p@60fps',
        },
        battery: {
          type: phoneBatteryType || '5000 mAh, non-removable',
          capacity: phoneBatteryType || '5000 mAh',
          charging: phoneBatteryCharging || '45W wired, PD3.0',
          wirelessCharging: 'No',
          reverseCharging: '10W Reverse Wired',
        },
        network: {
          technology: phoneNetworkTech || 'GSM / HSPA / LTE / 5G',
          fiveG: (phoneNetworkTech || '').toLowerCase().includes('5g'),
          sim: phoneSim || 'Dual Nano-SIM (5G Dual Standby)',
          wifi: phoneCommsWlan || 'Wi-Fi 6',
          bluetooth: phoneCommsBluetooth || '5.4, A2DP, LE',
          nfc: phoneCommsNfc || 'Yes',
          gps: phoneCommsPositioning || 'GPS, GLONASS, GALILEO',
        },
        body: {
          dimensions: phoneDimensions || '164 x 75.4 x 8.1 mm',
          weight: phoneWeight || '194 g',
          build: 'Glass front, Cyber rear finish',
          sim: phoneSim || 'Dual Nano-SIM (5G Dual Standby)',
          colors: phoneMiscColors || 'Mecha Silver, Shadow Dark',
        },
        sound: {
          speaker: phoneSoundLoudspeaker || 'Yes, with stereo speakers, tuned by JBL',
          loudspeaker: phoneSoundLoudspeaker || 'Yes, with stereo speakers, tuned by JBL',
          headphoneJack: phoneSoundJack || 'Yes (3.5mm jack)',
          audioFeatures: 'Hi-Res Audio 24-bit/192kHz',
        },
        connectivity: {
          usb: phoneCommsUsb || 'USB Type-C 2.0, OTG',
          wifi: phoneCommsWlan || 'Wi-Fi 6',
          bluetooth: phoneCommsBluetooth || '5.4',
          nfc: phoneCommsNfc || 'Yes',
        },
        comms: {
          wlan: phoneCommsWlan || 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band',
          bluetooth: phoneCommsBluetooth || '5.4, A2DP, LE',
          positioning: phoneCommsPositioning || 'GPS, GLONASS, GALILEO',
          nfc: phoneCommsNfc || 'Yes',
          radio: phoneCommsRadio || 'FM radio',
          usb: phoneCommsUsb || 'USB Type-C 2.0, OTG',
        },
        features: {
          sensors: phoneFeaturesSensors || 'Fingerprint (under display, optical), accelerometer, gyro, proximity, compass',
        },
        security: {
          fingerprint: (phoneFeaturesSensors || '').toLowerCase().includes('fingerprint') ? 'Under-display optical' : 'Side-mounted',
          faceUnlock: 'AI Face Unlock',
        },
        software: {
          os: phonePlatformOs || 'Android 15',
          ui: (phonePlatformOs || '').includes('/') ? (phonePlatformOs || '').split('/')[1].trim() : 'Stock OS',
        },
        misc: {
          colors: phoneMiscColors || 'Mecha Silver, Shadow Dark',
          hits: phoneMiscHits || '847,860 HITS',
          fans: phoneMiscFans || 28,
          popularity: phoneMiscPopularity || '~ 7.5%',
        },
        gaming: {
          pubgFps: newPhoneGamingFps || 'Steady 90 FPS',
          freeFireFps: phoneFreeFireFps || '120 FPS',
          genshinImpact: phoneGenshinFps || '50-55 FPS',
          heating: phoneHeating || '41.2°C peak',
          stability: phoneStability || '94.8%',
          bypassCharging: phoneBypassCharging || 'Supported',
        },
        benchmarks: {
          antutu: '912,000',
          geekbenchSingle: '1,240',
          geekbenchMulti: '3,890',
        },
        youtubeVideoId: newPhoneYoutubeId || '8iU8LPEa4o0',
        gallery: [
          {
            url: newPhoneImage || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
            caption: `${newPhoneName} hardware showcase`,
            category: 'back',
          },
        ],
        pros: prosArray.length > 0 ? prosArray : ['Smooth high-refresh display', 'Strong gaming stability', 'Fast charging'],
        cons: consArray.length > 0 ? consArray : ['No wireless charging'],
        review: {
          verdict: newPhoneVerdict || newPhoneSummary || 'Outstanding gaming value for budget conscious tech enthusiasts.',
          design: 'Modern cyber finish with clean ergonomics.',
          display: 'Vibrant colors and excellent touch response.',
          performance: 'Snappy response and solid sustained benchmarks.',
          gaming: `Benchmarked at ${newPhoneGamingFps} in high settings.`,
          camera: 'Clean daylight photography.',
          battery: 'Full day endurance under mixed stress tests.',
          software: 'Smooth interface and updated security patches.',
          overall: newPhoneVerdict || newPhoneSummary || 'Outstanding gaming value for budget conscious tech enthusiasts.',
        },
        faqs: [
          {
            question: `Does ${newPhoneName} support 5G in Saudi Arabia and Bangladesh?`,
            answer: 'Yes, it supports key sub-6GHz 5G bands across STC, Mobily, Zain, Grameenphone and Robi.',
          },
        ],
        relatedPhoneSlugs: ['infinix-gt-30', 'samsung-galaxy-a55'],
      };

      addMobile(completePhone);
      showToast(`Smartphone "${newPhoneName}" published live to database!`);
      setNewPhoneName('');
      setNewPhoneSlug('');
      setManageSubTab('mobiles');
      setActiveTab('manage-posts');
    } else if (postType === 'video') {
      if (!newVideoTitle.trim() || !newVideoYoutubeId.trim()) {
        alert('Please provide YouTube video title and video ID.');
        return;
      }
      const thumb =
        newVideoThumbnail.trim() ||
        `https://img.youtube.com/vi/${newVideoYoutubeId.trim()}/maxresdefault.jpg`;

      const newVideo: VideoItem = {
        id: `vid-${Date.now()}`,
        youtubeId: newVideoYoutubeId.trim(),
        title: newVideoTitle,
        type: newVideoType,
        thumbnail: thumb,
        duration: newVideoDuration || '16:00',
        views: newVideoViews || 'Just published',
        uploadDate: newVideoUploadDate || 'Today',
        featured: newVideoFeatured,
        linkedPhoneSlug: newVideoLinkedPhone || undefined,
        description:
          newVideoDescription ||
          `Watch MD Naeem Hossin's detailed video on ${newVideoTitle}. Full benchmarks and real usage.`,
      };

      addVideo(newVideo);
      showToast(`YouTube Video "${newVideoTitle}" published to channel hub!`);
      setNewVideoTitle('');
      setNewVideoYoutubeId('');
      setNewVideoDescription('');
      setManageSubTab('videos');
      setActiveTab('manage-posts');
    } else if (postType === 'guide') {
      if (!postTitle.trim()) {
        alert('Please provide a guide title.');
        return;
      }
      const slug =
        postSlug.trim() ||
        postTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

      const paragraphs = postContent
        .split('\n\n')
        .map(p => p.trim())
        .filter(Boolean);

      const newGuide: GuideItem = {
        id: `guide-${Date.now()}`,
        slug,
        title: postTitle,
        featuredImage: postImage,
        readTime: postReadTime,
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        summary: postSummary || postContent.slice(0, 160) + '...',
        sections: paragraphs.map((para, idx) => ({
          heading: idx === 0 ? 'Introduction & Core Analysis' : `Section ${idx + 1}`,
          content: para,
        })),
        relatedProductSlugs: postLinkedPhone ? [postLinkedPhone] : ['infinix-gt-30'],
        relatedVideoIds: postYoutubeId ? [postYoutubeId] : ['vid-smartphone-buying-guide'],
      };

      addGuide(newGuide);
      showToast(`Tech Guide "${postTitle}" published successfully!`);
      setPostTitle('');
      setPostSlug('');
      setPostSummary('');
      setPostContent('');
      setManageSubTab('guides');
      setActiveTab('manage-posts');
    }
  };

  // Mobile Device Form State
  const initialPhoneForm: Partial<MobilePhone> = {
    brand: 'Infinix',
    name: '',
    slug: '',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Verified Test',
    releaseDate: '2025',
    isPopular: true,
    isFeatured: false,
    price: {
      saudi: 'SAR 1,099',
      bangladesh: '৳ 29,999',
      globalUSD: '$280',
    },
    quickSpecs: {
      display: '6.78" 144Hz AMOLED',
      processor: 'Dimensity 8200 Ultimate (4nm)',
      ram: '12GB',
      storage: '256GB',
      battery: '5000 mAh',
      charging: '45W Fast Charging',
      camera: '108MP OIS Triple Cam',
      os: 'Android 15',
    },
    display: {
      type: 'AMOLED, 144Hz, HDR10+',
      size: '6.78 inches',
      resolution: '1080 x 2436 pixels',
      refreshRate: '144Hz',
      brightness: '1300 nits peak',
      protection: 'Corning Gorilla Glass',
    },
    performance: {
      chipset: 'MediaTek Dimensity 8200 Ultimate (4 nm)',
      cpu: 'Octa-core 3.1 GHz',
      gpu: 'Mali-G610 MC6',
    },
    memory: {
      ram: '12GB LPDDR5X',
      storage: '256GB UFS 3.1',
      cardSupport: 'microSDXC',
    },
    camera: {
      rear: '108 MP, f/1.8, OIS + 2 MP + 2 MP',
      front: '32 MP with Dual-LED flash',
      features: 'HDR, Night Mode, 4K Video',
      video: '4K@60fps, 1080p@120fps',
    },
    battery: {
      capacity: '5000 mAh',
      charging: '45W Fast PD3.0',
      wirelessCharging: 'No',
      reverseCharging: '10W Reverse',
    },
    network: {
      technology: 'GSM / HSPA / LTE / 5G',
      fiveG: true,
      sim: 'Dual Nano-SIM (5G Dual Standby)',
      wifi: 'Wi-Fi 6',
      bluetooth: '5.4',
      nfc: 'Yes',
      gps: 'GPS, GLONASS, GALILEO',
    },
    body: {
      dimensions: '164 x 75.4 x 8.1 mm',
      weight: '194 g',
      build: 'Glass front, Cyber rear finish',
      colors: 'Mecha Silver, Shadow Dark',
    },
    sound: {
      speaker: 'Stereo Speakers tuned by JBL',
      headphoneJack: 'Yes (3.5mm)',
      audioFeatures: 'Hi-Res Audio',
    },
    connectivity: {
      usb: 'Type-C 2.0, OTG',
      wifi: 'Wi-Fi 6',
      bluetooth: '5.4',
      nfc: 'Yes',
    },
    security: {
      fingerprint: 'Optical Under-display',
      faceUnlock: 'AI Face Unlock',
    },
    software: {
      os: 'Android 15',
      ui: 'XOS GT Edition',
    },
    gaming: {
      pubgFps: 'Steady 90 FPS',
      freeFireFps: '120 FPS',
      genshinImpact: '50-55 FPS',
      heating: '41.2°C peak',
      stability: '94.8%',
      bypassCharging: 'Supported',
    },
    benchmarks: {
      antutu: '912,000',
      geekbenchSingle: '1,240',
      geekbenchMulti: '3,890',
    },
    youtubeVideoId: '8iU8LPEa4o0',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rear design and camera housing',
        category: 'back',
      },
    ],
    pros: ['Smooth 144Hz AMOLED screen', 'Solid 90 FPS PUBG gaming', 'Bypass charging prevents heat'],
    cons: ['No dedicated ultra-wide lens', 'Polycarbonate frame'],
    review: {
      verdict: 'Excellent gaming performance and value for money in Bangladesh and Saudi Arabia.',
      design: 'Clean aesthetics with ergonomic in-hand grip.',
      display: 'Bright, colorful, and highly responsive.',
      performance: 'Fast app loading and multitasking.',
      gaming: 'Tested 90 FPS steady in PUBG Mobile.',
      camera: 'Sharp daylight photos with OIS.',
      battery: 'Lasts a full day of heavy gaming and social browsing.',
      software: 'Refined UI with reduced bloatware.',
      overall: 'Highly recommended for budget-conscious gamers.',
    },
    faqs: [
      {
        question: 'Does this phone support 5G in Saudi Arabia and Bangladesh?',
        answer: 'Yes, it supports all major sub-6GHz 5G bands across STC, Mobily, Zain, Grameenphone and Robi.',
      },
    ],
    relatedPhoneSlugs: ['samsung-galaxy-a55', 'redmi-note-13-pro-plus'],
  };

  const [phoneFormData, setPhoneFormData] = useState<Partial<MobilePhone>>(initialPhoneForm);
  const [priceUpdates, setPriceUpdates] = useState<Record<string, { saudi: string; bangladesh: string }>>({});

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(username, password);
    if (!success) {
      setLoginError('Invalid credentials. Use demo: admin / munshi2026');
    }
  };

  const handleQuickDemoFill = () => {
    setUsername('admin');
    setPassword('munshi2026');
    setLoginError('');
  };

  const handleEditPhone = (phone: MobilePhone) => {
    setEditingPhoneId(phone.id);
    setPhoneFormData(JSON.parse(JSON.stringify(phone)));
    setIsEditingPhone(true);
  };

  const handleAddNewPhone = () => {
    setEditingPhoneId(null);
    setPhoneFormData({
      ...initialPhoneForm,
      id: `phone-${Date.now()}`,
      slug: `new-phone-${Date.now()}`,
    });
    setIsEditingPhone(true);
  };

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneFormData.name || !phoneFormData.brand) {
      alert('Please fill out the phone name and brand.');
      return;
    }

    const slug =
      phoneFormData.slug?.trim() ||
      phoneFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const completePhone = {
      ...initialPhoneForm,
      ...phoneFormData,
      id: editingPhoneId || phoneFormData.id || slug,
      slug,
      name: phoneFormData.name,
      brand: phoneFormData.brand,
    } as MobilePhone;

    if (editingPhoneId) {
      updateMobile(completePhone);
      showToast(`Updated "${completePhone.name}" successfully!`);
    } else {
      addMobile(completePhone);
      showToast(`Added "${completePhone.name}" to database!`);
    }

    setIsEditingPhone(false);
  };

  const handleDeletePhone = (phone: MobilePhone) => {
    if (window.confirm(`Delete ${phone.name} from the database?`)) {
      deleteMobile(phone.id);
      showToast(`Deleted ${phone.name}.`);
    }
  };

  const handleSaveAllPrices = () => {
    mobiles.forEach(p => {
      if (priceUpdates[p.id]) {
        updateMobile({
          ...p,
          price: {
            ...p.price,
            saudi: priceUpdates[p.id].saudi || p.price.saudi,
            bangladesh: priceUpdates[p.id].bangladesh || p.price.bangladesh,
          },
        });
      }
    });
    setPriceUpdates({});
    showToast('All regional prices updated and synchronized!');
  };

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(mobiles, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mobiles.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded mobiles.json successfully!');
  };

  const filteredAdminPhones = mobiles.filter(
    p =>
      p.name.toLowerCase().includes(adminPhoneSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(adminPhoneSearch.toLowerCase())
  );

  // Computed phone preview for live summary card
  const previewPhone: MobilePhone = {
    ...initialPhoneForm,
    id: newPhoneSlug || 'preview-phone',
    brand: newPhoneBrand || 'Infinix',
    name: newPhoneName || 'Infinix GT 30 Pro',
    slug: newPhoneSlug || 'infinix-gt-30-pro',
    image:
      newPhoneImage ||
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Lab Tested',
    releaseDate: '2026',
    price: {
      saudi: newPhoneSaudiPrice || 'SAR 1,099',
      bangladesh: newPhoneBdPrice || '৳ 29,999',
      globalUSD: newPhoneGlobalUSD || '$280',
    },
    quickSpecs: {
      display: `${phoneDisplaySize} ${phoneDisplayType}`,
      processor: phonePlatformChipset,
      ram: phoneMemoryInternal.includes('RAM') ? phoneMemoryInternal.split('RAM')[0].trim() : '12GB LPDDR5X',
      storage: newPhoneStorage || '256GB UFS 3.1',
      battery: phoneBatteryType || '5000 mAh',
      charging: phoneBatteryCharging || '45W Fast Charging',
      camera: phoneMainCameraSingle || '108MP OIS Single/Triple',
      os: phonePlatformOs || 'Android 15',
    },
    display: {
      type: phoneDisplayType || 'AMOLED, 144Hz, HDR10+',
      size: phoneDisplaySize || '6.78 inches',
      resolution: phoneDisplayResolution || '1080 x 2436 pixels',
      refreshRate: '144Hz',
      brightness: '1300 nits peak',
      protection: 'Corning Gorilla Glass',
    },
    platform: {
      os: phonePlatformOs || 'Android 15',
      chipset: phonePlatformChipset || 'MediaTek Dimensity 8200 Ultimate (4 nm)',
      cpu: phonePlatformCpu || 'Octa-core 3.1 GHz',
      gpu: phonePlatformGpu || 'Mali-G610 MC6',
    },
    performance: {
      chipset: phonePlatformChipset || 'MediaTek Dimensity 8200 Ultimate (4 nm)',
      cpu: phonePlatformCpu || 'Octa-core 3.1 GHz',
      gpu: phonePlatformGpu || 'Mali-G610 MC6',
    },
    memory: {
      ram: '12GB LPDDR5X',
      storage: newPhoneStorage || '256GB UFS 3.1',
      cardSupport: phoneMemoryCardSlot || 'microSDXC (dedicated slot)',
      cardSlot: phoneMemoryCardSlot || 'microSDXC (dedicated slot)',
      internal: phoneMemoryInternal || '256GB 12GB RAM, UFS 3.1',
    },
    camera: {
      rear: phoneMainCameraSingle || '108 MP, f/1.8, OIS',
      front: phoneSelfieCameraSingle || '32 MP, f/2.5',
      features: phoneMainCameraFeatures || 'HDR, Super Night Mode, 4K Video',
      video: phoneMainCameraVideo || '4K@60fps, 1080p@120fps',
    },
    mainCamera: {
      single: phoneMainCameraSingle || '108 MP, f/1.8, OIS',
      features: phoneMainCameraFeatures || 'HDR, Super Night Mode, 4K Video',
      video: phoneMainCameraVideo || '4K@60fps, 1080p@120fps',
    },
    selfieCamera: {
      single: phoneSelfieCameraSingle || '32 MP, f/2.5, Dual-LED flash',
      video: phoneSelfieCameraVideo || '1440p@30fps, 1080p@60fps',
    },
    battery: {
      type: phoneBatteryType || '5000 mAh, non-removable',
      capacity: phoneBatteryType || '5000 mAh',
      charging: phoneBatteryCharging || '45W wired, PD3.0',
    },
    network: {
      technology: phoneNetworkTech || 'GSM / HSPA / LTE / 5G',
      fiveG: (phoneNetworkTech || '').toLowerCase().includes('5g'),
      sim: phoneSim || 'Dual Nano-SIM (5G Dual Standby)',
      wifi: phoneCommsWlan || 'Wi-Fi 6',
      bluetooth: phoneCommsBluetooth || '5.4, A2DP, LE',
      nfc: phoneCommsNfc || 'Yes',
      gps: phoneCommsPositioning || 'GPS, GLONASS, GALILEO',
    },
    body: {
      dimensions: phoneDimensions || '164 x 75.4 x 8.1 mm',
      weight: phoneWeight || '194 g',
      build: 'Glass front, Cyber rear finish',
      sim: phoneSim || 'Dual Nano-SIM (5G Dual Standby)',
      colors: phoneMiscColors || 'Mecha Silver, Shadow Dark',
    },
    sound: {
      speaker: phoneSoundLoudspeaker || 'Yes, with stereo speakers, tuned by JBL',
      loudspeaker: phoneSoundLoudspeaker || 'Yes, with stereo speakers, tuned by JBL',
      headphoneJack: phoneSoundJack || 'Yes (3.5mm jack)',
    },
    comms: {
      wlan: phoneCommsWlan || 'Wi-Fi 802.11 a/b/g/n/ac/6, dual-band',
      bluetooth: phoneCommsBluetooth || '5.4, A2DP, LE',
      positioning: phoneCommsPositioning || 'GPS, GLONASS, GALILEO',
      nfc: phoneCommsNfc || 'Yes',
      radio: phoneCommsRadio || 'FM radio',
      usb: phoneCommsUsb || 'USB Type-C 2.0, OTG',
    },
    features: {
      sensors: phoneFeaturesSensors || 'Fingerprint (under display, optical), accelerometer, gyro, proximity, compass',
    },
    misc: {
      colors: phoneMiscColors || 'Mecha Silver, Shadow Dark',
      hits: phoneMiscHits || '847,860 HITS',
      fans: phoneMiscFans || 28,
      popularity: phoneMiscPopularity || '~ 7.5%',
    },
    gaming: {
      pubgFps: newPhoneGamingFps || 'Steady 90 FPS',
      freeFireFps: phoneFreeFireFps || '120 FPS',
      genshinImpact: phoneGenshinFps || '50-55 FPS',
      heating: phoneHeating || '41.2°C peak',
      stability: phoneStability || '94.8%',
      bypassCharging: phoneBypassCharging || 'Supported',
    },
    youtubeVideoId: newPhoneYoutubeId || '8iU8LPEa4o0',
    gallery: [
      {
        url:
          newPhoneImage ||
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80',
        caption: `${newPhoneName || 'Smartphone'} studio showcase`,
        category: 'back',
      },
    ],
    pros: newPhonePros.split(',').map(s => s.trim()).filter(Boolean),
    cons: newPhoneCons.split(',').map(s => s.trim()).filter(Boolean),
    review: {
      verdict: newPhoneVerdict || newPhoneSummary || 'Outstanding gaming value for budget conscious tech enthusiasts.',
      design: 'Modern cyber finish with clean ergonomics.',
      display: 'Vibrant colors and excellent touch response.',
      performance: 'Snappy response and solid sustained benchmarks.',
      gaming: `Benchmarked at ${newPhoneGamingFps} in high settings.`,
      camera: 'Clean daylight photography.',
      battery: 'Full day endurance under mixed stress tests.',
      software: 'Smooth interface and updated security patches.',
      overall: newPhoneVerdict || newPhoneSummary || 'Outstanding gaming value for budget conscious tech enthusiasts.',
    },
    faqs: [
      {
        question: `Does ${newPhoneName || 'this phone'} support 5G in Saudi Arabia and Bangladesh?`,
        answer: 'Yes, it supports key sub-6GHz 5G bands across STC, Mobily, Zain, Grameenphone and Robi.',
      },
    ],
    relatedPhoneSlugs: ['infinix-gt-30', 'samsung-galaxy-a55'],
  };

  // ==========================================
  // VIEW: STANDALONE LOGIN SCREEN (FULL ENGLISH)
  // ==========================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-8">
        {/* Top brand header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-heading font-black text-white shadow-lg">
              TWM
            </div>
            <div className="text-left">
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                Tech With Munshi
              </span>
              <span className="text-[10px] text-blue-400 font-mono tracking-widest block uppercase">
                Enterprise Studio Console
              </span>
            </div>
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-800/50"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            <span>Back to Public Site</span>
          </button>
        </div>

        {/* Login Box */}
        <div className="w-full max-w-md mx-auto my-12 bg-slate-950/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white">
              Administrator Access
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage devices, publish articles, and update regional pricing.
            </p>
          </div>

          {/* Quick Demo Access Box */}
          <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-800/80 text-xs text-blue-300 space-y-2">
            <div className="flex items-center justify-between font-semibold">
              <span className="flex items-center gap-1.5 text-blue-300">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Default Demo Credentials:
              </span>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="text-[11px] underline font-bold text-blue-400 hover:text-blue-200"
              >
                Auto-Fill
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-300">
              Username: <strong className="text-white">admin</strong> · Password: <strong className="text-white">munshi2026</strong>
            </div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="admin or munshi"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-900 text-white rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Authenticate Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authorized for MD Naeem Hossin & Senior Editorial Staff</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500 max-w-7xl mx-auto w-full">
          Tech With Munshi Enterprise Console · All Rights Reserved © 2026
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: STANDALONE ADMIN PORTAL DASHBOARD (100% ENGLISH)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#090b10] text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-200 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DEDICATED ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 bg-white dark:bg-[#0f111a] border-r border-slate-200 dark:border-slate-800/80 flex flex-col shrink-0">
        {/* Brand Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-heading font-black text-sm shadow-md">
              TWM
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-white block tracking-tight">
                Tech With Munshi
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono uppercase tracking-wider block">
                Admin Console
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="p-3 flex-1 space-y-1 text-xs font-medium overflow-y-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('create-post')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'create-post'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <PenTool className="w-4 h-4 text-blue-500" />
              <span>Publish Article / Post</span>
            </span>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold">
              New
            </span>
          </button>

          <button
            onClick={() => setActiveTab('manage-posts')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'manage-posts'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Manage Posts</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {reviews.length + guides.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('mobiles')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'mobiles'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Smartphone className="w-4 h-4" />
              <span>Device Database</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {mobiles.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('prices')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'prices'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Regional Price Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              activeTab === 'export'
                ? 'bg-blue-600 text-white font-semibold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Export & Backup</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Logged in Administrator</span>
            <span className="font-heading font-bold text-xs text-slate-900 dark:text-white block mt-0.5">
              MD Naeem Hossin
            </span>
            <span className="text-[10px] text-emerald-500 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Super Admin Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('home')}
              className="flex-1 py-2 text-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>

            <button
              onClick={adminLogout}
              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0c0d12]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Admin Portal
            </span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 capitalize">
              {activeTab.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md font-mono">
              Language: English (Locked)
            </span>

            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setActiveTab('create-post')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Post</span>
            </button>
          </div>
        </header>

        {/* WORKSPACE CONTENT BODY */}
        <main className="p-6 sm:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-2 max-w-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Welcome, MD Naeem Hossin
                  </span>
                  <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                    Tech With Munshi Platform Console
                  </h1>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    Manage all smartphone specifications, studio benchmarks, written reviews, and YouTube tests in one centralized full-English workspace.
                  </p>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs text-slate-500 font-medium">Published Reviews</span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-indigo-600 dark:text-indigo-400">
                    {reviews.length}
                  </div>
                  <span className="text-[11px] text-slate-400">Live articles</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs text-slate-500 font-medium">Tech Guides</span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400">
                    {guides.length}
                  </div>
                  <span className="text-[11px] text-slate-400">Buyer tutorials</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs text-slate-500 font-medium">Smartphones In DB</span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-blue-600 dark:text-blue-400">
                    {mobiles.length}
                  </div>
                  <span className="text-[11px] text-slate-400">Hardware records</span>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 space-y-2">
                  <span className="text-xs text-slate-500 font-medium">YouTube Embedded Videos</span>
                  <div className="font-heading font-extrabold text-2xl sm:text-3xl text-red-600 dark:text-red-400">
                    {videos.length}
                  </div>
                  <span className="text-[11px] text-slate-400">Channel videos</span>
                </div>
              </div>

              {/* Quick Actions Grid */}
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0f111a] border border-slate-200 dark:border-slate-800 space-y-4">
                <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                  Quick Management Shortcuts
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <button
                    onClick={() => setActiveTab('create-post')}
                    className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/80 text-left space-y-2 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
                      Publish Article / Post
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Create new smartphone review or buying guide.
                    </p>
                  </button>

                  <button
                    onClick={handleAddNewPhone}
                    className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800/80 text-left space-y-2 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Plus className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white group-hover:text-blue-600">
                      Add New Phone
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Insert hardware specs, gaming FPS, and dual prices.
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveTab('prices')}
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800/80 text-left space-y-2 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                      Update Regional Prices
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Bulk edit Saudi Arabia (SAR) and Bangladesh (BDT) rates.
                    </p>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200 dark:border-purple-800/80 text-left space-y-2 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                      <Download className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading font-bold text-slate-900 dark:text-white group-hover:text-purple-600">
                      Export JSON Backup
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Download full database files for repository versioning.
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: POST PUBLISHING STUDIO (100% ENGLISH) */}
          {activeTab === 'create-post' && (
            <div className="bg-white dark:bg-[#0f111a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                  <PenTool className="w-4 h-4" />
                  <span>Content Studio · Universal Post Creator</span>
                </div>
                <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
                  Publish New Tech Content
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Choose a content category below to publish written smartphone reviews, add hardware records to the mobile database, embed YouTube channel videos, or create tech buying guides.
                </p>
              </div>

              {/* 4 Classification Buttons */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Content Type to Publish:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPostType('review');
                      setPostCategory('Smartphone Reviews');
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                      postType === 'review'
                        ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-500 text-blue-900 dark:text-blue-200 shadow-xs'
                        : 'bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <FileText className={`w-5 h-5 shrink-0 mt-0.5 ${postType === 'review' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-heading font-bold text-xs">📝 Tech Review</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Deep product review with rating score & verdict.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostType('phone')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                      postType === 'phone'
                        ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-900 dark:text-indigo-200 shadow-xs'
                        : 'bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <Smartphone className={`w-5 h-5 shrink-0 mt-0.5 ${postType === 'phone' ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-heading font-bold text-xs">📱 Smartphone Post</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Hardware specs, SAR/BDT prices & PUBG test.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPostType('video')}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                      postType === 'video'
                        ? 'bg-rose-50 dark:bg-rose-950/80 border-rose-500 text-rose-900 dark:text-rose-200 shadow-xs'
                        : 'bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <Youtube className={`w-5 h-5 shrink-0 mt-0.5 ${postType === 'video' ? 'text-rose-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-heading font-bold text-xs">🎬 YouTube Video</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Embed Munshi channel video with duration & stats.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setPostType('guide');
                      setPostCategory('Buying Guides');
                    }}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                      postType === 'guide'
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-xs'
                        : 'bg-white dark:bg-[#0f111a] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <BookOpen className={`w-5 h-5 shrink-0 mt-0.5 ${postType === 'guide' ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <div>
                      <h4 className="font-heading font-bold text-xs">📖 Tech Guide</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Buyer framework, comparisons & explanations.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* FORM: POST TYPE 1 - TECH REVIEW */}
              {postType === 'review' && (
                <form onSubmit={handlePublishPost} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Review Article Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={e => handleTitleChange(e.target.value)}
                        placeholder="e.g. Infinix GT 30 Full Review: Budget Gaming King or Gimmick?"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          URL Slug (Auto-generated)
                        </label>
                        <input
                          type="text"
                          value={postSlug}
                          onChange={e => setPostSlug(e.target.value)}
                          placeholder="infinix-gt-30-full-review"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                          Target URL: #/reviews/{postSlug || 'your-slug'}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Category
                        </label>
                        <select
                          value={postCategory}
                          onChange={e => setPostCategory(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800"
                        >
                          <option value="Smartphone Reviews">Smartphone Reviews</option>
                          <option value="Laptop Reviews">Laptop Reviews</option>
                          <option value="Gadget Reviews">Gadget Reviews</option>
                          <option value="Audio & Accessories">Audio & Accessories</option>
                          <option value="AI Tools">AI Tools & Tech</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Author, Read time, Score, Linked Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Author
                      </label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={e => setPostAuthor(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={postReadTime}
                        onChange={e => setPostReadTime(e.target.value)}
                        placeholder="e.g. 6 min read"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Review Score (Out of 10)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="10"
                        value={postScore}
                        onChange={e => setPostScore(parseFloat(e.target.value) || 9.0)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Linked Smartphone Spec
                      </label>
                      <select
                        value={postLinkedPhone}
                        onChange={e => setPostLinkedPhone(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      >
                        {mobiles.map(p => (
                          <option key={p.id} value={p.slug}>
                            {p.name} ({p.brand})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Cover Image & Presets */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Featured Cover Image:
                      </label>
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Device</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => handleImageFileUpload(e, setPostImage)}
                        />
                      </label>
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="url"
                        required
                        value={postImage}
                        onChange={e => setPostImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                      {postImage && (
                        <img
                          src={postImage}
                          alt="Cover"
                          className="w-12 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                        />
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                      {presetImages.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => setPostImage(preset.url)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
                            postImage === preset.url
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* YouTube ID */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      YouTube Video ID (Embed Review Video)
                    </label>
                    <div className="relative">
                      <Youtube className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={postYoutubeId}
                        onChange={e => setPostYoutubeId(e.target.value)}
                        placeholder="e.g. 8iU8LPEa4o0"
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                      />
                    </div>
                  </div>

                  {/* Short Summary */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Short Excerpt / Card Preview Summary *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={postSummary}
                      onChange={e => setPostSummary(e.target.value)}
                      placeholder="Write a concise 2-sentence hook for the article card..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Full Article Body */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Full Review Article Content *
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Use double-newlines (Enter twice) to separate paragraphs
                      </span>
                    </div>
                    <textarea
                      required
                      rows={6}
                      value={postContent}
                      onChange={e => setPostContent(e.target.value)}
                      placeholder="Write your comprehensive technical review, display analysis, gaming benchmark results, camera samples breakdown, battery life tests, and final purchasing verdict..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 leading-relaxed"
                    />
                  </div>

                  {/* Live Card Preview */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Live Card Preview:
                    </span>
                    <div className="max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs p-4 flex gap-3">
                      <img
                        src={postImage || presetImages[0].url}
                        alt="Preview"
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>{postCategory}</span>
                          <span className="font-bold text-blue-600">{postScore}/10</span>
                        </div>
                        <h4 className="font-heading font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                          {postTitle || 'Review Title Preview'}
                        </h4>
                        <p className="text-[10px] text-slate-500 line-clamp-2">
                          {postSummary || 'Short preview summary text will appear here...'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Review Article</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FORM: POST TYPE 2 - SMARTPHONE SPEC POST */}
              {postType === 'phone' && (
                <form onSubmit={handlePublishPost} className="space-y-6">
                  {/* Brand & Name */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                      1. Smartphone Identity & Model
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Brand *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoneBrand}
                          onChange={e => setNewPhoneBrand(e.target.value)}
                          placeholder="e.g. Infinix, Samsung, Xiaomi"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Device Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoneName}
                          onChange={e => handleNewPhoneNameChange(e.target.value)}
                          placeholder="e.g. Infinix GT 30 Pro"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={newPhoneSlug}
                          onChange={e => setNewPhoneSlug(e.target.value)}
                          placeholder="infinix-gt-30-pro"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                        />
                        <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
                          Target URL: #/mobile/{newPhoneSlug || 'phone-slug'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Regional Pricing */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                      2. Verified Regional Pricing
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          🇸🇦 Saudi Arabia Price (SAR) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoneSaudiPrice}
                          onChange={e => setNewPhoneSaudiPrice(e.target.value)}
                          placeholder="e.g. SAR 1,099"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          🇧🇩 Bangladesh Price (BDT) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newPhoneBdPrice}
                          onChange={e => setNewPhoneBdPrice(e.target.value)}
                          placeholder="e.g. ৳ 29,999"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-blue-600 dark:text-blue-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          🌐 Global Price (USD)
                        </label>
                        <input
                          type="text"
                          value={newPhoneGlobalUSD}
                          onChange={e => setNewPhoneGlobalUSD(e.target.value)}
                          placeholder="e.g. $280"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Hardware Specifications & Gaming Test */}
                  <div className="space-y-6 pt-2">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div>
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block">
                          3. Hardware Specifications & Gaming Test
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Configure complete GSMArena standard hardware fields and real-world gaming FPS tests.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={generatePhoneSummary}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-purple-200 dark:border-purple-800"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Auto-Fill Specs & Summary</span>
                      </button>
                    </div>

                    {/* Spec Categories Stack */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Network */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>📡</span> Network
                        </span>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Technology
                          </label>
                          <input
                            type="text"
                            value={phoneNetworkTech}
                            onChange={e => setPhoneNetworkTech(e.target.value)}
                            placeholder="GSM / HSPA / LTE / 5G"
                            className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                          />
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>📐</span> Body
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Dimensions
                            </label>
                            <input
                              type="text"
                              value={phoneDimensions}
                              onChange={e => setPhoneDimensions(e.target.value)}
                              placeholder="164.2 x 75.8 x 8.2 mm"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              SIM
                            </label>
                            <input
                              type="text"
                              value={phoneSim}
                              onChange={e => setPhoneSim(e.target.value)}
                              placeholder="Dual Nano-SIM"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Weight
                            </label>
                            <input
                              type="text"
                              value={phoneWeight}
                              onChange={e => setPhoneWeight(e.target.value)}
                              placeholder="210 g"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Display */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🖥️</span> Display
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Type
                            </label>
                            <input
                              type="text"
                              value={phoneDisplayType}
                              onChange={e => setPhoneDisplayType(e.target.value)}
                              placeholder="AMOLED, 144Hz, HDR10+"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Size
                            </label>
                            <input
                              type="text"
                              value={phoneDisplaySize}
                              onChange={e => setPhoneDisplaySize(e.target.value)}
                              placeholder='6.78 inches'
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Resolution
                            </label>
                            <input
                              type="text"
                              value={phoneDisplayResolution}
                              onChange={e => setPhoneDisplayResolution(e.target.value)}
                              placeholder="1080 x 2436 pixels"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Platform */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>⚡</span> Platform
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              OS
                            </label>
                            <input
                              type="text"
                              value={phonePlatformOs}
                              onChange={e => setPhonePlatformOs(e.target.value)}
                              placeholder="Android 15 / 16"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Chipset
                            </label>
                            <input
                              type="text"
                              value={phonePlatformChipset}
                              onChange={e => setPhonePlatformChipset(e.target.value)}
                              placeholder="MediaTek Dimensity 8200"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              CPU
                            </label>
                            <input
                              type="text"
                              value={phonePlatformCpu}
                              onChange={e => setPhonePlatformCpu(e.target.value)}
                              placeholder="Octa-core 3.1 GHz"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              GPU
                            </label>
                            <input
                              type="text"
                              value={phonePlatformGpu}
                              onChange={e => setPhonePlatformGpu(e.target.value)}
                              placeholder="Mali-G610 MC6"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Memory */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>💾</span> Memory
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Card slot
                            </label>
                            <input
                              type="text"
                              value={phoneMemoryCardSlot}
                              onChange={e => setPhoneMemoryCardSlot(e.target.value)}
                              placeholder="microSDXC (dedicated slot)"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Internal
                            </label>
                            <input
                              type="text"
                              value={phoneMemoryInternal}
                              onChange={e => setPhoneMemoryInternal(e.target.value)}
                              placeholder="128GB 8GB RAM, 256GB 12GB RAM"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Main Camera */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>📷</span> Main Camera
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Single / Setup
                            </label>
                            <input
                              type="text"
                              value={phoneMainCameraSingle}
                              onChange={e => setPhoneMainCameraSingle(e.target.value)}
                              placeholder="108 MP, f/1.8, OIS"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Features
                            </label>
                            <input
                              type="text"
                              value={phoneMainCameraFeatures}
                              onChange={e => setPhoneMainCameraFeatures(e.target.value)}
                              placeholder="HDR, Super Night Mode"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Video
                            </label>
                            <input
                              type="text"
                              value={phoneMainCameraVideo}
                              onChange={e => setPhoneMainCameraVideo(e.target.value)}
                              placeholder="4K@60fps, 1080p@120fps"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Selfie Camera */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🤳</span> Selfie camera
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Single
                            </label>
                            <input
                              type="text"
                              value={phoneSelfieCameraSingle}
                              onChange={e => setPhoneSelfieCameraSingle(e.target.value)}
                              placeholder="32 MP, f/2.5"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Video
                            </label>
                            <input
                              type="text"
                              value={phoneSelfieCameraVideo}
                              onChange={e => setPhoneSelfieCameraVideo(e.target.value)}
                              placeholder="1440p@30fps, 1080p@60fps"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sound */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🔊</span> Sound
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Loudspeaker
                            </label>
                            <input
                              type="text"
                              value={phoneSoundLoudspeaker}
                              onChange={e => setPhoneSoundLoudspeaker(e.target.value)}
                              placeholder="Stereo speakers tuned by JBL"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              3.5mm jack
                            </label>
                            <input
                              type="text"
                              value={phoneSoundJack}
                              onChange={e => setPhoneSoundJack(e.target.value)}
                              placeholder="Yes (3.5mm jack)"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Comms */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2 md:col-span-2">
                        <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🌐</span> Comms
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              WLAN
                            </label>
                            <input
                              type="text"
                              value={phoneCommsWlan}
                              onChange={e => setPhoneCommsWlan(e.target.value)}
                              placeholder="Wi-Fi 6"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Bluetooth
                            </label>
                            <input
                              type="text"
                              value={phoneCommsBluetooth}
                              onChange={e => setPhoneCommsBluetooth(e.target.value)}
                              placeholder="5.4, A2DP"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Positioning
                            </label>
                            <input
                              type="text"
                              value={phoneCommsPositioning}
                              onChange={e => setPhoneCommsPositioning(e.target.value)}
                              placeholder="GPS, GLONASS"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              NFC
                            </label>
                            <input
                              type="text"
                              value={phoneCommsNfc}
                              onChange={e => setPhoneCommsNfc(e.target.value)}
                              placeholder="Yes"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Radio
                            </label>
                            <input
                              type="text"
                              value={phoneCommsRadio}
                              onChange={e => setPhoneCommsRadio(e.target.value)}
                              placeholder="FM radio"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              USB
                            </label>
                            <input
                              type="text"
                              value={phoneCommsUsb}
                              onChange={e => setPhoneCommsUsb(e.target.value)}
                              placeholder="USB Type-C 2.0"
                              className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🔬</span> Features
                        </span>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Sensors
                          </label>
                          <input
                            type="text"
                            value={phoneFeaturesSensors}
                            onChange={e => setPhoneFeaturesSensors(e.target.value)}
                            placeholder="Fingerprint (under display), accelerometer, gyro, compass"
                            className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                          />
                        </div>
                      </div>

                      {/* Battery */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🔋</span> Battery
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Type (mAh)
                            </label>
                            <input
                              type="text"
                              value={phoneBatteryType}
                              onChange={e => setPhoneBatteryType(e.target.value)}
                              placeholder="5000 mAh"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Charging (w)
                            </label>
                            <input
                              type="text"
                              value={phoneBatteryCharging}
                              onChange={e => setPhoneBatteryCharging(e.target.value)}
                              placeholder="45W wired, PD3.0"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-medium text-emerald-600 dark:text-emerald-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Misc */}
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🎨</span> Misc
                        </span>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Colors
                          </label>
                          <input
                            type="text"
                            value={phoneMiscColors}
                            onChange={e => setPhoneMiscColors(e.target.value)}
                            placeholder="Mecha Silver, Shadow Dark, Cyber Green"
                            className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                          />
                        </div>
                      </div>

                      {/* Gaming Test Benchmarks */}
                      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                          <span>🎮</span> Gaming Benchmark & Lab Stress Tests
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              PUBG Gaming Test *
                            </label>
                            <input
                              type="text"
                              value={newPhoneGamingFps}
                              onChange={e => setNewPhoneGamingFps(e.target.value)}
                              placeholder="Steady 90 FPS"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-emerald-300 dark:border-emerald-700 font-bold text-emerald-600 dark:text-emerald-400"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Free Fire FPS
                            </label>
                            <input
                              type="text"
                              value={phoneFreeFireFps}
                              onChange={e => setPhoneFreeFireFps(e.target.value)}
                              placeholder="120 FPS"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Peak Thermal Temp
                            </label>
                            <input
                              type="text"
                              value={phoneHeating}
                              onChange={e => setPhoneHeating(e.target.value)}
                              placeholder="41.2°C peak"
                              className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Smartphone Photo Upload & Visual Media */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                        4. Smartphone Photo Upload & Visual Media
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Upload high-resolution smartphone photo directly from your device, paste an image link, or choose from our studio presets.
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
                      {/* Photo Upload Area */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0">
                          <Upload className="w-4 h-4" />
                          <span>Upload Photo from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => handleImageFileUpload(e, setNewPhoneImage)}
                          />
                        </label>
                        <span className="text-xs text-slate-400 font-medium">or enter web photo link below:</span>
                      </div>

                      {/* Image URL input */}
                      <div className="flex gap-2 items-center">
                        <input
                          type="url"
                          value={newPhoneImage}
                          onChange={e => setNewPhoneImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="flex-1 px-3.5 py-2 text-xs bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
                        />
                        {newPhoneImage && (
                          <div className="relative group shrink-0">
                            <img
                              src={newPhoneImage}
                              alt="Phone upload"
                              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setNewPhoneImage('')}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs"
                              title="Remove photo"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Curated Presets */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400 mr-1">Studio Presets:</span>
                        {presetImages.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setNewPhoneImage(preset.url)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
                              newPhoneImage === preset.url
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 5. Mobile Post Live Summary Preview with Photo & Social Share */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                          5. Mobile Post Live Summary Preview & Social Sharing
                        </span>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Live real-time preview of the phone summary card, generated editorial breakdown, and social share buttons.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={generatePhoneSummary}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-200 dark:border-emerald-800"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✨ Generate Tech Summary</span>
                      </button>
                    </div>

                    {/* GSM Arena Summary Card Preview */}
                    <div className="rounded-3xl overflow-hidden shadow-md">
                      <GsmSummaryCard phone={previewPhone} />
                    </div>

                    {/* Generated Paragraph Summary Box */}
                    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                          Auto-Compiled Editorial Post Summary:
                        </label>
                        <span className="text-[10px] text-slate-400">
                          Included on article & social share cards
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={newPhoneSummary || newPhoneVerdict}
                        onChange={e => {
                          setNewPhoneSummary(e.target.value);
                          setNewPhoneVerdict(e.target.value);
                        }}
                        placeholder="Click 'Generate Tech Summary' above to automatically synthesize all hardware specs, prices, and test results into a polished summary..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 leading-relaxed text-slate-800 dark:text-slate-200 focus:outline-none"
                      />

                      {/* Live Social Share Bar Preview */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                            Social Media Share Preview:
                          </span>
                          <SocialShare
                            title={`${newPhoneBrand || 'Infinix'} ${newPhoneName || 'Smartphone'} — Full Specifications & Review`}
                            description={newPhoneSummary || newPhoneVerdict}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 italic">
                          100% Mobile Responsive Share Buttons
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 6. YouTube Review Embed & Editorial Verdict */}
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                      6. YouTube Review Embed & Editorial Verdict
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          YouTube Video ID (Embedded Video Review)
                        </label>
                        <div className="relative">
                          <Youtube className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={newPhoneYoutubeId}
                            onChange={e => setNewPhoneYoutubeId(e.target.value)}
                            placeholder="e.g. 8iU8LPEa4o0"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Release Year / Badge
                        </label>
                        <input
                          type="text"
                          defaultValue="2026 · Official Lab Test"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Pros (Separated by commas)
                        </label>
                        <input
                          type="text"
                          value={newPhonePros}
                          onChange={e => setNewPhonePros(e.target.value)}
                          placeholder="Smooth 144Hz AMOLED, 90 FPS PUBG, Fast charging"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Cons (Separated by commas)
                        </label>
                        <input
                          type="text"
                          value={newPhoneCons}
                          onChange={e => setNewPhoneCons(e.target.value)}
                          placeholder="No dedicated ultrawide lens, Plastic frame"
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Munshi's Overall Editorial Verdict
                      </label>
                      <textarea
                        rows={2}
                        value={newPhoneVerdict}
                        onChange={e => setNewPhoneVerdict(e.target.value)}
                        placeholder="Summarize whether this phone is recommended for gamers or general users..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Smartphone Record</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FORM: POST TYPE 3 - YOUTUBE VIDEO EMBED */}
              {postType === 'video' && (
                <form onSubmit={handlePublishPost} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        YouTube Video Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={newVideoTitle}
                        onChange={e => setNewVideoTitle(e.target.value)}
                        placeholder="e.g. Infinix GT 30 Full Review — 90 FPS Gaming, Heating Test & Battery Drain!"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          YouTube Video ID *
                        </label>
                        <div className="relative">
                          <Youtube className="w-4 h-4 text-red-500 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            value={newVideoYoutubeId}
                            onChange={e => {
                              const val = e.target.value;
                              setNewVideoYoutubeId(val);
                              if (val.trim() && !newVideoThumbnail) {
                                setNewVideoThumbnail(`https://img.youtube.com/vi/${val.trim()}/hqdefault.jpg`);
                              }
                            }}
                            placeholder="e.g. 8iU8LPEa4o0"
                            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Video Category
                        </label>
                        <select
                          value={newVideoType}
                          onChange={e => setNewVideoType(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        >
                          <option value="Review">Full Review</option>
                          <option value="Gaming Test">Gaming Test</option>
                          <option value="Comparison">Comparison</option>
                          <option value="Unboxing">Unboxing</option>
                          <option value="Guide">Tech Guide</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Linked Smartphone
                        </label>
                        <select
                          value={newVideoLinkedPhone}
                          onChange={e => setNewVideoLinkedPhone(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        >
                          {mobiles.map(p => (
                            <option key={p.id} value={p.slug}>
                              {p.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Video Duration
                        </label>
                        <input
                          type="text"
                          value={newVideoDuration}
                          onChange={e => setNewVideoDuration(e.target.value)}
                          placeholder="e.g. 16:42"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          View Count
                        </label>
                        <input
                          type="text"
                          value={newVideoViews}
                          onChange={e => setNewVideoViews(e.target.value)}
                          placeholder="e.g. 185K views"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Upload Date
                        </label>
                        <input
                          type="text"
                          value={newVideoUploadDate}
                          onChange={e => setNewVideoUploadDate(e.target.value)}
                          placeholder="e.g. Just now or 3 days ago"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Thumbnail URL (Auto-filled from YouTube ID or custom)
                      </label>
                      <input
                        type="url"
                        value={newVideoThumbnail}
                        onChange={e => setNewVideoThumbnail(e.target.value)}
                        placeholder="https://img.youtube.com/vi/..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Video Description
                      </label>
                      <textarea
                        rows={3}
                        value={newVideoDescription}
                        onChange={e => setNewVideoDescription(e.target.value)}
                        placeholder="What topics, tests, and benchmarks are covered in this YouTube video?"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featuredVideoCheck"
                        checked={newVideoFeatured}
                        onChange={e => setNewVideoFeatured(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="featuredVideoCheck" className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Feature this video as Hero highlight on YouTube Videos page
                      </label>
                    </div>

                    {/* LIVE EMBED PREVIEW */}
                    {newVideoYoutubeId.trim() && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Live YouTube Player Preview:
                        </span>
                        <div className="aspect-video max-w-lg rounded-2xl overflow-hidden shadow-md bg-black">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${newVideoYoutubeId.trim()}`}
                            title="YouTube Preview"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-500/20 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Video to Channel Hub</span>
                    </button>
                  </div>
                </form>
              )}

              {/* FORM: POST TYPE 4 - TECH GUIDE */}
              {postType === 'guide' && (
                <form onSubmit={handlePublishPost} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Guide Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={e => handleTitleChange(e.target.value)}
                        placeholder="e.g. How to Choose the Perfect Smartphone in 2025: A Practical Buyer's Guide"
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={postSlug}
                          onChange={e => setPostSlug(e.target.value)}
                          placeholder="how-to-choose-smartphone-2025"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                        />
                        <span className="text-[10px] text-slate-400 mt-1 block font-mono">
                          Target URL: #/guides/{postSlug || 'your-guide-slug'}
                        </span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Estimated Read Time
                        </label>
                        <input
                          type="text"
                          value={postReadTime}
                          onChange={e => setPostReadTime(e.target.value)}
                          placeholder="e.g. 8 min read"
                          className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                        />
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Guide Header Cover Image URL:
                      </label>
                      <input
                        type="url"
                        required
                        value={postImage}
                        onChange={e => setPostImage(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] text-slate-400 mr-1">Presets:</span>
                        {presetImages.map((preset, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => setPostImage(preset.url)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium border transition-colors ${
                              postImage === preset.url
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Guide Summary / Core Takeaway *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={postSummary}
                        onChange={e => setPostSummary(e.target.value)}
                        placeholder="Explain who this guide is for and what they will learn..."
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                      />
                    </div>

                    {/* Body */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Guide Body Content * (Separate paragraphs with double Enter)
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={postContent}
                        onChange={e => setPostContent(e.target.value)}
                        placeholder="Detail your buying advice, step-by-step technical explanations, spec myths to avoid..."
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-500/20 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publish Tech Guide</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: MANAGE POSTS TABLE (ALL 4 CONTENT TYPES) */}
          {activeTab === 'manage-posts' && (
            <div className="bg-white dark:bg-[#0f111a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    Published Content Directory
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Managing {reviews.length} written reviews, {mobiles.length} smartphones, {videos.length} videos, and {guides.length} tech guides.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={manageSearchQuery}
                      onChange={e => setManageSearchQuery(e.target.value)}
                      placeholder="Search content..."
                      className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => setActiveTab('create-post')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Post</span>
                  </button>
                </div>
              </div>

              {/* Sub-tab Switchers */}
              <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setManageSubTab('all')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    manageSubTab === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  All ({reviews.length + mobiles.length + videos.length + guides.length})
                </button>

                <button
                  onClick={() => setManageSubTab('reviews')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                    manageSubTab === 'reviews'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Reviews ({reviews.length})</span>
                </button>

                <button
                  onClick={() => setManageSubTab('mobiles')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                    manageSubTab === 'mobiles'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Smartphones ({mobiles.length})</span>
                </button>

                <button
                  onClick={() => setManageSubTab('videos')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                    manageSubTab === 'videos'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Youtube className="w-3.5 h-3.5" />
                  <span>Videos ({videos.length})</span>
                </button>

                <button
                  onClick={() => setManageSubTab('guides')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                    manageSubTab === 'guides'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Guides ({guides.length})</span>
                </button>
              </div>

              {/* LIST 1: REVIEWS */}
              {(manageSubTab === 'all' || manageSubTab === 'reviews') && (
                <div className="space-y-3 pt-2">
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span>Review Articles</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Routes to /reviews
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Title & Cover</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Score</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {reviews
                          .filter(
                            r =>
                              !manageSearchQuery ||
                              r.title.toLowerCase().includes(manageSearchQuery.toLowerCase()) ||
                              r.category.toLowerCase().includes(manageSearchQuery.toLowerCase())
                          )
                          .map(rev => (
                            <tr key={rev.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={rev.image}
                                    alt={rev.title}
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                                  />
                                  <div className="max-w-xs sm:max-w-md">
                                    <h4 className="font-heading font-bold text-slate-900 dark:text-white line-clamp-1">
                                      {rev.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 line-clamp-1">
                                      {rev.shortDescription}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                {rev.category}
                              </td>
                              <td className="py-3 px-3">
                                <span className="font-bold text-blue-600 dark:text-blue-400">
                                  {rev.score ? `${rev.score}/10` : '—'}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                                {rev.date}
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => navigateTo('reviews', rev.slug)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                                  >
                                    View Live
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Delete review "${rev.title}"?`)) {
                                        deleteReview(rev.id);
                                        showToast(`Deleted review "${rev.title}".`);
                                      }
                                    }}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LIST 2: SMARTPHONES */}
              {(manageSubTab === 'all' || manageSubTab === 'mobiles') && (
                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-indigo-600" />
                      <span>Smartphone Hardware Entries</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Routes to /mobile/[slug]
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Phone</th>
                          <th className="py-2.5 px-3">Processor</th>
                          <th className="py-2.5 px-3">Gaming FPS</th>
                          <th className="py-2.5 px-3">Saudi Rate</th>
                          <th className="py-2.5 px-3">BD Rate</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {mobiles
                          .filter(
                            p =>
                              !manageSearchQuery ||
                              p.name.toLowerCase().includes(manageSearchQuery.toLowerCase()) ||
                              p.brand.toLowerCase().includes(manageSearchQuery.toLowerCase())
                          )
                          .map(phone => (
                            <tr key={phone.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={phone.image}
                                    alt={phone.name}
                                    className="w-9 h-9 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                                  />
                                  <div>
                                    <div className="font-heading font-bold text-slate-900 dark:text-white">
                                      {phone.name}
                                    </div>
                                    <span className="text-[10px] text-slate-400">{phone.brand}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                {phone.quickSpecs.processor.split('(')[0]}
                              </td>
                              <td className="py-3 px-3">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                                  {phone.gaming?.pubgFps || '60 FPS'}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-medium">
                                {phone.price.saudi}
                              </td>
                              <td className="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">
                                {phone.price.bangladesh}
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => navigateTo('mobile-detail', phone.slug)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                                  >
                                    View Live
                                  </button>
                                  <button
                                    onClick={() => handleEditPhone(phone)}
                                    className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePhone(phone)}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LIST 3: YOUTUBE VIDEOS */}
              {(manageSubTab === 'all' || manageSubTab === 'videos') && (
                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Youtube className="w-4 h-4 text-red-600" />
                      <span>YouTube Channel Videos</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Routes to /videos
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Video Title & Thumbnail</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3">Duration</th>
                          <th className="py-2.5 px-3">Views</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {videos
                          .filter(
                            v =>
                              !manageSearchQuery ||
                              v.title.toLowerCase().includes(manageSearchQuery.toLowerCase()) ||
                              v.type.toLowerCase().includes(manageSearchQuery.toLowerCase())
                          )
                          .map(vid => (
                            <tr key={vid.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-3">
                                  <div className="relative w-14 h-9 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                                    <img
                                      src={vid.thumbnail}
                                      alt={vid.title}
                                      className="w-full h-full object-cover"
                                    />
                                    {vid.featured && (
                                      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-600" />
                                    )}
                                  </div>
                                  <div className="max-w-xs sm:max-w-md">
                                    <h4 className="font-heading font-bold text-slate-900 dark:text-white line-clamp-1">
                                      {vid.title}
                                    </h4>
                                    <span className="text-[10px] font-mono text-slate-400">
                                      ID: {vid.youtubeId}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400">
                                  {vid.type}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-mono">
                                {vid.duration}
                              </td>
                              <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                                {vid.views}
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => navigateTo('videos')}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                                  >
                                    Watch Live
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Delete video "${vid.title}"?`)) {
                                        deleteVideo(vid.id);
                                        showToast(`Deleted video "${vid.title}".`);
                                      }
                                    }}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LIST 4: TECH GUIDES */}
              {(manageSubTab === 'all' || manageSubTab === 'guides') && (
                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Tech Guides & Articles</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">
                      Routes to /guides
                    </span>
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                          <th className="py-2.5 px-3">Title & Cover</th>
                          <th className="py-2.5 px-3">Read Time</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {guides
                          .filter(
                            g =>
                              !manageSearchQuery ||
                              g.title.toLowerCase().includes(manageSearchQuery.toLowerCase()) ||
                              g.summary.toLowerCase().includes(manageSearchQuery.toLowerCase())
                          )
                          .map(g => (
                            <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={g.featuredImage}
                                    alt={g.title}
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                                  />
                                  <div className="max-w-xs sm:max-w-md">
                                    <h4 className="font-heading font-bold text-slate-900 dark:text-white line-clamp-1">
                                      {g.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 line-clamp-1">
                                      {g.summary}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                {g.readTime}
                              </td>
                              <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                                {g.date}
                              </td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => navigateTo('guides', g.slug)}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                                  >
                                    View Live
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Delete guide "${g.title}"?`)) {
                                        deleteGuide(g.id);
                                        showToast(`Deleted guide "${g.title}".`);
                                      }
                                    }}
                                    className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DEVICE HARDWARE DATABASE */}
          {activeTab === 'mobiles' && (
            <div className="bg-white dark:bg-[#0f111a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    Smartphones Hardware Database
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add, edit, or delete devices. All changes sync in real-time across the client application.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={adminPhoneSearch}
                      onChange={e => setAdminPhoneSearch(e.target.value)}
                      placeholder="Filter devices..."
                      className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAddNewPhone}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Phone</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Device</th>
                      <th className="py-3 px-3">Processor</th>
                      <th className="py-3 px-3">Gaming FPS</th>
                      <th className="py-3 px-3">Saudi Price</th>
                      <th className="py-3 px-3">BD Price</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAdminPhones.map(phone => (
                      <tr key={phone.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={phone.image}
                              alt={phone.name}
                              className="w-9 h-9 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                            />
                            <div>
                              <div className="font-heading font-bold text-slate-900 dark:text-white">
                                {phone.name}
                              </div>
                              <span className="text-[10px] text-slate-400">{phone.brand}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                          {phone.quickSpecs.processor.split('(')[0]}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                            {phone.gaming?.pubgFps || '60 FPS'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-medium">
                          {phone.price.saudi}
                        </td>
                        <td className="py-3 px-3 text-blue-600 dark:text-blue-400 font-bold">
                          {phone.price.bangladesh}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleEditPhone(phone)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                              title="Edit Phone"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePhone(phone)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-colors"
                              title="Delete Phone"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: REGIONAL PRICE ENGINE */}
          {activeTab === 'prices' && (
            <div className="bg-white dark:bg-[#0f111a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                    Regional Price Synchronization Engine
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Update verified retail and market pricing for Saudi Arabia (SAR) and Bangladesh (BDT).
                  </p>
                </div>

                <button
                  onClick={handleSaveAllPrices}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Price Changes</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3">Device Name</th>
                      <th className="py-3 px-3">Saudi Arabia Rate (SAR)</th>
                      <th className="py-3 px-3">Bangladesh Rate (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {mobiles.map(phone => {
                      const saudiVal = priceUpdates[phone.id]?.saudi ?? phone.price.saudi;
                      const bdVal = priceUpdates[phone.id]?.bangladesh ?? phone.price.bangladesh;

                      return (
                        <tr key={phone.id}>
                          <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                            {phone.name} ({phone.brand})
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={saudiVal}
                              onChange={e =>
                                setPriceUpdates({
                                  ...priceUpdates,
                                  [phone.id]: {
                                    saudi: e.target.value,
                                    bangladesh: bdVal,
                                  },
                                })
                              }
                              className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
                            />
                          </td>
                          <td className="py-3 px-3">
                            <input
                              type="text"
                              value={bdVal}
                              onChange={e =>
                                setPriceUpdates({
                                  ...priceUpdates,
                                  [phone.id]: {
                                    saudi: saudiVal,
                                    bangladesh: e.target.value,
                                  },
                                })
                              }
                              className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DATA EXPORT & BACKUP */}
          {activeTab === 'export' && (
            <div className="bg-white dark:bg-[#0f111a] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div>
                <h2 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
                  Database Export & Factory Seed Tools
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Export the active smartphone database in clean JSON format or restore default factory seed data.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleExportJSON}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download mobiles.json</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(mobiles, null, 2));
                    showToast('Full JSON copied to clipboard!');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition-colors"
                >
                  Copy JSON to Clipboard
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset database to default seed state? Custom additions will be cleared.')) {
                      resetMobilesToDefault();
                      showToast('Database reset to defaults.');
                    }
                  }}
                  className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Active JSON Payload Preview ({mobiles.length} objects)
                </span>
                <pre className="p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] max-h-80 overflow-y-auto leading-relaxed border border-slate-800">
                  {JSON.stringify(mobiles, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT PHONE */}
      {isEditingPhone && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsEditingPhone(false)}
        >
          <div
            className="w-full max-w-3xl bg-white dark:bg-[#0f111a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                {editingPhoneId ? 'Edit Smartphone Hardware Specs' : 'Add New Smartphone to Database'}
              </h3>
              <button
                onClick={() => setIsEditingPhone(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePhone} className="space-y-6 text-xs sm:text-sm">
              <div className="space-y-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                  1. Brand & Identity
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={phoneFormData.brand || ''}
                      onChange={e => setPhoneFormData({ ...phoneFormData, brand: e.target.value })}
                      placeholder="e.g. Infinix, Samsung, Xiaomi"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Model Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={phoneFormData.name || ''}
                      onChange={e => setPhoneFormData({ ...phoneFormData, name: e.target.value })}
                      placeholder="e.g. Infinix GT 30"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.slug || ''}
                      onChange={e => setPhoneFormData({ ...phoneFormData, slug: e.target.value })}
                      placeholder="e.g. infinix-gt-30"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Regional Pricing */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  2. Regional Pricing
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      🇸🇦 Saudi Arabia Price (SAR)
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.price?.saudi || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          price: { ...(phoneFormData.price as any), saudi: e.target.value },
                        })
                      }
                      placeholder="e.g. SAR 1,099"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      🇧🇩 Bangladesh Price (BDT)
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.price?.bangladesh || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          price: { ...(phoneFormData.price as any), bangladesh: e.target.value },
                        })
                      }
                      placeholder="e.g. ৳ 29,999"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Hardware Highlights */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block">
                  3. Key Hardware Specs
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Processor / Chipset
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.performance?.chipset || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          performance: { ...(phoneFormData.performance as any), chipset: e.target.value },
                        })
                      }
                      placeholder="e.g. MediaTek Dimensity 8200 Ultimate"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Display Panel & Refresh Rate
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.quickSpecs?.display || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          quickSpecs: { ...(phoneFormData.quickSpecs as any), display: e.target.value },
                        })
                      }
                      placeholder='e.g. 6.78" 144Hz AMOLED'
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      RAM & Storage
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.quickSpecs?.ram || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          quickSpecs: {
                            ...(phoneFormData.quickSpecs as any),
                            ram: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. 12GB LPDDR5X"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Battery & Fast Charging
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.quickSpecs?.battery || ''}
                      onChange={e =>
                        setPhoneFormData({
                          ...phoneFormData,
                          quickSpecs: {
                            ...(phoneFormData.quickSpecs as any),
                            battery: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. 5000 mAh · 45W"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* YouTube Video ID & Image */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
                  4. Media & Video Embed
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      YouTube Video ID
                    </label>
                    <input
                      type="text"
                      value={phoneFormData.youtubeVideoId || ''}
                      onChange={e => setPhoneFormData({ ...phoneFormData, youtubeVideoId: e.target.value })}
                      placeholder="e.g. 8iU8LPEa4o0"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={phoneFormData.image || ''}
                      onChange={e => setPhoneFormData({ ...phoneFormData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingPhone(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Smartphone Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
