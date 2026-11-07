import React from 'react';
import {tokens} from '../tokens';
import {litFraction, litSideOf, moonOnOrbit, phaseName} from '../phase';
import {MoonPhase, MoonTopView} from './MoonPhase';
import {SunGlyph} from './SunGlyph';

const EARTH = {x: 430, y: 575, r: 54};
const ORBIT = 198;
const SUN = {x: 868, y: 575, r: 36};
const GROUND = {x: 1420, y: 530, r: 168};

/** 左：太空俯视（朝太阳的半球亮）。右：北半球地面月相。两边共用同一个 θ。 */
export const SpaceGround: React.FC<{theta: number; frame: number; showDiameter?: boolean}> = ({
  theta,
  frame,
  showDiameter = false,
}) => {
  const moon = moonOnOrbit(EARTH, ORBIT, theta);
  const k = litFraction(theta);
  const side = litSideOf(theta);
  const dimY = GROUND.y + GROUND.r + 22;

  return (
    <g>
      <line x1={960} y1={210} x2={960} y2={860} stroke={tokens.color.line} strokeWidth={2} />
      <circle
        cx={EARTH.x}
        cy={EARTH.y}
        r={ORBIT}
        fill="none"
        stroke={tokens.color.line}
        strokeWidth={2}
        strokeDasharray="6 12"
      />
      <SunGlyph cx={SUN.x} cy={SUN.y} r={SUN.r} />
      {new Array(5).fill(0).map((_, i) => {
        const y = 455 + i * 60;
        return (
          <g key={i}>
            <line
              x1={780}
              y1={y}
              x2={684}
              y2={y}
              stroke={tokens.color.accent}
              strokeWidth={3}
              strokeDasharray="16 18"
              strokeDashoffset={-frame * 4}
              opacity={0.7}
            />
            <polygon points={`668,${y} 682,${y - 7} 682,${y + 7}`} fill={tokens.color.accent} opacity={0.85} />
          </g>
        );
      })}
      <line
        x1={EARTH.x}
        y1={EARTH.y}
        x2={moon.x}
        y2={moon.y}
        stroke={tokens.color.primary}
        strokeWidth={2}
        strokeDasharray="6 10"
        opacity={0.45}
      />
      <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} fill={tokens.color.primary} opacity={0.85} />
      <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} fill="none" stroke={tokens.color.line} strokeWidth={2} />
      <MoonTopView cx={moon.x} cy={moon.y} r={26} />

      <MoonPhase cx={GROUND.x} cy={GROUND.y} r={GROUND.r} k={k} litSide={side} glow={0.55} />
      {showDiameter ? (
        <g>
          <line
            x1={GROUND.x - GROUND.r}
            y1={dimY}
            x2={GROUND.x + GROUND.r}
            y2={dimY}
            stroke={tokens.color.accent}
            strokeWidth={3}
          />
          <line x1={GROUND.x - GROUND.r} y1={dimY - 14} x2={GROUND.x - GROUND.r} y2={dimY + 14} stroke={tokens.color.accent} strokeWidth={3} />
          <line x1={GROUND.x + GROUND.r} y1={dimY - 14} x2={GROUND.x + GROUND.r} y2={dimY + 14} stroke={tokens.color.accent} strokeWidth={3} />
        </g>
      ) : null}
    </g>
  );
};

export const groundPhaseName = (theta: number) => phaseName(theta);

export const phaseLabelBelow = {x: GROUND.x, y: GROUND.y + GROUND.r + 18};
export const phaseLabelAbove = {x: GROUND.x, y: GROUND.y - GROUND.r - 64};
export const diameterLabel = {x: GROUND.x, y: GROUND.y + GROUND.r + 40};
export const earthLabel = {x: EARTH.x, y: EARTH.y + EARTH.r + 16};
export const sunLabel = {x: SUN.x, y: SUN.y - SUN.r - 96};
