import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {BaseTower, SmartPhone, SoundMark, SpeakerCone} from '../components/Icons';
import {AnalogCurve, DataBlocks, RadioArcs, Staircase} from '../components/Signals';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S6_DURATION = sceneDuration('s6');

export const S6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 20});
  const blocks = interpolate(frame, [6, 28], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stairs = interpolate(frame, [24, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const curve = interpolate(frame, [48, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const ear = interpolate(frame, [68, 92], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

  return (
    <SceneShell durationInFrames={S6_DURATION}>
      <Title lines={['数字 → 声音']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <BaseTower x={180} y={430} />
          <RadioArcs x={230} y={520} frame={frame} />
          <SmartPhone x={430} y={540} scale={0.86} />
          <g opacity={blocks}>
            <DataBlocks x={560} y={470} count={4} appear={1} />
          </g>
          <g opacity={stairs}>
            <Staircase x={820} y={530} w={280} amp={40} progress={stairs} />
          </g>
          <g opacity={curve}>
            <AnalogCurve x={1140} y={530} w={280} amp={40} frame={frame} progress={curve} />
          </g>
          <g opacity={ear}>
            <SpeakerCone x={1500} y={540} frame={frame} />
            <SoundMark x={1660} y={540} />
          </g>
        </svg>
      </AbsoluteFill>
      <Label x={180} y={620} size={tokens.size.small}>对方基站</Label>
      <Label x={430} y={660} size={tokens.size.small}>解码</Label>
      <Label x={1560} y={660} size={tokens.size.small} opacity={ear}>扬声器</Label>
      <Label x={1710} y={500} size={tokens.size.small} opacity={ear}>声波</Label>
      <Captions lines={sceneLines('s6')} durationInFrames={S6_DURATION} />
    </SceneShell>
  );
};
