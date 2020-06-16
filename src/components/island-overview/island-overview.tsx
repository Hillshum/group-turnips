import React from 'react';
import {Prediction, PATTERN } from '../../models'

import "./island-overview.scss"

interface Props {
  predictions: Prediction[];
  name: string;
}

type PatternResults = {
  [key in PATTERN]?: number
}

const getPatterns = (predictions: Prediction[]) => {

  const results: PatternResults = {};
  predictions.forEach(p => {
    results[p.pattern_number] = p.category_total_probability;
  })

  return results
}

const Percent = ({children}: {children: number}) => <>{(children * 100).toFixed(2)}%</>

const IslandOverview = ({predictions, name}: Props) => {
  const patternResults = getPatterns(predictions);
  return <div className="island-overview">
      <div className="island-name">{name}</div>
      <div className="patterns">
        {Object.entries(patternResults).map(([pattern, prob])=> <div key={pattern}>{pattern}: <Percent>{prob ?? 0}</Percent></div>)}
      </div>
  </div>
}

export default IslandOverview;