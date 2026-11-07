import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {MoonPhase} from '../components/MoonPhase';
import {SceneShell} from '../components/Starfield';
import {Captions, Title} from '../components/Typography';
import {litFraction, litSideOf, phaseName} from '../phase';
import {sceneDuration, sceneLines} from '../voiceData';

export const S6_DURATION = sceneDuration('s6');

const CENTER = {x: 620, y: 550};
const RING = 200;
const MOON_R = 42;
const PHASES = [0, 45, 90, 135, 180, 225, 270, 315];

export const S6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 20});
  const numberIn = spring({frame: frame - 36, fps, config: tokens.motion.spring, durationInFrames: 22});
  const spin = interpolate(frame, [24, S6_DURATION - 20], [0, Math.PI * 2], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const marker = {
    x: CENTER.x + (RING - 78) * Math.cos(spin),
    y: CENTER.y - (RING - 78) * Math.sin(spin),
  };

  return (
    <SceneShell durationInFrames={S6_DURATION}>
      <Title lines={['受光的部分在变']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <circle cx={CENTER.x} cy={CENTER.y} r={RING} fill="none" stroke={tokens.color.line} strokeWidth={2} strokeDasharray="5 10" />
          {PHASES.map((deg, i) => {
            const theta = (deg * Math.PI) / 180;
            const p = {
              x: CENTER.x + RING * Math.cos(theta),
              y: CENTER.y - RING * Math.sin(theta),
            };
            const fade = interpolate(frame - 10 - i * 4, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
            return (
              <g key={deg} opacity={fade}>
                <MoonPhase cx={p.x} cy={p.y} r={MOON_R} k={litFraction(theta)} litSide={litSideOf(theta)} />
              </g>
            );
          })}
          <circle cx={marker.x} cy={marker.y} r={8} fill={tokens.color.accent} />
        </svg>
      </AbsoluteFill>
      {PHASES.map((deg) => {
        const theta = (deg * Math.PI) / 180;
        const lx = CENTER.x + (RING + 96) * Math.cos(theta);
        const ly = CENTER.y - (RING + 96) * Math.sin(theta);
        return (
          <div
            key={deg}
            style={{
              position: 'absolute',
              left: lx,
              top: ly,
              transform: 'translate(-50%, -50%)',
              fontSize: tokens.size.small,
              color: tokens.color.muted,
              letterSpacing: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {phaseName(theta)}
          </div>
        );
      })}
      <div
        style={{
          position: 'absolute',
          left: 1180,
          top: 390,
          opacity: numberIn,
          transform: `translateY(${(1 - numberIn) * 16}px)`,
        }}
      >
        <div style={{fontSize: tokens.size.hero, fontWeight: 700, fontFamily: tokens.font.number, color: tokens.color.accent, lineHeight: 0.95}}>
          29.5
        </div>
        <div style={{marginTop: 8, fontSize: tokens.size.title, fontWeight: 600, color: tokens.color.text, letterSpacing: 2}}>天</div>
        <div style={{marginTop: 18, fontSize: tokens.size.label, color: tokens.color.muted, letterSpacing: 2}}>一轮圆缺</div>
      </div>
      <Captions lines={sceneLines('s6')} durationInFrames={S6_DURATION} />
    </SceneShell>
  );
};
