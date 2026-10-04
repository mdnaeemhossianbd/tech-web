export type Language = 'en' | 'bn' | 'ar' | 'es';

export interface MobilePhone {
  id: string;
  brand: string;
  name: string;
  slug: string;
  image: string;
  badge?: string;
  releaseDate: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  price: {
    saudi: string;
    bangladesh: string;
    globalUSD?: string;
  };
  quickSpecs: {
    display: string;
    processor: string;
    ram: string;
    storage: string;
    battery: string;
    charging: string;
    camera: string;
    os: string;
  };
  display: {
    type: string;
    size: string;
    resolution: string;
    refreshRate?: string;
    brightness?: string;
    protection?: string;
  };
  performance: {
    chipset: string;
    cpu: string;
    gpu: string;
  };
  platform?: {
    os: string;
    ui?: string;
    chipset: string;
    cpu: string;
    gpu: string;
  };
  memory: {
    ram: string;
    storage: string;
    cardSupport?: string;
    cardSlot?: string;
    internal?: string;
  };
  camera: {
    rear: string;
    front: string;
    features: string;
    video: string;
  };
  mainCamera?: {
    single?: string;
    setup?: string;
    features: string;
    video: string;
  };
  selfieCamera?: {
    single?: string;
    setup?: string;
    video: string;
    features?: string;
  };
  battery: {
    type?: string;
    capacity: string;
    charging: string;
    wirelessCharging?: string;
    reverseCharging?: string;
  };
  network: {
    technology: string;
    fiveG?: boolean;
    sim: string;
    wifi?: string;
    bluetooth?: string;
    nfc?: string;
    gps?: string;
  };
  body: {
    dimensions: string;
    weight: string;
    build: string;
    sim?: string;
    colors: string;
  };
  sound: {
    speaker?: string;
    loudspeaker?: string;
    headphoneJack: string;
    audioFeatures?: string;
  };
  connectivity: {
    usb: string;
    wifi: string;
    bluetooth: string;
    nfc: string;
  };
  comms?: {
    wlan: string;
    bluetooth: string;
    positioning: string;
    nfc: string;
    radio: string;
    usb: string;
  };
  security: {
    fingerprint: string;
    faceUnlock: string;
  };
  features?: {
    sensors: string;
  };
  software: {
    os: string;
    ui: string;
  };
  misc?: {
    colors: string;
    hits?: string;
    fans?: number;
    popularity?: string;
  };
  gaming?: {
    pubgFps: string;
    freeFireFps?: string;
    genshinImpact?: string;
    heating?: string;
    stability?: string;
    bypassCharging?: string;
  };
  benchmarks?: {
    antutu: string;
    geekbenchSingle: string;
    geekbenchMulti: string;
  };
  youtubeVideoId: string;
  gallery: {
    url: string;
    caption: string;
    category: string;
  }[];
  pros: string[];
  cons: string[];
  review: {
    verdict: string;
    design: string;
    display: string;
    performance: string;
    gaming: string;
    camera: string;
    battery: string;
    software: string;
    overall: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedPhoneSlugs: string[];
}

export interface ReviewItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  shortDescription: string;
  author: string;
  date: string;
  readTime: string;
  score?: number;
  youtubeVideoId?: string;
  linkedPhoneSlug?: string;
  content: string[];
}

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  type: string;
  thumbnail: string;
  duration: string;
  views: string;
  uploadDate: string;
  featured?: boolean;
  linkedPhoneSlug?: string;
  description: string;
}

export interface GuideItem {
  id: string;
  slug: string;
  title: string;
  featuredImage: string;
  readTime: string;
  date: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
  }[];
  relatedProductSlugs: string[];
  relatedVideoIds: string[];
}
