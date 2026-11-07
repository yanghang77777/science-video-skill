import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {SpaceGround, diameterLabel, earthLabel, groundPhaseName, phaseLabelAbove, sunLabel} from '../components/SpaceGround';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {THETA_FULL, THETA_WANING} from '../phase';
import {sceneDuration, sceneLines} from '../voiceData';

export const S5_DURATION = sceneDuration('s5');

export const S5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const theta = interpolate(frame, [20, S5_DURATION - 24], [THETA_FULL, THETA_WANING], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell durationInFrames={S5_DURATION}>
      <Title lines={['大小一直没变']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <SpaceGround theta={theta} frame={frame} showDiameter />
        </svg>
      </AbsoluteFill>
      <Label x={300} y={214} size={tokens.size.small}>从太空看</Label>
      <Label x={1240} y={214} size={tokens.size.small}>从地球看 · 北半球</Label>
      <Label x={earthLabel.x} y={earthLabel.y}>地球</Label>
      <Label x={sunLabel.x} y={sunLabel.y}>太阳</Label>
      <Label x={phaseLabelAbove.x} y={phaseLabelAbove.y} color={tokens.color.text}>
        {groundPhaseName(theta)}
      </Label>
      <Label x={diameterLabel.x} y={diameterLabel.y} color={tokens.color.accent} size={tokens.size.small}>
        直径不变
      </Label>
      <Captions lines={sceneLines('s5')} durationInFrames={S5_DURATION} />
    </SceneShell>
  );
};
