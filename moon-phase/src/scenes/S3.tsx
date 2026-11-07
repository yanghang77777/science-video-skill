import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {MoonPhase} from '../components/MoonPhase';
import {SunGlyph} from '../components/SunGlyph';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {sceneDuration, sceneLines} from '../voiceData';

export const S3_DURATION = sceneDuration('s3');

const SUN = {x: 210, y: 540, r: 72};
const MOON = {x: 1280, y: 520, r: 188};

export const S3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const moonIn = spring({frame: frame - 12, fps, config: tokens.motion.spring, durationInFrames: 24});

  return (
    <SceneShell durationInFrames={S3_DURATION}>
      <Title lines={['只反射太阳光']} top={tokens.space.safe} />
      <AbsoluteFill>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <g opacity={enter}>
            <SunGlyph cx={SUN.x} cy={SUN.y} r={SUN.r} />
          </g>
          {new Array(7).fill(0).map((_, i) => {
            const y = 300 + i * 78;
            return (
              <line
                key={i}
                x1={340}
                y1={y}
                x2={1040}
                y2={y}
                stroke={tokens.color.accent}
                strokeWidth={4}
                strokeDasharray="28 24"
                strokeDashoffset={-frame * 5}
                opacity={interpolate(enter, [0, 1], [0, 0.72])}
              />
            );
          })}
          <g opacity={moonIn}>
            <MoonPhase cx={MOON.x} cy={MOON.y} r={MOON.r} k={0.5} litSide="left" glow={0.7} />
            <line
              x1={MOON.x}
              y1={MOON.y - MOON.r - 18}
              x2={MOON.x}
              y2={MOON.y + MOON.r + 18}
              stroke={tokens.color.primary}
              strokeWidth={2}
              strokeDasharray="8 10"
            />
          </g>
        </svg>
      </AbsoluteFill>
      <Label x={SUN.x} y={SUN.y + SUN.r + 52}>太阳</Label>
      <Label x={MOON.x} y={MOON.y - MOON.r - 48} opacity={moonIn}>明暗分界线</Label>
      <Label x={MOON.x + MOON.r + 90} y={MOON.y - 16} opacity={moonIn}>夜半球</Label>
      <Captions lines={sceneLines('s3')} durationInFrames={S3_DURATION} />
    </SceneShell>
  );
};
