"use client";

import { useEffect, useState } from "react";

// Petal positions generated once on mount to avoid hydration mismatch
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPetals(generatePetals(20));
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden select-none pointer-events-none">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-nostalgia-card via-nostalgia-bg to-nostalgia-bg" />

      {/* Moon/sun glow */}
      <div className="absolute top-8 right-[15%] w-16 h-16 md:w-24 md:h-24 rounded-full bg-nostalgia-primary/20 blur-2xl animate-glow-pulse" />
      <div className="absolute top-10 right-[16%] w-8 h-8 md:w-12 md:h-12 rounded-full bg-nostalgia-secondary/40 blur-sm" />

      {/* Phoenix tree (left side) */}
      <svg
        className="absolute bottom-0 left-[5%] md:left-[10%] w-[140px] md:w-[200px] h-[260px] md:h-[360px]"
        viewBox="0 0 200 360"
        fill="none"
      >
        {/* Trunk */}
        <path
          d="M95 360 L95 180 Q90 140 80 120 Q70 100 85 80"
          stroke="#5C3D2E"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M95 240 Q120 200 140 190"
          stroke="#5C3D2E"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M95 200 Q60 170 40 160"
          stroke="#5C3D2E"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M85 160 Q110 130 130 110"
          stroke="#5C3D2E"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Foliage clusters (phoenix tree = red/orange) */}
        <circle cx="80" cy="80" r="35" fill="#8B2500" opacity="0.7" />
        <circle cx="45" cy="100" r="25" fill="#A0522D" opacity="0.6" />
        <circle cx="120" cy="90" r="30" fill="#8B2500" opacity="0.65" />
        <circle cx="140" cy="120" r="20" fill="#CD3700" opacity="0.5" />
        <circle cx="55" cy="65" r="20" fill="#CD3700" opacity="0.55" />
        <circle cx="100" cy="60" r="25" fill="#A0522D" opacity="0.6" />
        {/* Flowers on tree */}
        <circle cx="60" cy="75" r="4" fill="#FF4500" opacity="0.8" />
        <circle cx="100" cy="55" r="3" fill="#FF6347" opacity="0.7" />
        <circle cx="130" cy="100" r="4" fill="#FF4500" opacity="0.75" />
        <circle cx="75" cy="95" r="3" fill="#FF6347" opacity="0.7" />
      </svg>

      {/* School gate (center) */}
      <svg
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] sm:w-[320px] md:w-[400px] h-[200px] sm:h-[240px] md:h-[300px]"
        viewBox="0 0 400 300"
        fill="none"
      >
        {/* Left pillar */}
        <rect x="60" y="60" width="30" height="240" fill="#3D2E23" />
        <rect x="55" y="50" width="40" height="15" fill="#5C3D2E" rx="2" />
        <rect x="55" y="290" width="40" height="10" fill="#5C3D2E" />
        {/* Right pillar */}
        <rect x="310" y="60" width="30" height="240" fill="#3D2E23" />
        <rect x="305" y="50" width="40" height="15" fill="#5C3D2E" rx="2" />
        <rect x="305" y="290" width="40" height="10" fill="#5C3D2E" />
        {/* Top arch */}
        <path
          d="M55 55 Q200 -10 345 55"
          stroke="#5C3D2E"
          strokeWidth="8"
          fill="none"
        />
        {/* Gate text board */}
        <rect x="130" y="15" width="140" height="30" rx="4" fill="#3D2E23" />
        <text
          x="200"
          y="36"
          textAnchor="middle"
          fill="#D4A574"
          fontSize="11"
          fontWeight="bold"
          fontFamily="Inter, sans-serif"
        >
          THPT PHAM PHU THU
        </text>
        {/* Gate bars */}
        <line x1="95" y1="100" x2="95" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="120" y1="80" x2="120" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="145" y1="70" x2="145" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="170" y1="65" x2="170" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="200" y1="62" x2="200" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="230" y1="65" x2="230" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="255" y1="70" x2="255" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="280" y1="80" x2="280" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        <line x1="305" y1="100" x2="305" y2="300" stroke="#5C3D2E" strokeWidth="3" opacity="0.5" />
        {/* Cross bar */}
        <line x1="90" y1="180" x2="310" y2="180" stroke="#5C3D2E" strokeWidth="3" opacity="0.4" />
      </svg>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#2A1A10] to-transparent" />

      {/* Female student with ao dai (walking right) */}
      <svg
        className={`absolute bottom-2 w-[36px] md:w-[48px] h-[80px] md:h-[100px] transition-all duration-1000 ${
          mounted ? "animate-walk-right" : "right-[75%]"
        }`}
        style={mounted ? {} : { opacity: 0 }}
        viewBox="0 0 48 100"
        fill="none"
      >
        {/* Hair */}
        <ellipse cx="24" cy="14" rx="9" ry="10" fill="#1A0F0A" />
        <path d="M15 14 Q14 30 16 35 L24 32 L32 35 Q34 30 33 14" fill="#1A0F0A" />
        {/* Face */}
        <ellipse cx="24" cy="15" rx="7" ry="8" fill="#DEB887" />
        {/* Non la (conical hat) */}
        <path d="M10 12 L24 -2 L38 12 Z" fill="#D4A574" opacity="0.8" />
        {/* Ao dai top */}
        <path d="M17 28 L14 55 L24 58 L34 55 L31 28 Z" fill="white" />
        {/* Ao dai flap (front) */}
        <path d="M24 55 L18 90 Q24 92 30 90 Z" fill="white" opacity="0.9" />
        {/* Ao dai flap (back) - slightly swaying */}
        <path d="M24 55 L14 88 Q18 90 24 87 Z" fill="white" opacity="0.7" />
        {/* Pants */}
        <path d="M18 70 L16 98 L22 98 L24 75 L26 98 L32 98 L30 70 Z" fill="white" opacity="0.8" />
        {/* Arms */}
        <line x1="17" y1="32" x2="10" y2="55" stroke="#DEB887" strokeWidth="3" strokeLinecap="round" />
        <line x1="31" y1="32" x2="38" y2="55" stroke="#DEB887" strokeWidth="3" strokeLinecap="round" />
        {/* Book */}
        <rect x="35" y="48" width="8" height="12" rx="1" fill="#D4A574" opacity="0.7" />
      </svg>

      {/* Male student (walking left) */}
      <svg
        className={`absolute bottom-2 w-[36px] md:w-[48px] h-[76px] md:h-[96px] transition-all duration-1000 ${
          mounted ? "animate-walk-left" : "left-[75%]"
        }`}
        style={mounted ? {} : { opacity: 0 }}
        viewBox="0 0 48 96"
        fill="none"
      >
        {/* Hair */}
        <ellipse cx="24" cy="13" rx="8" ry="9" fill="#1A0F0A" />
        {/* Face */}
        <ellipse cx="24" cy="14" rx="7" ry="8" fill="#DEB887" />
        {/* White shirt */}
        <path d="M16 26 L14 58 L34 58 L32 26 Z" fill="white" />
        {/* Collar */}
        <path d="M19 26 L24 32 L29 26" stroke="#ccc" strokeWidth="1" fill="none" />
        {/* Dark pants */}
        <path d="M16 56 L14 94 L22 94 L24 62 L26 94 L34 94 L32 56 Z" fill="#2A1F1A" />
        {/* Arms */}
        <line x1="16" y1="30" x2="8" y2="52" stroke="#DEB887" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="30" x2="40" y2="52" stroke="#DEB887" strokeWidth="3" strokeLinecap="round" />
        {/* Backpack strap */}
        <line x1="20" y1="26" x2="18" y2="50" stroke="#8B7355" strokeWidth="2" />
        <line x1="28" y1="26" x2="30" y2="50" stroke="#8B7355" strokeWidth="2" />
      </svg>

      {/* Group of students (background, smaller) */}
      <svg
        className="absolute bottom-1 right-[20%] md:right-[25%] w-[80px] md:w-[120px] h-[50px] md:h-[70px] opacity-30"
        viewBox="0 0 120 70"
        fill="none"
      >
        {/* Silhouettes */}
        <ellipse cx="20" cy="15" rx="6" ry="7" fill="#8B7355" />
        <rect x="14" y="22" width="12" height="25" rx="3" fill="white" opacity="0.6" />
        <rect x="14" y="45" width="12" height="25" rx="2" fill="#3D2E23" />

        <ellipse cx="45" cy="13" rx="6" ry="7" fill="#8B7355" />
        <rect x="39" y="20" width="12" height="25" rx="3" fill="white" opacity="0.6" />
        <rect x="39" y="43" width="12" height="27" rx="2" fill="white" opacity="0.5" />

        <ellipse cx="70" cy="14" rx="6" ry="7" fill="#8B7355" />
        <rect x="64" y="21" width="12" height="25" rx="3" fill="white" opacity="0.6" />
        <rect x="64" y="44" width="12" height="26" rx="2" fill="#3D2E23" />

        <ellipse cx="95" cy="15" rx="6" ry="7" fill="#8B7355" />
        <rect x="89" y="22" width="12" height="25" rx="3" fill="white" opacity="0.6" />
        <rect x="89" y="45" width="12" height="25" rx="2" fill="white" opacity="0.5" />
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
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 16 16"
            style={{
              transform: `rotate(${p.sway * 45}deg)`,
              opacity: p.opacity,
            }}
          >
            <path
              d="M8 0 Q12 4 8 16 Q4 4 8 0Z"
              fill="#FF4500"
              opacity="0.8"
            />
            <path
              d="M8 2 Q10 6 8 14"
              stroke="#CD3700"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>
      ))}

      {/* Second female student ao dai (far background) */}
      <svg
        className="absolute bottom-1 left-[60%] md:left-[55%] w-[24px] md:w-[32px] h-[56px] md:h-[68px] opacity-25"
        viewBox="0 0 32 68"
        fill="none"
      >
        <ellipse cx="16" cy="10" rx="6" ry="7" fill="#1A0F0A" />
        <ellipse cx="16" cy="11" rx="5" ry="6" fill="#DEB887" />
        <path d="M11 20 L9 40 L16 42 L23 40 L21 20 Z" fill="white" />
        <path d="M16 40 L11 66 Q16 68 21 66 Z" fill="white" opacity="0.9" />
      </svg>

      {/* Bicycle */}
      <svg
        className={`absolute bottom-2 w-[50px] md:w-[64px] h-[40px] md:h-[50px] opacity-20 ${
          mounted ? "animate-bike" : "left-[10%]"
        }`}
        style={mounted ? {} : { opacity: 0 }}
        viewBox="0 0 64 50"
        fill="none"
      >
        {/* Wheels */}
        <circle cx="14" cy="38" r="10" stroke="#8B7355" strokeWidth="2" fill="none" />
        <circle cx="50" cy="38" r="10" stroke="#8B7355" strokeWidth="2" fill="none" />
        {/* Frame */}
        <path d="M14 38 L28 20 L50 38 L36 20 L28 20" stroke="#8B7355" strokeWidth="2" fill="none" />
        {/* Handlebar */}
        <path d="M28 20 L24 14 M28 20 L32 16" stroke="#8B7355" strokeWidth="1.5" />
        {/* Seat */}
        <line x1="34" y1="18" x2="40" y2="18" stroke="#8B7355" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
