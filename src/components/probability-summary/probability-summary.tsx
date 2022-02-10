import React from 'react';
import { $enum } from 'ts-enum-util';

import { PredictionStore } from '../../api/predictionContext';
import { getTotalCategoryProb } from './probability-utils';
import { PATTERN } from '../../models';
import Percent from '../../util/percent';
import { getPatternLabel } from '../../util/patternLabels';

import './probability-summary.scss';
import IslandSelector from '../island-selector/island-selector';

interface Props {
  predictions: PredictionStore;
}





const ProbabilitySummary = ({ predictions }: Props) => {

  const [selectedIslands, setSelected] = React.useState<{[name: string]: boolean}>()
  React.useEffect(()=> {
    const islandDefaults = Object.keys(predictions).reduce((prev, name) => ({...prev, [name]: true}), {})
    setSelected(islandDefaults)
  }, [predictions])

  const onIslandToggle = (name: string) => {
    if (!selectedIslands) {
      return
    }

    setSelected({...selectedIslands, [name]: !selectedIslands[name] })

  }

  const filteredPredictions = Object.entries(predictions).filter(([name, _]) => selectedIslands && selectedIslands[name])
    .reduce((prev, [name, prediction]) => ({
      ...prev,
      [name]: prediction
    }), {})

  return (
    <div className="prob-sum">
      <div className="inner">
        Probability of at least one
        {$enum(PATTERN)
          .getEntries()
          .map(([key, val]) => (
            <div key={key}>
              {getPatternLabel(val)}:{' '}
              <Percent>{getTotalCategoryProb(filteredPredictions, val)}</Percent>
            </div>
          ))}
        {selectedIslands && <IslandSelector islands={selectedIslands} onChange={onIslandToggle} />}
      </div>
    </div>
  );
};

export default ProbabilitySummary;
