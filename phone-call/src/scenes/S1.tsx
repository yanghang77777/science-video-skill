import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {SmartPhone, SoundMark} from '../components/Icons';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S1_DURATION = sceneDuration('s1');

const LEFT = {x: 430, y: 560};
const RIGHT = {x: 1490, y: 560};

export const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 24});
  const q = spring({frame: frame - 28, fps, config: tokens.motion.spring, durationInFrames: 20});
  const line = interpolate(frame, [12, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const pulse = 0.75 + 0.25 * Math.sin(frame * 0.2);

  return (
    <SceneShell durationInFrames={S1_DURATION}>
      <Title lines={['你的声音，怎么过去的？']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <path
            d="M 560 470 Q 960 300 1360 470"
            fill="none"
            stroke={tokens.color.line}
            strokeWidth={3}
            strokeDasharray={`${line * 900} 900`}
          />
          <circle cx={560} cy={470} r={6} fill={tokens.color.muted} />
          <circle cx={1360} cy={470} r={6} fill={tokens.color.muted} />
          <SmartPhone x={LEFT.x} y={LEFT.y} />
          <g opacity={0.55 + 0.45 * pulse}>
            <SoundMark x={LEFT.x - 86} y={LEFT.y} />
          </g>
          <SmartPhone x={RIGHT.x} y={RIGHT.y} />
          <g opacity={q} transform={`translate(${RIGHT.x + 90} ${RIGHT.y - 10}) scale(${0.8 + q * 0.2})`}>
            <circle r={42} fill="none" stroke={tokens.color.primary} strokeWidth={3} />
            <text x={0} y={16} textAnchor="middle" fill={tokens.color.primary} fontSize={54} fontFamily={tokens.font.family}>?</text>
          </g>
        </svg>
      </AbsoluteFill>
      <Label x={960} y={268} color={tokens.color.muted}>距离 · 几千公里</Label>
      <Captions lines={sceneLines('s1')} durationInFrames={S1_DURATION} />
    </SceneShell>
  );
};
