import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {DeskPhone, SmartPhone} from '../components/Icons';
import {AnalogCurve, DataBlocks} from '../components/Signals';
import {SceneShell} from '../components/Starfield';
import {Captions, Label} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S5_DURATION = sceneDuration('s5');

export const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const draw = interpolate(frame, [16, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blocks = interpolate(frame, [28, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell durationInFrames={S5_DURATION}>
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <line x1={960} y1={200} x2={960} y2={840} stroke={tokens.color.line} strokeWidth={2} />
          <DeskPhone x={180} y={430} />
          <line x1={348} y1={520} x2={760} y2={520} stroke={tokens.color.muted} strokeWidth={4} />
          <AnalogCurve x={360} y={520} w={370} amp={34} frame={frame} progress={draw} />
          <rect x={760} y={488} width={34} height={64} rx={6} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
          <SmartPhone x={1280} y={520} />
          <DataBlocks x={1420} y={470} count={4} appear={blocks} />
        </svg>
      </AbsoluteFill>
      <Label x={480} y={210} color={tokens.color.text}>老座机：连续电流</Label>
      <Label x={1440} y={210} color={tokens.color.text}>手机：数字</Label>
      <Label x={560} y={620} color={tokens.color.accent} size={tokens.size.small}>只画座机这一段</Label>
      <Label x={1520} y={560} size={tokens.size.small}>原理示意</Label>
      <Captions lines={sceneLines('s5')} durationInFrames={S5_DURATION} />
    </SceneShell>
  );
};
