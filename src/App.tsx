import React from 'react';
import './App.css';

import Predictor from './predictor';
import IslandOverview from './components/island-overview/island-overview';
import { PATTERN, Inputs } from './models';
import PriceInputs from './components/price-inputs/price-inputs';

const DEFAULT_PRICES: Inputs = {
  previousPattern: 0,
  prices: [100, 300, 210, 242, 242, 222, 242, 111, 231, 122, 123, 123, 120],
};

function App() {
  const [inputs, setInputs] = React.useState(DEFAULT_PRICES);
  const predictor = new Predictor(
    inputs.prices as any,
    false,
    inputs.previousPattern,
  );
  const predictions = predictor.analyze_possibilities();
  console.log(predictions);

  return (
    <div className="App">
      <PriceInputs inputs={inputs} onChange={setInputs} />
      <IslandOverview predictions={predictions} name="Elendel" />
      <input type="number" />
    </div>
  );
}

export default App;
