import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {MoonPhase} from '../components/MoonPhase';
import {SunGlyph} from '../components/SunGlyph';
import {SceneShell} from '../components/Starfield';
import {Captions, Label} from '../components/Typography';
import {litFraction, THETA_CRESCENT} from '../phase';
import {sceneDuration, sceneLines} from '../voiceData';

export const S2_DURATION = sceneDuration('s2');

const SUN = {x: 250, y: 540, r: 64};
const EARTH = {x: 860, y: 540, r: 68};
const ECLIPSE = {x: 1460, y: 540, r: 40};
// 太阳在左。这颗月在影子锥外，距新月约 50°，亮面朝太阳。
const PHASE = {x: 641, y: 280, r: 52};

const ease = Easing.bezier(...tokens.motion.ease);

export const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const reach = interpolate(frame, [16, 68], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const eclipseIn = interpolate(frame, [48, 72], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const phaseIn = spring({frame: frame - 96, fps, config: tokens.motion.spring, durationInFrames: 20});
  const cross = spring({frame: frame - 112, fps, config: tokens.motion.spring, durationInFrames: 18});

  const x0 = EARTH.x + EARTH.r;
  const x1 = x0 + (1680 - x0) * reach;
  const top0 = EARTH.y - EARTH.r + 6;
  const bot0 = EARTH.y + EARTH.r - 6;
  const top1 = EARTH.y - 48;
  const bot1 = EARTH.y + 48;
  const cone = `${x0},${top0} ${x1},${top0 + (top1 - top0) * reach} ${x1},${bot0 + (bot1 - bot0) * reach} ${x0},${bot0}`;

  return (
    <SceneShell durationInFrames={S2_DURATION}>
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <polygon points={cone} fill={tokens.color.bgSoft} opacity={0.92} stroke={tokens.color.muted} strokeOpacity={0.35} strokeWidth={2} />
          <SunGlyph cx={SUN.x} cy={SUN.y} r={SUN.r} />
          <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} fill={tokens.color.primary} opacity={0.85} />
          <circle cx={EARTH.x} cy={EARTH.y} r={EARTH.r} fill="none" stroke={tokens.color.line} strokeWidth={2} />
          <g opacity={eclipseIn}>
            <circle cx={ECLIPSE.x} cy={ECLIPSE.y} r={ECLIPSE.r} fill={tokens.color.bg} stroke={tokens.color.warn} strokeWidth={3} />
          </g>
          <g opacity={phaseIn}>
            <line x1={EARTH.x} y1={EARTH.y - EARTH.r} x2={PHASE.x} y2={PHASE.y + PHASE.r} stroke={tokens.color.primary} strokeWidth={2} strokeDasharray="6 8" opacity={0.7} />
            <MoonPhase cx={PHASE.x} cy={PHASE.y} r={PHASE.r} k={litFraction(THETA_CRESCENT)} litSide="left" glow={0.8} />
          </g>
          <g opacity={cross} transform={`translate(1280 830) scale(${0.7 + cross * 0.3}) translate(-1280 -830)`}>
            <line x1={1120} y1={800} x2={1440} y2={868} stroke={tokens.color.warn} strokeWidth={16} strokeLinecap="round" />
            <line x1={1120} y1={868} x2={1440} y2={800} stroke={tokens.color.warn} strokeWidth={16} strokeLinecap="round" />
          </g>
        </svg>
      </AbsoluteFill>
      <Label x={SUN.x} y={SUN.y + SUN.r + 48}>太阳</Label>
      <Label x={EARTH.x} y={EARTH.y + EARTH.r + 28}>地球</Label>
      <Label x={ECLIPSE.x} y={ECLIPSE.y - 112} color={tokens.color.warn} opacity={eclipseIn}>月食</Label>
      <Label x={PHASE.x} y={PHASE.y - PHASE.r - 44} color={tokens.color.good} opacity={phaseIn}>月相</Label>
      <Label x={1280} y={804} color={tokens.color.text} opacity={cross}>用影子解释圆缺</Label>
      <Captions lines={sceneLines('s2')} durationInFrames={S2_DURATION} />
    </SceneShell>
  );
};
