import React from 'react';
import { $enum } from 'ts-enum-util';

import { PredictionStore } from '../../api/predictionContext';
import { getTotalCategoryProb } from './probability-utils';
import { PATTERN } from '../../models';
import Percent from '../../util/percent';
import { getPatternLabel } from '../../util/patternLabels';

import './probability-summary.scss';

interface Props {
  predictions: PredictionStore;
}

const ProbabilitySummary = ({ predictions }: Props) => {
  return (
    <div className="prob-sum">
      <div className="inner">
        Probability of at least one
        {$enum(PATTERN)
          .getEntries()
          .map(([key, val]) => (
            <div key={key}>
              {getPatternLabel(val)}:{' '}
              <Percent>{getTotalCategoryProb(predictions, val)}</Percent>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProbabilitySummary;
