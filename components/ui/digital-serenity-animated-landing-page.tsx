'use client';

import React, { useState, useEffect, useRef } from 'react';

interface MouseGradientStyle {
  left: string;
  top: string;
  opacity: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const DigitalSerenity: React.FC = () => {
  const [mouseGradientStyle, setMouseGradientStyle] = useState<MouseGradientStyle>({
    left: '0px',
    top: '0px',
    opacity: 0,
  });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const floatingElementsRef = useRef<HTMLElement[]>([]);

  // Word appear animation on mount
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const wordElements = document.querySelectorAll<HTMLElement>('.word-animate');
      wordElements.forEach((word) => {
        const delay = parseInt(word.getAttribute('data-delay') ?? '0', 10);
        setTimeout(() => {
          if (word) word.style.animation = 'word-appear 0.8s ease-out forwards';
        }, delay);
      });
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Mouse gradient tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseGradientStyle({ left: `${e.clientX}px`, top: `${e.clientY}px`, opacity: 1 });
    };
    const handleMouseLeave = () => {
      setMouseGradientStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Click ripple effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1000);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  // Word hover glow effect
  useEffect(() => {
    const wordElements = document.querySelectorAll<HTMLElement>('.word-animate');
    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) target.style.textShadow = '0 0 20px rgba(203, 213, 225, 0.5)';
    };
    const handleLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target) target.style.textShadow = 'none';
    };
    wordElements.forEach((word) => {
      word.addEventListener('mouseenter', handleEnter);
      word.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      wordElements.forEach((word) => {
        word.removeEventListener('mouseenter', handleEnter);
        word.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  // Floating elements on scroll
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.floating-element-animate');
    floatingElementsRef.current = Array.from(elements);
    const handleScroll = () => {
      if (!scrolled) {
        setScrolled(true);
        floatingElementsRef.current.forEach((el, index) => {
          const delay = parseFloat(el.style.animationDelay ?? '0') * 1000;
          setTimeout(() => {
            if (el) {
              el.style.animationPlayState = 'running';
              el.style.opacity = '';
            }
          }, delay + index * 100);
        });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const pageStyles = `
    #mouse-gradient-react {
      position: fixed;
      pointer-events: none;
      border-radius: 9999px;
      background-image: radial-gradient(circle, rgba(156, 163, 175, 0.05), rgba(107, 114, 128, 0.05), transparent 70%);
      transform: translate(-50%, -50%);
      will-change: left, top, opacity;
      transition: left 70ms linear, top 70ms linear, opacity 300ms ease-out;
    }
    @keyframes word-appear {
      0%   { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); }
      50%  { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); }
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
    }
    @keyframes grid-draw {
      0%   { stroke-dashoffset: 1000; opacity: 0; }
      50%  { opacity: 0.3; }
      100% { stroke-dashoffset: 0; opacity: 0.15; }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50%       { opacity: 0.3; transform: scale(1.1); }
    }
    @keyframes underline-grow { to { width: 100%; } }
    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
      25%  { transform: translateY(-10px) translateX(5px); opacity: 0.6; }
      50%  { transform: translateY(-5px) translateX(-3px); opacity: 0.4; }
      75%  { transform: translateY(-15px) translateX(7px); opacity: 0.8; }
    }
    .word-animate {
      display: inline-block;
      opacity: 0;
      margin: 0 0.1em;
      transition: color 0.3s ease, transform 0.3s ease;
    }
    .word-animate:hover { color: #cbd5e1; transform: translateY(-2px); }
    .grid-line {
      stroke: #94a3b8;
      stroke-width: 0.5;
      opacity: 0;
      stroke-dasharray: 5 5;
      stroke-dashoffset: 1000;
      animation: grid-draw 2s ease-out forwards;
    }
    .detail-dot { fill: #cbd5e1; opacity: 0; animation: pulse-glow 3s ease-in-out infinite; }
    .corner-element-animate {
      position: absolute; width: 40px; height: 40px;
      border: 1px solid rgba(203, 213, 225, 0.2);
      opacity: 0;
      animation: word-appear 1s ease-out forwards;
    }
    .text-decoration-animate { position: relative; }
    .text-decoration-animate::after {
      content: '';
      position: absolute; bottom: -4px; left: 0;
      width: 0; height: 1px;
      background: linear-gradient(90deg, transparent, #cbd5e1, transparent);
      animation: underline-grow 2s ease-out forwards;
      animation-delay: 2s;
    }
    .floating-element-animate {
      position: absolute; width: 2px; height: 2px;
      background: #cbd5e1; border-radius: 50%;
      opacity: 0;
      animation: float 4s ease-in-out infinite;
      animation-play-state: paused;
    }
    .ripple-effect {
      position: fixed; width: 4px; height: 4px;
      background: rgba(203, 213, 225, 0.6);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: pulse-glow 1s ease-out forwards;
      z-index: 9999;
    }
  `;

  return (
    <>
      <style>{pageStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-800 text-slate-100 overflow-hidden relative">

        {/* SVG background grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="gridReact" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(100, 116, 139, 0.1)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridReact)" />
          <line x1="0" y1="20%" x2="100%" y2="20%" className="grid-line" style={{ animationDelay: '0.5s' }} />
          <line x1="0" y1="80%" x2="100%" y2="80%" className="grid-line" style={{ animationDelay: '1s' }} />
          <line x1="20%" y1="0" x2="20%" y2="100%" className="grid-line" style={{ animationDelay: '1.5s' }} />
          <line x1="80%" y1="0" x2="80%" y2="100%" className="grid-line" style={{ animationDelay: '2s' }} />
          <line x1="50%" y1="0" x2="50%" y2="100%" className="grid-line" style={{ animationDelay: '2.5s', opacity: '0.05' }} />
          <line x1="0" y1="50%" x2="100%" y2="50%" className="grid-line" style={{ animationDelay: '3s', opacity: '0.05' }} />
          <circle cx="20%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3s' }} />
          <circle cx="80%" cy="20%" r="2" className="detail-dot" style={{ animationDelay: '3.2s' }} />
          <circle cx="20%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.4s' }} />
          <circle cx="80%" cy="80%" r="2" className="detail-dot" style={{ animationDelay: '3.6s' }} />
          <circle cx="50%" cy="50%" r="1.5" className="detail-dot" style={{ animationDelay: '4s' }} />
        </svg>

        {/* Corner decorations */}
        {[
          { pos: 'top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8', delay: '4s', dot: 'top-0 left-0' },
          { pos: 'top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8', delay: '4.2s', dot: 'top-0 right-0' },
          { pos: 'bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8', delay: '4.4s', dot: 'bottom-0 left-0' },
          { pos: 'bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8', delay: '4.6s', dot: 'bottom-0 right-0' },
        ].map(({ pos, delay, dot }, i) => (
          <div key={i} className={`corner-element-animate ${pos}`} style={{ animationDelay: delay }}>
            <div className={`absolute ${dot} w-2 h-2 bg-slate-300 opacity-30 rounded-full`} />
          </div>
        ))}

        {/* Floating particles */}
        {[
          { top: '25%', left: '15%', delay: '0.5s' },
          { top: '60%', left: '85%', delay: '1s' },
          { top: '40%', left: '10%', delay: '1.5s' },
          { top: '75%', left: '90%', delay: '2s' },
        ].map(({ top, left, delay }, i) => (
          <div
            key={i}
            className="floating-element-animate"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        {/* Main content */}
        <div className="relative z-10 min-h-screen flex flex-col justify-between items-center px-6 py-10 sm:px-8 sm:py-12 md:px-16 md:py-20">
          {/* Top tagline */}
          <div className="text-center">
            <h2 className="text-xs sm:text-sm font-mono font-light text-slate-300 uppercase tracking-[0.2em] opacity-80">
              <span className="word-animate" data-delay="0">Stillness</span>
              <span className="word-animate" data-delay="300">speaks.</span>
            </h2>
            <div className="mt-4 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 mx-auto" />
          </div>

          {/* Hero heading */}
          <div className="text-center max-w-5xl mx-auto relative">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight text-slate-50 text-decoration-animate">
              <div className="mb-4 md:mb-6">
                <span className="word-animate" data-delay="700">Find</span>
                <span className="word-animate" data-delay="850">your</span>
                <span className="word-animate" data-delay="1000">center,</span>
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin text-slate-300 leading-relaxed tracking-wide">
                <span className="word-animate" data-delay="1400">where</span>
                <span className="word-animate" data-delay="1550">peace</span>
                <span className="word-animate" data-delay="1700">resides</span>
                <span className="word-animate" data-delay="1850">and</span>
                <span className="word-animate" data-delay="2000">clarity</span>
                <span className="word-animate" data-delay="2150">awakens</span>
                <span className="word-animate" data-delay="2300">within</span>
                <span className="word-animate" data-delay="2450">the</span>
                <span className="word-animate" data-delay="2600">soul.</span>
              </div>
            </h1>
            {/* Side accent lines */}
            <div
              className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-px bg-slate-300 opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.2s' }}
            />
            <div
              className="absolute -right-6 sm:-right-8 top-1/2 -translate-y-1/2 w-3 sm:w-4 h-px bg-slate-300 opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '3.4s' }}
            />
          </div>

          {/* Bottom tagline */}
          <div className="text-center">
            <div className="mb-4 w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-30 mx-auto" />
            <h2 className="text-xs sm:text-sm font-mono font-light text-slate-300 uppercase tracking-[0.2em] opacity-80">
              <span className="word-animate" data-delay="3000">Observe,</span>
              <span className="word-animate" data-delay="3200">accept,</span>
              <span className="word-animate" data-delay="3400">let</span>
              <span className="word-animate" data-delay="3550">go.</span>
            </h2>
            <div
              className="mt-6 flex justify-center space-x-4 opacity-0"
              style={{ animation: 'word-appear 1s ease-out forwards', animationDelay: '4.2s' }}
            >
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40" />
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-60" />
              <div className="w-1 h-1 bg-slate-300 rounded-full opacity-40" />
            </div>
          </div>
        </div>

        {/* Mouse gradient */}
        <div
          id="mouse-gradient-react"
          className="w-60 h-60 blur-xl sm:w-80 sm:h-80 sm:blur-2xl md:w-96 md:h-96 md:blur-3xl"
          style={{ left: mouseGradientStyle.left, top: mouseGradientStyle.top, opacity: mouseGradientStyle.opacity }}
        />

        {/* Click ripples */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="ripple-effect"
            style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
          />
        ))}
      </div>
    </>
  );
};

export default DigitalSerenity;
