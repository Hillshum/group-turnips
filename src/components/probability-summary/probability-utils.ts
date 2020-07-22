import { PredictionStore } from '../../api/predictionContext';
import { Prediction } from '../../models';

export const probabilityDisjunction = (nums: number[]) => {
  return 1 - nums.reduce((prev, curr) => prev * (1 - curr), 1);
};

export const getSingleCategoryProb = (
  predctions: Prediction[],
  pattern: number,
) => {
  const pred = predctions.find((p) => p.pattern_number === pattern);
  return pred?.category_total_probability ?? 0;
};

export const getTotalCategoryProb = (
  store: PredictionStore,
  pattern: number,
) => {
  const probs = Object.values(store).map((p) =>
    getSingleCategoryProb(p, pattern),
  );

  return probabilityDisjunction(probs);
};
