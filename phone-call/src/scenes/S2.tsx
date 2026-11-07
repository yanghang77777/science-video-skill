import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {SmartPhone, SoundMark} from '../components/Icons';
import {SceneShell} from '../components/Starfield';
import {Captions, Label} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S2_DURATION = sceneDuration('s2');

const X1 = 340;
const X2 = 1580;
const Y = 590;

export const S2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 20});
  const travel = interpolate(frame, [8, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cross = spring({frame: frame - 64, fps, config: tokens.motion.spring, durationInFrames: 16});
  const fix = frame >= 64 ? 1 : 0;
  const at = (t: number) => X1 + 80 + Math.min(1, Math.max(0, t)) * (X2 - X1 - 180);

  return (
    <SceneShell durationInFrames={S2_DURATION}>
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <SmartPhone x={250} y={Y} scale={0.82} />
          <SmartPhone x={1670} y={Y} scale={0.82} />
          <line x1={X1} y1={Y} x2={X2} y2={Y} stroke={tokens.color.muted} strokeWidth={4} />
          <SoundMark x={at(travel)} y={Y - 46} />
          <SoundMark x={at(travel - 0.28)} y={Y - 46} scale={travel > 0.28 ? 1 : 0} />
          <g opacity={cross}>
            <line x1={460} y1={430} x2={1460} y2={730} stroke={tokens.color.warn} strokeWidth={16} strokeLinecap="round" />
            <line x1={460} y1={730} x2={1460} y2={430} stroke={tokens.color.warn} strokeWidth={16} strokeLinecap="round" />
          </g>
        </svg>
      </AbsoluteFill>
      <div style={{position: 'absolute', left: tokens.space.safe, top: tokens.space.safe, opacity: 1 - fix}}>
        <div style={{fontSize: tokens.size.title, fontWeight: 600, color: tokens.color.text, letterSpacing: 2}}>声波沿线传到远方</div>
      </div>
      <div style={{position: 'absolute', left: tokens.space.safe, top: tokens.space.safe, opacity: fix}}>
        <div style={{fontSize: tokens.size.title, fontWeight: 600, color: tokens.color.text, letterSpacing: 2, lineHeight: 1.25}}>传过去的不是声音</div>
        <div style={{fontSize: tokens.size.title, fontWeight: 600, color: tokens.color.primary, letterSpacing: 2, lineHeight: 1.25}}>是信号</div>
      </div>
      <Label x={960} y={400} color={tokens.color.text} opacity={cross}>声波沿线传到远方</Label>
      <Label x={960} y={790} color={tokens.color.muted} opacity={cross}>声波大小没变，错在模型</Label>
      <Captions lines={sceneLines('s2')} durationInFrames={S2_DURATION} />
    </SceneShell>
  );
};
