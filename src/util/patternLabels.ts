import { $enum } from 'ts-enum-util';
import { PATTERN } from '../models';

export const getPatternLabel = (pattern: PATTERN) => {
  return $enum.mapValue(pattern).with({
    [PATTERN.DECREASING]: 'Decreasing',
    [PATTERN.FLUCTUATING]: 'Random',
    [PATTERN.LARGE_SPIKE]: 'Large Spike',
    [PATTERN.SMALL_SPIKE]: 'Small Spike',
    // [PATTERN.OVERALL]: 'Total',
  });
};
