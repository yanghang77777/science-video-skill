/** 太阳在画面右侧。θ 从指向太阳的 +x 轴逆时针量，屏幕坐标 y 向上为正。
 *  θ=0 新月，π/2 上弦，π 满月，3π/2 下弦。
 *  亮面比例 k = (1 - cos θ) / 2，由日-月-地张角决定，不是地球影子。
 */

export const DEG = Math.PI / 180;

export const THETA_CRESCENT = 50 * DEG;
export const THETA_FULL = Math.PI;
export const THETA_WANING = 310 * DEG;

export const litFraction = (theta: number) => (1 - Math.cos(theta)) / 2;

/** 北半球：盈月（0<θ<π）亮在右，亏月亮在左 */
export const litSideOf = (theta: number): 'left' | 'right' => (Math.sin(theta) >= 0 ? 'right' : 'left');

export const moonOnOrbit = (earth: {x: number; y: number}, orbit: number, theta: number) => ({
  x: earth.x + orbit * Math.cos(theta),
  y: earth.y - orbit * Math.sin(theta),
});

export const phaseName = (theta: number) => {
  const wrapped = ((theta * 180) / Math.PI) % 360;
  const d = wrapped < 0 ? wrapped + 360 : wrapped;
  if (d < 12 || d > 348) return '新月';
  if (d < 75) return '蛾眉月';
  if (d < 105) return '上弦月';
  if (d < 165) return '盈凸月';
  if (d < 195) return '满月';
  if (d < 255) return '亏凸月';
  if (d < 285) return '下弦月';
  return '残月';
};
