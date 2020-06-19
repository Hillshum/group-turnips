export interface Inputs {
  prices: (number | undefined)[];
  previousPattern: PATTERN;
}

export interface Prices {
  min: number;
  max: number;
}

export interface Prediction {
  pattern_number: PATTERN;
  prices: Prices[];
  probability: number;
  weekGuaranteedMinimum: number;
  category_total_probability: number;
}

export enum PATTERN {
  FLUCTUATING = 0,
  LARGE_SPIKE = 1,
  DECREASING = 2,
  SMALL_SPIKE = 3,
}
