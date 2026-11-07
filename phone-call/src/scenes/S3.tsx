import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {SceneShell} from '../components/Starfield';
import {AirParticles, AnalogCurve} from '../components/Signals';
import {Captions, Label, Title} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S3_DURATION = sceneDuration('s3');

export const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const draw = interpolate(frame, [36, S3_DURATION - 36], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const dia = 7 * Math.sin(frame * 0.16);

  return (
    <SceneShell durationInFrames={S3_DURATION}>
      <Title lines={['振动 → 电信号']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <AirParticles x={140} y={520} length={620} frame={frame} />
          <rect x={820 + dia} y={470} width={14} height={100} rx={4} fill={tokens.color.primary} />
          <rect x={836} y={500} width={70} height={40} rx={8} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
          <line x1={906} y1={520} x2={1040} y2={520} stroke={tokens.color.accent} strokeWidth={3} />
          <polygon points="1040,512 1056,520 1040,528" fill={tokens.color.accent} />
          <line x1={1120} y1={520} x2={1760} y2={520} stroke={tokens.color.line} strokeWidth={2} />
          <AnalogCurve x={1120} y={520} w={620} amp={78} frame={frame} progress={draw} />
        </svg>
      </AbsoluteFill>
      <Label x={360} y={590} color={tokens.color.accent}>原地往复</Label>
      <Label x={860} y={420}>话筒</Label>
      <Label x={1440} y={390} color={tokens.color.accent}>连续电压</Label>
      <Captions lines={sceneLines('s3')} durationInFrames={S3_DURATION} />
    </SceneShell>
  );
};
