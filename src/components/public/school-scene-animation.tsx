"use client";

import { useEffect, useState } from "react";

function generatePetals(count: number) {
  const petals = [];
  for (let i = 0; i < count; i++) {
    petals.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      size: 8 + Math.random() * 12,
      sway: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.4 + Math.random() * 0.5,
    });
  }
  return petals;
}

export function SchoolSceneAnimation() {
  const [petals, setPetals] = useState<ReturnType<typeof generatePetals>>([]);

  useEffect(() => {
    setPetals(generatePetals(20));
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden select-none pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nostalgia-card via-nostalgia-bg to-nostalgia-bg" />

      {/* Moon glow */}
      <div className="absolute top-8 right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-nostalgia-primary/20 blur-2xl animate-glow-pulse" />
      <div className="absolute top-10 right-[16%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-nostalgia-secondary/40 blur-sm" />

      {/* Phoenix tree (left) */}
      <svg className="absolute bottom-0 left-[5%] md:left-[10%] w-[140px] md:w-[200px] h-[260px] md:h-[360px]" viewBox="0 0 200 360" fill="none">
        <path d="M95 360 L95 180 Q90 140 80 120 Q70 100 85 80" stroke="#5C3D2E" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M95 240 Q120 200 140 190" stroke="#5C3D2E" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M95 200 Q60 170 40 160" stroke="#5C3D2E" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M85 160 Q110 130 130 110" stroke="#5C3D2E" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="80" cy="80" r="35" fill="#8B2500" opacity="0.7" />
        <circle cx="45" cy="100" r="25" fill="#A0522D" opacity="0.6" />
        <circle cx="120" cy="90" r="30" fill="#8B2500" opacity="0.65" />
        <circle cx="140" cy="120" r="20" fill="#CD3700" opacity="0.5" />
        <circle cx="55" cy="65" r="20" fill="#CD3700" opacity="0.55" />
        <circle cx="100" cy="60" r="25" fill="#A0522D" opacity="0.6" />
        <circle cx="60" cy="75" r="4" fill="#FF4500" opacity="0.8" />
        <circle cx="100" cy="55" r="3" fill="#FF6347" opacity="0.7" />
        <circle cx="130" cy="100" r="4" fill="#FF4500" opacity="0.75" />
        <circle cx="75" cy="95" r="3" fill="#FF6347" opacity="0.7" />
      </svg>

      {/* School gate (center) — open Vietnamese school entrance */}
      <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] sm:w-[320px] md:w-[400px] h-[200px] sm:h-[240px] md:h-[300px]" viewBox="0 0 400 300" fill="none">
        {/* Left pillar — wide, painted, with cap */}
        <rect x="55" y="70" width="35" height="230" fill="#C4A882" />
        <rect x="55" y="70" width="35" height="230" fill="url(#pillarGrad)" />
        <rect x="50" y="60" width="45" height="14" fill="#D4B896" rx="2" />
        <rect x="48" y="54" width="49" height="10" fill="#B8A080" rx="2" />
        {/* Pillar decorative line */}
        <rect x="62" y="90" width="21" height="200" fill="#B8A080" opacity="0.3" rx="1" />

        {/* Right pillar */}
        <rect x="310" y="70" width="35" height="230" fill="#C4A882" />
        <rect x="310" y="70" width="35" height="230" fill="url(#pillarGrad)" />
        <rect x="305" y="60" width="45" height="14" fill="#D4B896" rx="2" />
        <rect x="303" y="54" width="49" height="10" fill="#B8A080" rx="2" />
        <rect x="317" y="90" width="21" height="200" fill="#B8A080" opacity="0.3" rx="1" />

        {/* Arch beam connecting pillars */}
        <rect x="50" y="40" width="300" height="18" fill="#B8A080" rx="3" />
        <rect x="55" y="36" width="290" height="8" fill="#C4A882" rx="2" />

        {/* School name board */}
        <rect x="110" y="5" width="180" height="32" rx="4" fill="#8B2500" />
        <rect x="112" y="7" width="176" height="28" rx="3" fill="#A03020" />
        <text x="200" y="27" textAnchor="middle" fill="#FFF8DC" fontSize="12" fontWeight="bold" fontFamily="Inter, sans-serif">THPT PHAM PHU THU</text>

        {/* Star emblem on top */}
        <polygon points="200,0 203,8 212,8 205,13 208,22 200,17 192,22 195,13 188,8 197,8" fill="#DAA520" opacity="0.7" />

        {/* Low wall extending left */}
        <rect x="0" y="230" width="55" height="70" fill="#C4A882" />
        <rect x="0" y="225" width="55" height="8" fill="#D4B896" rx="1" />

        {/* Low wall extending right */}
        <rect x="345" y="230" width="55" height="70" fill="#C4A882" />
        <rect x="345" y="225" width="55" height="8" fill="#D4B896" rx="1" />

        {/* Open gateway (no bars — welcoming entrance) */}
        {/* Path/walkway through the gate */}
        <path d="M120 300 L160 200 L240 200 L280 300" fill="#8B7355" opacity="0.15" />

        {/* Gradient for pillars */}
        <defs>
          <linearGradient id="pillarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.08" />
          </linearGradient>
        </defs>
      </svg>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#2A1A10] to-transparent" />

      {/* Right scene group: Female student (ao dai) + bicycle + male student */}
      <svg
        className="absolute bottom-2 right-[8%] md:right-[12%] w-[160px] md:w-[220px] h-[100px] md:h-[130px]"
        viewBox="0 0 220 130"
        fill="none"
      >
        {/* === Female student in ao dai (proper Vietnamese ao dai) === */}
        {/* Long straight hair */}
        <ellipse cx="40" cy="14" rx="8" ry="10" fill="#1A0F0A" />
        <path d="M32 14 Q31 35 33 55 L35 55 Q34 30 34 14" fill="#1A0F0A" />
        <path d="M48 14 Q49 35 47 55 L45 55 Q46 30 46 14" fill="#1A0F0A" />
        {/* Face */}
        <ellipse cx="40" cy="15" rx="6" ry="7" fill="#DEB887" />
        {/* Non la (conical hat) */}
        <path d="M28 11 L40 -3 L52 11" fill="#D4A574" opacity="0.8" />
        <line x1="28" y1="11" x2="52" y2="11" stroke="#B8860B" strokeWidth="0.8" />
        {/* Ao dai - form-fitting mandarin collar top */}
        <path d="M35 24 L34 26 L34 60 Q37 61 40 61 Q43 61 46 60 L46 26 L45 24" fill="white" />
        {/* Mandarin collar (co ao) */}
        <path d="M36 24 L40 22 L44 24" stroke="#ddd" strokeWidth="0.8" fill="none" />
        {/* Ao dai front panel - long flowing to ankle */}
        <path d="M34 60 L33 120 Q37 122 40 122 Q40 122 40 60" fill="white" opacity="0.95" />
        {/* Ao dai back panel - long flowing to ankle */}
        <path d="M46 60 L47 120 Q43 122 40 122 Q40 122 40 60" fill="white" opacity="0.85" />
        {/* Wide-leg pants (quan ao dai) visible between panels */}
        <path d="M35 65 L34 128 L38 128 L40 70 L42 128 L46 128 L45 65" fill="white" opacity="0.6" />
        {/* Sleeves - fitted long sleeves */}
        <line x1="34" y1="28" x2="28" y2="55" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="46" y1="28" x2="52" y2="55" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        {/* Hands */}
        <circle cx="28" cy="56" r="2" fill="#DEB887" />
        <circle cx="52" cy="56" r="2" fill="#DEB887" />
        {/* Book in hand */}
        <rect x="50" y="50" width="7" height="10" rx="1" fill="#D4A574" opacity="0.6" />

        {/* === Bicycle === */}
        {/* Back wheel */}
        <circle cx="95" cy="110" r="16" stroke="#8B7355" strokeWidth="2" fill="none" />
        <circle cx="95" cy="110" r="2" fill="#8B7355" />
        {/* Front wheel */}
        <circle cx="145" cy="110" r="16" stroke="#8B7355" strokeWidth="2" fill="none" />
        <circle cx="145" cy="110" r="2" fill="#8B7355" />
        {/* Frame */}
        <path d="M95 110 L115 80 L145 110" stroke="#8B7355" strokeWidth="2.5" fill="none" />
        <path d="M95 110 L125 80 L115 80" stroke="#8B7355" strokeWidth="2.5" fill="none" />
        <line x1="125" y1="80" x2="145" y2="110" stroke="#8B7355" strokeWidth="2" />
        {/* Handlebar */}
        <path d="M125 80 L130 72 M125 80 L120 72" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
        {/* Seat */}
        <line x1="113" y1="76" x2="120" y2="76" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
        {/* Basket (gio xe dap) */}
        <rect x="128" y="68" width="12" height="8" rx="1" stroke="#8B7355" strokeWidth="1.5" fill="none" />
        {/* Spokes hint */}
        <line x1="95" y1="94" x2="95" y2="126" stroke="#8B7355" strokeWidth="0.5" opacity="0.4" />
        <line x1="79" y1="110" x2="111" y2="110" stroke="#8B7355" strokeWidth="0.5" opacity="0.4" />
        <line x1="145" y1="94" x2="145" y2="126" stroke="#8B7355" strokeWidth="0.5" opacity="0.4" />
        <line x1="129" y1="110" x2="161" y2="110" stroke="#8B7355" strokeWidth="0.5" opacity="0.4" />

        {/* === Male student === */}
        {/* Hair */}
        <ellipse cx="185" cy="14" rx="7" ry="8" fill="#1A0F0A" />
        {/* Face */}
        <ellipse cx="185" cy="15" rx="6" ry="7" fill="#DEB887" />
        {/* White shirt */}
        <path d="M179 25 L177 58 L193 58 L191 25" fill="white" />
        {/* Collar */}
        <path d="M180 25 L185 30 L190 25" stroke="#ddd" strokeWidth="0.8" fill="none" />
        {/* Dark pants */}
        <path d="M178 56 L177 128 L183 128 L185 64 L187 128 L193 128 L192 56" fill="#2A1F1A" />
        {/* Sleeves */}
        <line x1="179" y1="28" x2="172" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="191" y1="28" x2="198" y2="50" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        {/* Hands */}
        <circle cx="172" cy="51" r="2" fill="#DEB887" />
        <circle cx="198" cy="51" r="2" fill="#DEB887" />
        {/* Backpack */}
        <rect x="177" y="30" width="10" height="16" rx="3" fill="#5C3D2E" opacity="0.6" />
        <line x1="180" y1="25" x2="179" y2="32" stroke="#8B7355" strokeWidth="1.5" />
        <line x1="190" y1="25" x2="189" y2="32" stroke="#8B7355" strokeWidth="1.5" />
      </svg>

      {/* Background student silhouettes (far left) */}
      <svg className="absolute bottom-1 left-[25%] md:left-[28%] w-[60px] md:w-[80px] h-[40px] md:h-[55px] opacity-20" viewBox="0 0 80 55" fill="none">
        <ellipse cx="15" cy="10" rx="5" ry="6" fill="#8B7355" />
        <rect x="10" y="16" width="10" height="18" rx="2" fill="white" opacity="0.6" />
        <rect x="10" y="33" width="10" height="20" rx="2" fill="#3D2E23" />
        <ellipse cx="38" cy="9" rx="5" ry="6" fill="#8B7355" />
        <rect x="33" y="15" width="10" height="18" rx="2" fill="white" opacity="0.6" />
        <rect x="33" y="32" width="10" height="22" rx="2" fill="white" opacity="0.4" />
        <ellipse cx="60" cy="10" rx="5" ry="6" fill="#8B7355" />
        <rect x="55" y="16" width="10" height="18" rx="2" fill="white" opacity="0.6" />
        <rect x="55" y="33" width="10" height="20" rx="2" fill="#3D2E23" />
      </svg>

      {/* Falling phoenix flower petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            top: "-20px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 16 16" style={{ transform: `rotate(${p.sway * 45}deg)`, opacity: p.opacity }}>
            <path d="M8 0 Q12 4 8 16 Q4 4 8 0Z" fill="#FF4500" opacity="0.8" />
            <path d="M8 2 Q10 6 8 14" stroke="#CD3700" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      ))}
    </div>
  );
}
