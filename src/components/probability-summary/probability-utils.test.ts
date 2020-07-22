import { probabilityDisjunction } from './probability-utils';

describe('Summary utils', () => {
  describe('Disjunction', () => {
    it('should return zero when all inputs are zero', () => {
      expect(probabilityDisjunction([0, 0, 0])).toBeCloseTo(0);
      expect(probabilityDisjunction([0])).toBeCloseTo(0);
    });

    it('should return 1 if at least one input is 1', () => {
      expect(probabilityDisjunction([1, 0, 0.35])).toBeCloseTo(1);
      expect(probabilityDisjunction([1])).toBeCloseTo(1);
    });

    it('should be .75 when called with [.5, .5]', () => {
      expect(probabilityDisjunction([0.5, 0.5])).toBeCloseTo(0.75);
    });
  });
});
