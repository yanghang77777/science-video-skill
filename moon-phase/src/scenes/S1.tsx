import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {tokens} from '../tokens';
import {MoonPhase} from '../components/MoonPhase';
import {SceneShell, useRise} from '../components/Starfield';
import {Captions} from '../components/Typography';
import {litFraction, litSideOf, THETA_CRESCENT} from '../phase';
import {sceneDuration, sceneLines} from '../voiceData';

export const S1_DURATION = sceneDuration('s1');

// 钩子：夜空里的弯月。亮面比例来自 50° 蛾眉，不是缺掉一块的圆。
export const S1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: tokens.motion.spring, durationInFrames: 26});
  const line1 = useRise(8);
  const line2 = useRise(8 + tokens.motion.stagger * 3);

  return (
    <SceneShell durationInFrames={S1_DURATION}>
      <AbsoluteFill>
        <svg width={tokens.canvas.width} height={tokens.canvas.height}>
          <g style={{opacity: enter, transform: `translateY(${(1 - enter) * 24}px)`}}>
            <MoonPhase
              cx={1400}
              cy={470}
              r={210}
              k={litFraction(THETA_CRESCENT)}
              litSide={litSideOf(THETA_CRESCENT)}
              glow={1}
            />
          </g>
        </svg>
        <div style={{position: 'absolute', left: tokens.space.safe, top: 300}}>
          <div style={{...line1, fontSize: tokens.size.hero, fontWeight: 600, color: tokens.color.text, lineHeight: 1.25, letterSpacing: 2}}>
            缺的那块
          </div>
          <div style={{...line2, marginTop: 12, fontSize: tokens.size.hero, fontWeight: 600, color: tokens.color.primary, lineHeight: 1.25, letterSpacing: 2}}>
            到哪儿去了？
          </div>
        </div>
        <Captions lines={sceneLines('s1')} durationInFrames={S1_DURATION} />
      </AbsoluteFill>
    </SceneShell>
  );
};
