import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {tokens} from '../tokens';
import {BaseTower, SmartPhone} from '../components/Icons';
import {AnalogCurve, DataBlocks, FiberPulses, RadioArcs, SampleMarks, Staircase} from '../components/Signals';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S4_DURATION = sceneDuration('s4');

const fade = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const samples = Math.round(fade(frame, 16, 110) * 8);
  const stairs = fade(frame, 120, 210);
  const blocks = fade(frame, 210, 280);
  const net = fade(frame, 280, 320);

  return (
    <SceneShell durationInFrames={S4_DURATION}>
      <Title lines={['波形 → 数字 → 基站 → 光纤网络']} top={tokens.space.safe} />
      <AbsoluteFill>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <Panel x={96} y={214} w={520} h={250} />
          <Panel x={700} y={214} w={520} h={250} />
          <Panel x={1304} y={214} w={520} h={250} />
          <AnalogCurve x={132} y={340} w={440} amp={52} frame={0} progress={fade(frame, 0, 24)} />
          <SampleMarks x={132} y={340} w={440} amp={52} frame={0} shown={samples} />
          <Staircase x={736} y={340} w={440} amp={52} progress={stairs} />
          <DataBlocks x={1360} y={300} appear={blocks} />

          <g opacity={net}>
            <SmartPhone x={150} y={690} scale={0.72} />
            <RadioArcs x={210} y={690} frame={frame} />
            <BaseTower x={430} y={620} />
            <FiberPulses x1={500} x2={1320} y={730} frame={frame} />
            <BaseTower x={1420} y={620} />
          </g>
        </svg>
      </AbsoluteFill>
      <Label x={356} y={430} size={tokens.size.small}>采样</Label>
      <Label x={960} y={430} size={tokens.size.small}>量化</Label>
      <Label x={1564} y={430} size={tokens.size.small}>编码压缩 · 原理示意</Label>
      <Label x={300} y={780} size={tokens.size.small} opacity={net}>无线电</Label>
      <Label x={910} y={780} size={tokens.size.small} opacity={net} color={tokens.color.accent}>光脉冲 · 不是声波</Label>
      <Label x={1500} y={800} size={tokens.size.small} opacity={net}>对方附近的基站</Label>
      <Captions lines={sceneLines('s4')} durationInFrames={S4_DURATION} />
    </SceneShell>
  );
};

const Panel: React.FC<{x: number; y: number; w: number; h: number}> = ({x, y, w, h}) => (
  <rect x={x} y={y} width={w} height={h} rx={tokens.radius.card} fill={tokens.color.bgSoft} stroke={tokens.color.line} strokeWidth={2} />
);
