import React from 'react';
import { $enum } from 'ts-enum-util';

import usePredictor from '../../api/usePredictor';
import { Prediction, PATTERN, Inputs } from '../../models';

import { getPatternLabel } from '../../util/patternLabels';

import './island-overview.scss';
import IslandGraph from '../island-graph/island-graph';

interface Props {
  inputs: Inputs;
  name: string;
}

type PatternResults = {
  [PATTERN.DECREASING]?: number;
  [PATTERN.FLUCTUATING]?: number;
  [PATTERN.LARGE_SPIKE]?: number;
  [PATTERN.SMALL_SPIKE]?: number;
  // [PATTERN.OVERALL]?: number;
};

const getPatterns = (predictions: Prediction[]) => {
  // const results: PatternResults = {
  //   [PATTERN.DECREASING]: predictions.find(p => p.pattern_number === PATTERN.DECREASING)?.probability,

  // };

  const results: PatternResults = $enum(PATTERN)
    .getEntries()
    .reduce((prev, [label, val]) => {
      const nextPrediction = predictions
        .filter((p) => p.pattern_number === val)
        .reduce((prev, curr) => prev + curr.probability, 0);
      return { ...prev, [val]: nextPrediction };
    }, {});
  // predictions.forEach((p) => {
  //   results[p.pattern_number] = p.category_total_probability;
  // });

  return results as PatternResults;
};

const Percent = ({ children }: { children: number }) => (
  <>{(children * 100).toFixed(2)}%</>
);

const ProphetLink = ({ inputs }: { inputs: Inputs }) => {
  const prices = inputs.prices.map((p) => (p === null ? '' : p)).join('.');
  const href = `https://turnipprophet.io/?prices=${prices}&pattern=${inputs.previousPattern}`;
  return (
    <div className="prophet-link-wrapper">
      <a target="_blank" rel="noopener noreferrer" href={href}>
        Turnip Prophet
      </a>
    </div>
  );
};

const IslandOverview = ({ inputs, name }: Props) => {
  const [predictions] = usePredictor(inputs);
  const patternResults = predictions && getPatterns(predictions);
  console.log(predictions?.length);
  console.log(patternResults);
  return (
    <div className="island-overview">
      <div className="island-name">{name}</div>
      <div className="patterns">
        {patternResults &&
          $enum(PATTERN)
            .getEntries()
            .map(([key, val]) => (
              <div key={key}>
                {getPatternLabel(val)}:{' '}
                <Percent>{patternResults[val] ?? 0}</Percent>
              </div>
            ))}
      </div>
      {predictions && <IslandGraph predictions={predictions} />}
      <ProphetLink inputs={inputs} />
    </div>
  );
};

export default IslandOverview;
