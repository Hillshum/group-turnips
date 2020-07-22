import React from 'react';
import './App.scss';

import { useCollection } from 'react-firebase-hooks/firestore';

import IslandOverview from './components/island-overview/island-overview';
import { Inputs, Prediction } from './models';
import PriceInputs from './components/price-inputs/price-inputs';
import { firestore } from './api/firebase';
import { PredictionStore } from './api/predictionContext';
import ProbabilitySummary from './components/probability-summary/probability-summary';

interface Island extends Inputs {
  name: string;
}

function App() {
  const [islands, loading, error] = useCollection(
    firestore.collection('islands'),
  );

  const [predictions, setPredictions] = React.useState<PredictionStore>({});

  const onPredictionsChange = (name: string) => (updated: Prediction[]) => {
    setPredictions((oldPredictions) => ({
      ...oldPredictions,
      [name]: [...updated],
    }));
  };

  return (
    <div className="App">
      <ProbabilitySummary predictions={predictions} />
      {/* {Object.entries(islandInputs).map(([name, inputs]) => ( */}
      {islands?.docs.map((island) => {
        const { name, ...inputs } = island.data() as Island;
        return (
          <div key={name} className="island-info">
            <PriceInputs
              name={name}
              inputs={inputs}
              onChange={(inputs) => island.ref.update({ ...inputs })}
            />
            <IslandOverview
              inputs={inputs}
              name={name}
              onPredictionsChange={onPredictionsChange(name)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
