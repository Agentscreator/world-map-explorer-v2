import { describe, it, expect } from 'vitest';
import { toKMorMeter, tosqKMorMeter } from '../src/utils/to-km-or-meter.js';

describe('Distance Conversion Utils', () => {
  describe('toKMorMeter', () => {
    it('should convert distances less than 1000 to meters', () => {
      expect(toKMorMeter(500)).toBe('500 meters');
      expect(toKMorMeter(999)).toBe('999 meters');
    });

    it('should convert distances 1000 or more to kilometers', () => {
      expect(toKMorMeter(1000)).toBe('1 Kilo meters');
      expect(toKMorMeter(5000)).toBe('5 Kilo meters');
      expect(toKMorMeter(15500)).toBe('15 Kilo meters');
    });

    it('should handle edge cases', () => {
      expect(toKMorMeter(0)).toBe('0 meters');
      expect(toKMorMeter(1)).toBe('1 meters');
    });
  });

  describe('tosqKMorMeter', () => {
    it('should format small areas with 2 decimal places', () => {
      expect(tosqKMorMeter(5_000_000)).toBe('5.00 square kilometers');
      expect(tosqKMorMeter(9_999_999)).toBe('10.00 square kilometers');
    });

    it('should format large areas as rounded integers', () => {
      expect(tosqKMorMeter(15_000_000)).toBe('15 square kilometers');
      expect(tosqKMorMeter(100_000_000)).toBe('100 square kilometers');
    });

    it('should handle very small areas', () => {
      expect(tosqKMorMeter(1_000_000)).toBe('1.00 square kilometers');
    });
  });
});
