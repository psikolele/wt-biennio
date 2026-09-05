"use client";

import React, { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Code2, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  XCircle, 
  ChevronRight,
  ExternalLink,
  Laptop
} from "lucide-react";

// --- Types ---
interface Milestone {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ElementType;
}

interface Resource {
  title: string;
  links: { name: string; url: string }[];
}

interface Point {
  text: string;
  points: number;
}

// --- Content Data ---
const MILESTONES: Milestone[] = [
  {
    id: "setup",
    title: "Setup & Struttura",
    description: "La base di tutto. Configura il progetto e scrivi un HTML solido.",
    icon: Code2,
    items: [
      "Cartella del progetto e file base (index.html, style.css, assets/)",
      "Uso esclusivo di HTML5 semantico (<header>, <main>, <article>)",
      "Nessun <div> se esiste un tag semantico migliore"
    ]
  },
  {
    id: "style",
    title: "Stile & Layout",
    description: "Dai vita alla pagina. Formattazione, colori e posizionamento.",
    icon: Layers,
    items: [
      "Variabili CSS (:root) per palette colori e font",
      "Flexbox o CSS Grid per la struttura principale",
      "Design responsivo con Media Queries per mobile"
    ]
  },
  {
    id: "extra",
    title: "Ottimizzazione",
    description: "I dettagli che rendono un sito veramente professionale.",
    icon: Sparkles,
    items: [
      "Immagini ottimizzate e accessibili (alt text)",
      "Effetti hover interattivi e transizioni CSS",
      "Check validazione W3C"
    ]
  }
];

const CHECKLIST: Point[] = [
  { text: "CSS separato collegato tramite <link> — zero stile inline nel body", points: 10 },
  { text: "Variabili CSS (:root { --variabile }) per colori e font", points: 5 },
  { text: "Layout con Flexbox o CSS Grid in almeno una sezione", points: 10 },
  { text: "Almeno 2 immagini con attributo alt compilato", points: 5 },
  { text: "Form contatti con HTML (anche non funzionale)", points: 5 },
  { text: "Media query per mobile (@media max-width: 768px)", points: 10 },
  { text: "Codice validato su validator.w3.org (0 errori critici)", points: 10 },
  { text: "Shortcut VS Code ★ dimostrate durante la presentazione", points: 15 },
  { text: "Presentazione orale (2 min): scelte progettuali e tecniche", points: 15 }
];

const RESOURCES: Resource[] = [
  {
    title: "Documentazione & Strumenti",
    links: [
      { name: "MDN Web Docs — HTML & CSS", url: "https://developer.mozilla.org/it/docs/Web" },
      { name: "W3C Validator", url: "https://validator.w3.org" },
      { name: "VS Code Shortcuts", url: "https://code.visualstudio.com/docs/configure/keybindings" },
      { name: "Flexbox Froggy & Grid Garden", url: "https://flexboxfroggy.com/#it" }
    ]
  },
  {
    title: "Design & Assets",
    links: [
      { name: "Coolors — Palette generator", url: "https://coolors.co" },
      { name: "Google Fonts", url: "https://fonts.google.com" },
      { name: "Unsplash — Immagini HD libere", url: "https://unsplash.com" },
      { name: "Lucide Icons", url: "https://lucide.dev" }
    ]
  }
];

