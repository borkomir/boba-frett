import useFretboard from '@/use/fretboard';

const {
  tuningNotes,
  addFret,
  removeFret,
  calculateFretWidth,
  getAllFretNotes,
  settings: { fretCount, stringCount, tuningIndex },
} = useFretboard();

describe('#tuningNotes', () => {
  it('returns correct notes for default tuning', () => {
    expect(JSON.stringify(tuningNotes.value)).toBe(
      JSON.stringify(['E', 'A', 'D', 'G'])
    );
  });
  it('returns correct notes after string count and tuning change', () => {
    stringCount.value = 5;
    tuningIndex.value = 1;
    expect(JSON.stringify(tuningNotes.value)).toBe(
      JSON.stringify(['A♯/B♭', 'D♯/E♭', 'G♯/A♭', 'C♯/D♭', 'F♯/G♭'])
    );
  });
});

describe('#addFret', () => {
  it('increments fret count correctly', () => {
    fretCount.value = 20; // reset value to default
    addFret();
    expect(fretCount.value).toBe(21);
  });
  it('blocks adding fret over the limit', () => {
    fretCount.value = 24;
    addFret();
    expect(fretCount.value).toBe(24);
    fretCount.value = 20; // reset value to default
  });
});

describe('#removeFret', () => {
  it('decrements fret count correctly', () => {
    removeFret();
    expect(fretCount.value).toBe(19);
  });
  it('blocks adding fret over the limit', () => {
    fretCount.value = 12;
    removeFret();
    expect(fretCount.value).toBe(12);
    fretCount.value = 20; // reset value to default
  });
});

describe('#calculateFretWidth', () => {
  describe('for default 20 frets', () => {
    it('computes correct width for 1st fret', () => {
      expect(calculateFretWidth(1).toFixed(5)).toBe('8.17735');
    });
    it('computes correct width for 5th fret', () => {
      expect(calculateFretWidth(5).toFixed(5)).toBe('6.48667');
    });
    it('computes correct width for 12th fret', () => {
      expect(calculateFretWidth(12).toFixed(5)).toBe('4.33020');
    });
    it('computes correct width for last fret', () => {
      expect(calculateFretWidth(fretCount.value).toFixed(5)).toBe('2.73441');
    });
  });
  describe('after fret count change, for maximum of 24 frets', () => {
    it('computes correct width for last fret', () => {
      fretCount.value = 24;
      expect(calculateFretWidth(fretCount.value).toFixed(5)).toBe('1.96755');
      fretCount.value = 20; // reset value to default
    });
  });
});

describe('#getAllFretNotes', () => {
  it('generates correct set of notes', () => {
    expect(JSON.stringify(getAllFretNotes('E')))
      .toBe(JSON.stringify([
      'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 'D♯/E♭',
      'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭', 'A', 'A♯/B♭', 'B', 'C'
    ]));
  });
});
