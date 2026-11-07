import React from 'react';
import {tokens} from '../tokens';

export const SunGlyph: React.FC<{cx: number; cy: number; r: number; opacity?: number}> = ({
  cx,
  cy,
  r,
  opacity = 1,
}) => (
  <g opacity={opacity}>
    <circle cx={cx} cy={cy} r={r * 1.42} fill="none" stroke={tokens.color.accent} strokeWidth={2} opacity={0.28} />
    <circle cx={cx} cy={cy} r={r * 1.18} fill="none" stroke={tokens.color.accent} strokeWidth={6} opacity={0.14} />
    <circle cx={cx} cy={cy} r={r} fill={tokens.color.accent} />
    {new Array(8).fill(0).map((_, i) => {
      const a = (i / 8) * Math.PI * 2;
      return (
        <line
          key={i}
          x1={cx + Math.cos(a) * (r + 14)}
          y1={cy + Math.sin(a) * (r + 14)}
          x2={cx + Math.cos(a) * (r + 34)}
          y2={cy + Math.sin(a) * (r + 34)}
          stroke={tokens.color.accent}
          strokeWidth={5}
          strokeLinecap="round"
          opacity={0.55}
        />
      );
    })}
  </g>
);
