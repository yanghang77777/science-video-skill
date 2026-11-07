import React from 'react';
import {AbsoluteFill, Audio, interpolate, Series, staticFile} from 'remotion';
import {tokens} from './tokens';
import {Starfield} from './components/Starfield';
import {S1, S1_DURATION} from './scenes/S1';
import {S2, S2_DURATION} from './scenes/S2';
import {S3, S3_DURATION} from './scenes/S3';
import {S4, S4_DURATION} from './scenes/S4';
import {S5, S5_DURATION} from './scenes/S5';
import {S6, S6_DURATION} from './scenes/S6';

export const SCENE_FRAMES = [S1_DURATION, S2_DURATION, S3_DURATION, S4_DURATION, S5_DURATION, S6_DURATION];
export const TOTAL_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);

// 与已测过的无解说成片同一首 CC0 音乐、同一增益，目标约 -16 LUFS。
const BGM_GAIN = 1.79;

export const Video: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: tokens.color.bg, fontFamily: tokens.font.family}}>
    <Starfield />
    <Series>
      <Series.Sequence durationInFrames={SCENE_FRAMES[0]}><S1 /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES[1]}><S2 /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES[2]}><S3 /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES[3]}><S4 /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES[4]}><S5 /></Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_FRAMES[5]}><S6 /></Series.Sequence>
    </Series>
    <Audio
      src={staticFile('bgm.mp3')}
      volume={(f) =>
        interpolate(
          f,
          [0, tokens.audio.fadeIn, TOTAL_FRAMES - tokens.audio.fadeOut, TOTAL_FRAMES],
          [0, tokens.audio.bgmVolume * BGM_GAIN, tokens.audio.bgmVolume * BGM_GAIN, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
        )
      }
    />
  </AbsoluteFill>
);
