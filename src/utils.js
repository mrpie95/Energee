/**
 * Map energy level (1–10) to a color:
 * 1 = red (0°), 10 = green (120°)
 */
export function energyToColor(energy) {
  const hue = Math.round(((energy - 1) / 9) * 120); // 0 to 120
  return `hsl(${hue}, 80%, 50%)`;
}
