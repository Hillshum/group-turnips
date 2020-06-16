import React from 'react';
import './App.css';

import Predictor from './predictor';
import IslandOverview from './components/island-overview/island-overview';
import { PATTERN } from './models';
import PriceInputs from './components/price-inputs/price-inputs';

const DEFAULT_PRICES = {
  previousPattern: 0,
   prices: [100, 300, 210, 242, 242, 222, 242, 111, 231, 122, 123, 123, 120],
  }

function App() {

  const predictor = new Predictor([100, 242, 101], false, PATTERN.DECREASING);
  const predictions = predictor.analyze_possibilities();
  // console.log(predictions);

  const [prices, setPrices] = React.useState(DEFAULT_PRICES);

  return (
    <div className="App">
      <PriceInputs inputs={prices} onChange={setPrices}/>
      <IslandOverview predictions={predictions} name="Elendel" />
    </div>
  );
}

export default App;
