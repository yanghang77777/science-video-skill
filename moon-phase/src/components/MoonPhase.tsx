import React, {useId} from 'react';
import {tokens} from '../tokens';

type Props = {
  cx: number;
  cy: number;
  r: number;
  /** 被照亮的比例 0～1：0 新月，0.5 半月，1 满月 */
  k: number;
  /** 亮面在哪一侧。北半球：盈月亮在右，亏月亮在左 */
  litSide?: 'left' | 'right';
  glow?: number;
};

/**
 * 按被照亮比例画出地面所见的月相。
 * 亮区 = 朝太阳的半圆 + 一条椭圆明暗界线，椭圆半宽 = r * |2k - 1|。
 * k < 0.5 时界线向亮侧鼓（蛾眉），k > 0.5 时向暗侧鼓（凸月）。
 * 这是terminator几何，不是把一张弯月图旋转出来。
 */
export const MoonPhase: React.FC<Props> = ({cx, cy, r, k, litSide = 'right', glow = 0}) => {
  const uid = useId().replace(/:/g, '');
  const kk = Math.min(1, Math.max(0, k));
  const rx = Math.max(0.5, r * Math.abs(2 * kk - 1));
  const sweep = kk < 0.5 ? 0 : 1;

  return (
    <g>
      <defs>
        <linearGradient id={`lit-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={tokens.color.text} />
          <stop offset="100%" stopColor={tokens.color.muted} />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      {glow > 0 ? (
        <circle cx={cx} cy={cy} r={r * 1.16} fill={tokens.color.primary} opacity={0.13 * glow} />
      ) : null}

      <circle cx={cx} cy={cy} r={r} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />

      {kk > 0.005 ? (
        <g clipPath={`url(#clip-${uid})`} transform={litSide === 'left' ? `translate(${cx * 2} 0) scale(-1 1)` : undefined}>
          <path
            d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${rx} ${r} 0 0 ${sweep} ${cx} ${cy - r} Z`}
            fill={`url(#lit-${uid})`}
          />
        </g>
      ) : null}
    </g>
  );
};

/** 俯视：太阳在右侧，平行光只照亮朝右的半球，与月相圆盘无关 */
export const MoonTopView: React.FC<{cx: number; cy: number; r: number}> = ({cx, cy, r}) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
    <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} Z`} fill={tokens.color.text} opacity={0.92} />
  </g>
);
