import { CHROMATIC_SCALE, FRET_LENGTH_RATIOS } from './constants';

export function getStringNotes(root, fretCount) {
  const offset = CHROMATIC_SCALE.indexOf(root);
  const sequence = CHROMATIC_SCALE.slice(offset, 12)
    .concat(CHROMATIC_SCALE.slice(0, offset));
  // FIXME: this is bad
  return [...sequence, ...sequence, ...sequence].slice(0, fretCount + 1);
}

export function getFretWidth(fretIndex, fretCount) {
  const ratioSum = FRET_LENGTH_RATIOS.slice(0, fretCount - 1)
    .reduce((acc, current) => acc + current, 0);
  return (FRET_LENGTH_RATIOS[fretIndex] / ratioSum) * 100;
  // ((FRET_LENGTH_RATIOS[fretIndex < FRET_LENGTH_RATIOS.length
  // ? fretIndex : FRET_LENGTH_RATIOS.length - 1] / SCALE) * 100).toFixed(2)
}
