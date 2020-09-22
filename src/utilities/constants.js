export const CHROMATIC_SCALE = [
  'C',
  'C♯/D♭',
  'D',
  'D♯/E♭',
  'E',
  'F',
  'F♯/G♭',
  'G',
  'G♯/A♭',
  'A',
  'A♯/B♭',
  'B',
];

export const TUNINGS = {
  4: [
    { name: 'Standard', notes: ['E', 'A', 'D', 'G'] },
    { name: 'Drop D', notes: ['D', 'A', 'D', 'G'] },
    { name: 'Drop C', notes: ['C', 'G', 'C', 'F'] },
    { name: '½ tone down', notes: ['D♯/E♭', 'G♯/A♭', 'C♯/D♭', 'F♯/G♭'] },
  ],
  5: [
    { name: 'Standard', notes: ['B', 'E', 'A', 'D', 'G'] },
    { name: '½ tone down', notes: ['A♯/B♭', 'D♯/E♭', 'G♯/A♭', 'C♯/D♭', 'F♯/G♭'] },
  ],
  6: [
    { name: 'Standard', notes: ['B', 'E', 'A', 'D', 'G', 'B'] },
    { name: '½ tone down', notes: ['A♯/B♭', 'D♯/E♭', 'G♯/A♭', 'C♯/D♭', 'F♯/G♭', 'A♯/B♭'] },
  ],
};

export const FRET_LENGTH_RATIOS = [
  0.34, // open string
  0.948,
  0.895,
  0.844,
  0.797,
  0.752,
  0.71,
  0.67,
  0.633,
  0.597,
  0.564,
  0.532,
  0.502,
  0.474,
  0.448,
  0.422,
  0.399,
  0.376,
  0.355,
  0.335,
  0.317,
  0.299,
  0.282,
  0.266,
  0.251,
];
