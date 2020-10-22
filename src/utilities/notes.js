import { CHROMATIC_SCALE, FRET_LENGTH_RATIOS } from './constants';

export function getStringNotes(rootNote, fretCount) {
  const lastFretNumber = fretCount + 1;
  const rootNoteIndex = CHROMATIC_SCALE.indexOf(rootNote);
  const fullSequence = CHROMATIC_SCALE.slice(rootNoteIndex, CHROMATIC_SCALE.length)
    .concat(CHROMATIC_SCALE.slice(0, rootNoteIndex));

  let allStringNotes = [...fullSequence];
  while (lastFretNumber > allStringNotes.length) {
    allStringNotes = allStringNotes.concat(fullSequence);
  }

  return allStringNotes.slice(0, lastFretNumber);
}

export function getFretWidth(fretIndex, fretCount) {
  const ratioSum = FRET_LENGTH_RATIOS.slice(0, fretCount - 1)
    .reduce((acc, current) => acc + current, 0);

  return (FRET_LENGTH_RATIOS[fretIndex] / ratioSum) * 100;
}
