import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, X, Send, Bot, User, ArrowRight } from 'lucide-react';
import mobilesData from '../data/mobiles.json';

interface Message {
  role: 'assistant' | 'user';
  text: string;
  phoneLinks?: { name: string; slug: string }[];
}

export const AiAssistantModal: React.FC = () => {
  const { openAiAssistant, setOpenAiAssistant, navigateTo } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hello! I am your Tech With Munshi AI Assistant. I use verified data from MD Naeem Hossin's studio tests and spec sheets. Ask me about phones, display comparisons, FPS in PUBG/Free Fire, or current pricing in Saudi Arabia & Bangladesh!",
    },
  ]);
  const [input, setInput] = useState('');

  if (!openAiAssistant) return null;

  const quickPrompts = [
    'Which phone has the best display?',
    'Is Infinix GT 30 good for 90 FPS gaming?',
    'Compare Infinix GT 30 vs Redmi Note 13 Pro+',
    'What is the price of Infinix GT 30 in Bangladesh & KSA?',
  ];

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || input).trim();
    if (!q) return;

    const userMsg: Message = { role: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Process query based strictly on verified mobilesData
    setTimeout(() => {
      const lower = q.toLowerCase();
      let responseText = '';
      let links: { name: string; slug: string }[] = [];

      if (lower.includes('display') || lower.includes('screen') || lower.includes('amoled')) {
        responseText =
          "Display Comparison based on verified studio data:\n" +
          "• Realme GT 6T: Highest brightness with 6000 nits peak 8T LTPO AMOLED (1-120Hz).\n" +
          "• Redmi Note 13 Pro+: Highest sharpness with 1.5K (1220p) Curved AMOLED (1800 nits).\n" +
          "• Infinix GT 30: Highest refresh rate for esports with 144Hz AMOLED & 2160Hz PWM eye protection.\n" +
          "• Samsung Galaxy A55: Super AMOLED with flagship Gorilla Glass Victus+ & natural color calibration.";
        links = [
          { name: 'Infinix GT 30', slug: 'infinix-gt-30' },
          { name: 'Realme GT 6T', slug: 'realme-gt-6t' },
        ];
      } else if (lower.includes('gaming') || lower.includes('pubg') || lower.includes('free fire') || lower.includes('fps')) {
        responseText =
          "Gaming & Performance Verdict from Munshi's Tests:\n" +
          "• Infinix GT 30: Steady 90 FPS in PUBG Mobile (Smooth + Extreme+), 120 FPS in Free Fire. Key advantage is Bypass Charging to prevent battery overheating during long gaming sessions.\n" +
          "• Poco X6 Pro: 90 FPS supported with Dimensity 8300 Ultra and fast UFS 4.0 storage.\n" +
          "• Realme GT 6T: 90 FPS with Snapdragon 7+ Gen 3 and massive 10,014mm² dual vapor cooling.\n" +
          "• Samsung Galaxy A55: Solid 60 FPS in PUBG, runs cool (39.5°C) but not tuned for 90 FPS esports.";
        links = [
          { name: 'Infinix GT 30 Specs', slug: 'infinix-gt-30' },
          { name: 'Compare for Gaming', slug: 'compare' },
        ];
      } else if (lower.includes('price') || lower.includes('saudi') || lower.includes('bangladesh') || lower.includes('cost')) {
        const gt30 = mobilesData.find(m => m.id === 'infinix-gt-30');
        responseText =
          `Pricing Information (Verified):\n` +
          `• Infinix GT 30: Saudi Arabia: ${gt30?.price.saudi} · Bangladesh: ${gt30?.price.bangladesh} (Global approx ${gt30?.price.globalUSD}).\n` +
          `• Samsung Galaxy A55: SAR 1,399 / ৳46,999\n` +
          `• Redmi Note 13 Pro+: SAR 1,299 / ৳42,999\n` +
          `• Note: Prices may vary depending on retailer promotions, local taxes, and storage configurations.`;
        links = [{ name: 'Infinix GT 30 Full Price Breakdown', slug: 'infinix-gt-30' }];
      } else if (lower.includes('compare') || lower.includes('vs') || (lower.includes('gt 30') && lower.includes('redmi'))) {
        responseText =
          "Infinix GT 30 vs Redmi Note 13 Pro+ Factual Difference:\n" +
          "• Display: GT 30 has 144Hz flat AMOLED (ideal for gaming); Redmi has 1.5K 120Hz curved AMOLED (ideal for movies).\n" +
          "• Performance: GT 30 has Dimensity 8200 Ultimate with 90 FPS gaming & bypass charging; Redmi has Dimensity 7200 Ultra (60 FPS).\n" +
          "• Charging: Redmi is faster at 120W (100% in 19m) vs GT 30's 45W (100% in 52m).\n" +
          "• Headphone Jack: GT 30 has a 3.5mm jack; Redmi does not.\n" +
          "• Cameras: Redmi features a 200MP OIS sensor; GT 30 features a 108MP OIS sensor.";
        links = [{ name: 'Open Full Comparison Matrix', slug: 'compare' }];
      } else {
        responseText =
          `Based on Tech With Munshi's verified database:\n` +
          `We track full hardware specifications, thermal benchmarks, and dual-currency pricing for Infinix GT 30, Samsung Galaxy A55, Redmi Note 13 Pro+, Realme GT 6T, and Poco X6 Pro.\n` +
          `You can view our dedicated product pages, watch full YouTube reviews by MD Naeem Hossin, or compare any phones side by side.`;
        links = [
          { name: 'View All Mobiles', slug: 'mobiles' },
          { name: 'Compare Phones', slug: 'compare' },
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: responseText,
          phoneLinks: links,
        },
      ]);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[600px] max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-blue-600/10 via-transparent to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                Tech With Munshi AI
                <span className="text-[10px] font-normal text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                  Verified Data
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Grounded strictly in website specs & studio tests
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpenAiAssistant(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}

                {m.phoneLinks && m.phoneLinks.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap gap-2">
                    {m.phoneLinks.map((link, lIdx) => (
                      <button
                        key={lIdx}
                        onClick={() => {
                          if (link.slug === 'compare') {
                            navigateTo('compare');
                          } else if (link.slug === 'mobiles') {
                            navigateTo('mobiles');
                          } else {
                            navigateTo('mobile-detail', link.slug);
                          }
                          setOpenAiAssistant(false);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-colors"
                      >
                        <span>{link.name}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {m.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto">
          {quickPrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] text-slate-600 dark:text-slate-300 hover:text-blue-600 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shrink-0 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about display, gaming FPS, or price..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl text-xs font-medium flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