// --- Animations ---
const fadeUpVar: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function DigitalSerenityActivity() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for dynamic glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      containerRef.current.style.setProperty('--mouse-x', `${x}%`);
      containerRef.current.style.setProperty('--mouse-y', `${y}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-hidden relative"
    >
      {/* Dynamic Background Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(79, 70, 229, 0.15), transparent 40%)`
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32">
        
        {/* --- Hero Section --- */}
        <motion.header 
          className="mb-32 text-center flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVar} className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-md shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span className="text-sm font-medium text-zinc-300 tracking-wide uppercase text-xs">
              Progetto Pratico — Informatica 4ª
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUpVar} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.1]">
            Costruisci il tuo <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-cyan-400">
              Primo Sito Web
            </span>
          </motion.h1>
          
          <motion.p variants={fadeUpVar} className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
             Converti un&apos;idea in una realtà digitale. Niente framework, zero scorciatoie. Solo la pura potenza di HTML e CSS.
          </motion.p>
        </motion.header>

        {/* --- The Objective --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVar}
          className="mb-32"
        >
          <div className="relative p-px rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900/10">
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-xl"></div>
            <div className="relative bg-zinc-900/40 rounded-[23px] p-8 md:p-12 border border-zinc-800/50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">L&apos;Obiettivo</h2>
              </div>
              
              <p className="text-lg text-zinc-300 leading-relaxed mb-10 max-w-3xl">
                 Creare un sito statico partendo da zero. Scegli un tema a piacere: un portfolio personale, un negozio per un prodotto fittizio, una landing page per un&apos;app, o una rivista digitale. 
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-zinc-950/50 border border-emerald-900/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <CheckCircle2 className="w-24 h-24 text-emerald-500" />
                  </div>
                  <h3 className="text-emerald-400 font-semibold text-lg mb-4 flex items-center gap-2 relative z-10">
                    <CheckCircle2 className="w-5 h-5" /> Regole d&apos;Oro
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {["Scrivere HTML semantico e pulito", "Disegnare unicamente con CSS puro", "Sfruttare le scorciatoie di VS Code"].map((txt, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 mt-2 flex-shrink-0"></span>
                        {txt}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-zinc-950/50 border border-rose-900/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <XCircle className="w-24 h-24 text-rose-500" />
                  </div>
                  <h3 className="text-rose-400 font-semibold text-lg mb-4 flex items-center gap-2 relative z-10">
                    <XCircle className="w-5 h-5" /> Da Evitare
                  </h3>
                  <ul className="space-y-3 relative z-10">
                    {["Framework CSS (Bootstrap, Tailwind)", "Stile inline nei tag HTML", "Codice copiato senza reale comprensione"].map((txt, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500/50 mt-2 flex-shrink-0"></span>
                        {txt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- Milestones --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <motion.div variants={fadeUpVar} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Le Fasi del Progetto</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">Un approccio strutturato per passare da una cartella vuota a una pagina web funzionante e accattivante.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {MILESTONES.map((ms) => {
              const Icon = ms.icon;
              return (
                <motion.div 
                  key={ms.id}
                  variants={fadeUpVar}
                  className="group relative p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:bg-zinc-800/40 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
                  
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 group-hover:border-indigo-500/30 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{ms.title}</h3>
                  <p className="text-zinc-400 mb-8 leading-relaxed">{ms.description}</p>
                  
                  <ul className="space-y-4">
                    {ms.items.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-300 flex items-start gap-3">
                        <ChevronRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* --- Grading & Resources --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24"
        >
          {/* Checklist */}
          <motion.div variants={fadeUpVar} className="lg:col-span-7 flex flex-col">
            <div className="flex-1 p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight relative z-10">Valutazione Finale</h2>
              
              <div className="space-y-3 mb-8 relative z-10 flex-1">
                {CHECKLIST.map((item, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 hover:bg-zinc-800/80 transition-all duration-300 border border-zinc-800/50 hover:border-indigo-500/20">
                    <div className="flex items-start md:items-center gap-4 pr-4">
                      <div className="w-5 h-5 rounded flex items-center justify-center border border-zinc-700 bg-zinc-900 mt-0.5 md:mt-0 group-hover:border-indigo-500/50 transition-colors shrink-0"></div>
                      <span className="text-zinc-300 text-sm md:text-base">{item.text}</span>
                    </div>
                    <div className="shrink-0 flex items-center justify-center px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-sm font-bold shadow-[0_0_10px_rgba(99,102,241,0.05)]">
                      {item.points}pt
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-sm text-rose-200/80 relative z-10 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500/70 shrink-0 mt-0.5" />
                <p>
                   <strong className="text-rose-400 font-semibold">Attenzione:</strong> L&apos;uso di codice generato da AI o template copiati senza saperne spiegare il funzionamento annullerà il punteggio per il criterio relativo.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resources */}
          <motion.div variants={fadeUpVar} className="lg:col-span-5 flex flex-col">
            <div className="flex-1 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/20 to-zinc-900/40 border border-indigo-500/10 relative overflow-hidden">
              <h2 className="text-3xl font-bold text-white mb-10 tracking-tight flex items-center gap-3">
                <BookOpen className="w-7 h-7 text-indigo-400" />
                Toolkit
              </h2>
              
              <div className="space-y-12 relative z-10">
                {RESOURCES.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-indigo-300/70 uppercase tracking-widest mb-5">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.links.map((link, i) => (
                        <li key={i}>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/40 hover:bg-zinc-900 hover:border-indigo-500/30 transition-all duration-300"
                          >
                            <span className="text-zinc-300 group-hover:text-white transition-colors font-medium text-sm">
                              {link.name}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-zinc-800/50 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                              <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* --- Footer --- */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pb-12 pt-16 border-t border-zinc-800/50"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mb-6 rounded-full"></div>
            <p className="text-zinc-500 font-medium tracking-wide">
              IPTSSCTS G. Pessina — Informatica 4ª Commerciale
            </p>
            <p className="text-zinc-600 text-sm">
              Prof. Serra Emanuele — A.S. 2025/2026
            </p>
          </div>
        </motion.footer>
        
      </div>
    </div>
  );
}
