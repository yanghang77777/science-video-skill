import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {SpaceGround, earthLabel, groundPhaseName, phaseLabelBelow, sunLabel} from '../components/SpaceGround';
import {SceneShell} from '../components/Starfield';
import {Captions, Label, Title} from '../components/Typography';
import {THETA_CRESCENT, THETA_FULL} from '../phase';
import {sceneDuration, sceneLines} from '../voiceData';

export const S4_DURATION = sceneDuration('s4');

export const S4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 22});
  const theta = interpolate(frame, [24, S4_DURATION - 30], [THETA_CRESCENT, THETA_FULL], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneShell durationInFrames={S4_DURATION}>
      <Title lines={['绕一圈，亮面就变']} top={tokens.space.safe} />
      <AbsoluteFill style={{opacity: enter}}>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <SpaceGround theta={theta} frame={frame} />
        </svg>
      </AbsoluteFill>
      <Label x={300} y={214} size={tokens.size.small}>从太空看</Label>
      <Label x={1240} y={214} size={tokens.size.small}>从地球看 · 北半球</Label>
      <Label x={earthLabel.x} y={earthLabel.y}>地球</Label>
      <Label x={sunLabel.x} y={sunLabel.y}>太阳</Label>
      <Label x={phaseLabelBelow.x} y={phaseLabelBelow.y} color={tokens.color.text}>
        {groundPhaseName(theta)}
      </Label>
      <Captions lines={sceneLines('s4')} durationInFrames={S4_DURATION} />
    </SceneShell>
  );
};
