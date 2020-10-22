import { expect } from 'chai';

import useFretboard from '@/use/fretboard';

const {
  calculateFretWidth,
  settings: { fretCount },
} = useFretboard();

describe('#calculateFretWidth', () => {
  describe('for default 20 frets', () => {
    it('computes correct width for 1st fret', () => {
      expect(calculateFretWidth(1).toFixed(5)).equals('8.17735');
    });
    it('computes correct width for 5th fret', () => {
      expect(calculateFretWidth(5).toFixed(5)).equals('6.48667');
    });
    it('computes correct width for 12th fret', () => {
      expect(calculateFretWidth(12).toFixed(5)).equals('4.33020');
    });
    it('computes correct width for last fret', () => {
      expect(calculateFretWidth(fretCount.value).toFixed(5)).equals('2.73441');
    });
  });
});
