import React from 'react';
import {tokens} from '../tokens';

export const analog = (i: number, n: number, frame: number) =>
  Math.sin((i / Math.max(1, n - 1)) * Math.PI * 4 - frame * 0.11);

const LEVELS = [-1, -0.5, 0, 0.5, 1];
export const quantize = (v: number) => LEVELS.reduce((best, level) => (Math.abs(level - v) < Math.abs(best - v) ? level : best));

export const AnalogCurve: React.FC<{
  x: number;
  y: number;
  w: number;
  amp: number;
  frame: number;
  progress?: number;
  color?: string;
}> = ({x, y, w, amp, frame, progress = 1, color = tokens.color.accent}) => {
  const n = 64;
  const visible = Math.max(2, Math.round(n * progress));
  const pts = Array.from({length: visible}, (_, i) => {
    const px = x + (i / (n - 1)) * w;
    const py = y - analog(i, n, frame) * amp;
    return `${px},${py}`;
  }).join(' ');
  return <polyline points={pts} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />;
};

export const SampleMarks: React.FC<{
  x: number;
  y: number;
  w: number;
  amp: number;
  frame: number;
  shown: number;
}> = ({x, y, w, amp, frame, shown}) => {
  const n = 64;
  const indexes = [4, 12, 20, 28, 36, 44, 52, 60];
  return (
    <g>
      {indexes.slice(0, shown).map((i) => {
        const px = x + (i / (n - 1)) * w;
        const py = y - analog(i, n, 0) * amp;
        return (
          <g key={i}>
            <line x1={px} y1={y - amp - 16} x2={px} y2={y + amp + 16} stroke={tokens.color.primary} strokeWidth={2} strokeDasharray="4 6" opacity={0.8} />
            <circle cx={px} cy={py} r={6} fill={tokens.color.text} />
          </g>
        );
      })}
    </g>
  );
};

export const Staircase: React.FC<{x: number; y: number; w: number; amp: number; progress: number}> = ({
  x,
  y,
  w,
  amp,
  progress,
}) => {
  const n = 64;
  const indexes = [4, 12, 20, 28, 36, 44, 52, 60];
  const pts = indexes.map((i) => ({
    px: x + (i / (n - 1)) * w,
    py: y - quantize(analog(i, n, 0)) * amp,
  }));
  if (progress <= 0.04) return null;
  const shown = Math.max(2, Math.round(Math.min(1, progress) * pts.length));
  const use = pts.slice(0, shown);
  const d = use
    .map((p, i) => {
      if (i === 0) return `M ${p.px} ${p.py}`;
      return `L ${p.px} ${use[i - 1].py} L ${p.px} ${p.py}`;
    })
    .join(' ');
  return <path d={d} fill="none" stroke={tokens.color.good} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />;
};

export const DataBlocks: React.FC<{x: number; y: number; count?: number; appear: number}> = ({x, y, count = 5, appear}) => (
  <g>
    {Array.from({length: count}, (_, i) => {
      const show = Math.min(1, Math.max(0, appear * count - i));
      return (
        <g key={i} opacity={show} transform={`translate(${x + i * 46} ${y})`}>
          <rect x={0} y={0} width={36} height={48} rx={6} fill={tokens.color.bg} stroke={tokens.color.accent} strokeWidth={2} />
          <line x1={8} y1={14} x2={28} y2={14} stroke={tokens.color.muted} strokeWidth={2} />
          <line x1={8} y1={24} x2={22} y2={24} stroke={tokens.color.muted} strokeWidth={2} />
          <line x1={8} y1={34} x2={26} y2={34} stroke={tokens.color.muted} strokeWidth={2} />
        </g>
      );
    })}
  </g>
);

/** 空气微粒只在各自的平衡位置附近来回，疏密波向右走。 */
export const AirParticles: React.FC<{x: number; y: number; length: number; frame: number}> = ({x, y, length, frame}) => {
  const count = 18;
  const spacing = length / (count - 1);
  const amp = 16;
  const mark = 4;
  return (
    <g>
      {Array.from({length: count}, (_, i) => {
        const x0 = x + i * spacing;
        const disp = amp * Math.sin(i * 0.95 - frame * 0.16);
        const hot = i === mark;
        return (
          <g key={i}>
            <line x1={x0} y1={y - 16} x2={x0} y2={y + 16} stroke={tokens.color.line} strokeWidth={2} />
            <circle cx={x0 + disp} cy={y} r={hot ? 8 : 6} fill={hot ? tokens.color.accent : tokens.color.text} opacity={0.95} />
          </g>
        );
      })}
      <line
        x1={x + mark * spacing - amp}
        y1={y + 28}
        x2={x + mark * spacing + amp}
        y2={y + 28}
        stroke={tokens.color.accent}
        strokeWidth={3}
      />
      <line x1={x + mark * spacing - amp} y1={y + 22} x2={x + mark * spacing - amp} y2={y + 34} stroke={tokens.color.accent} strokeWidth={3} />
      <line x1={x + mark * spacing + amp} y1={y + 22} x2={x + mark * spacing + amp} y2={y + 34} stroke={tokens.color.accent} strokeWidth={3} />
    </g>
  );
};

export const RadioArcs: React.FC<{x: number; y: number; frame: number}> = ({x, y, frame}) => (
  <g>
    {[0, 1, 2].map((i) => {
      const grow = (frame * 1.4 + i * 18) % 54;
      const op = 1 - grow / 60;
      const r = 16 + grow;
      return (
        <path
          key={i}
          d={`M ${x} ${y - r * 0.85} Q ${x + r} ${y} ${x} ${y + r * 0.85}`}
          fill="none"
          stroke={tokens.color.primary}
          strokeWidth={3}
          opacity={Math.max(0, op)}
        />
      );
    })}
  </g>
);

/** 光纤里移动的是光脉冲，不是字符，也不是声波。 */
export const FiberPulses: React.FC<{x1: number; x2: number; y: number; frame: number}> = ({x1, x2, y, frame}) => {
  const len = x2 - x1;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={tokens.color.line} strokeWidth={10} strokeLinecap="round" />
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={tokens.color.primary} strokeWidth={2} opacity={0.7} />
      {[0, 0.33, 0.66].map((seed, i) => {
        const t = (seed + frame / 48) % 1;
        return <rect key={i} x={x1 + t * (len - 22)} y={y - 6} width={22} height={12} rx={3} fill={tokens.color.accent} />;
      })}
    </g>
  );
};
