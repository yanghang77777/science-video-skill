import React from 'react';
import {tokens} from '../tokens';

export const SmartPhone: React.FC<{x: number; y: number; scale?: number; glow?: number}> = ({
  x,
  y,
  scale = 1,
  glow = 0,
}) => {
  const w = 78 * scale;
  const h = 142 * scale;
  return (
    <g>
      {glow > 0 ? <circle cx={x} cy={y} r={w} fill={tokens.color.primary} opacity={0.12 * glow} /> : null}
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={16 * scale} fill={tokens.color.bgSoft} stroke={tokens.color.primary} strokeWidth={3} />
      <rect x={x - w / 2 + 8 * scale} y={y - h / 2 + 18 * scale} width={w - 16 * scale} height={h - 40 * scale} rx={6 * scale} fill={tokens.color.bg} />
      <circle cx={x} cy={y + h / 2 - 12 * scale} r={4 * scale} fill={tokens.color.muted} />
    </g>
  );
};

export const BaseTower: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <polygon points={`${x},${y - 18} ${x - 11},${y + 8} ${x + 11},${y + 8}`} fill={tokens.color.accent} />
    <line x1={x} y1={y} x2={x} y2={y + 118} stroke={tokens.color.text} strokeWidth={4} />
    <line x1={x - 34} y1={y + 30} x2={x + 34} y2={y + 30} stroke={tokens.color.primary} strokeWidth={3} />
    <line x1={x - 22} y1={y + 52} x2={x + 22} y2={y + 52} stroke={tokens.color.primary} strokeWidth={3} />
    <line x1={x - 26} y1={y + 118} x2={x + 26} y2={y + 118} stroke={tokens.color.line} strokeWidth={3} />
  </g>
);

export const DeskPhone: React.FC<{x: number; y: number}> = ({x, y}) => (
  <g>
    <rect x={x} y={y} width={168} height={72} rx={16} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
    <rect x={x + 22} y={y - 30} width={124} height={38} rx={18} fill={tokens.color.bgSoft} stroke={tokens.color.primary} strokeWidth={3} />
    <circle cx={x + 42} cy={y - 11} r={6} fill={tokens.color.muted} />
    <circle cx={x + 126} cy={y - 11} r={6} fill={tokens.color.muted} />
  </g>
);

export const SpeakerCone: React.FC<{x: number; y: number; frame: number}> = ({x, y, frame}) => {
  const n = 3 * Math.sin(frame * 0.45);
  return (
    <g>
      <rect x={x - 18} y={y - 46} width={22} height={92} rx={4} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
      <polygon
        points={`${x + 4},${y - 28} ${x + 58 + n},${y - 58} ${x + 58 + n},${y + 58} ${x + 4},${y + 28}`}
        fill={tokens.color.primary}
        opacity={0.85}
      />
      <ellipse cx={x + 58 + n} cy={y} rx={8} ry={58} fill={tokens.color.text} opacity={0.9} />
    </g>
  );
};

/** 声波记号。大小固定，用来表示“声音”而不是电压。 */
export const SoundMark: React.FC<{x: number; y: number; scale?: number}> = ({x, y, scale = 1}) => (
  <g>
    {[0, 1, 2].map((i) => {
      const r = (8 + i * 7) * scale;
      return (
        <path
          key={i}
          d={`M ${x} ${y - r} A ${r} ${r} 0 0 1 ${x} ${y + r}`}
          fill="none"
          stroke={tokens.color.text}
          strokeWidth={3}
        />
      );
    })}
  </g>
);
