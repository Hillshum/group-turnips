import React from 'react';
import './App.css';

import AsyncResults from './components/async-results';
import { Inputs } from './models';
import PriceInputs from './components/price-inputs/price-inputs';

const DEFAULT_PRICES: Inputs = {
  previousPattern: 0,
  prices: [100, 300, 210, 242, 242, 222, 242, 111, 231, 122, 123, 123, 120],
};

function App() {
  const [inputs, setInputs] = React.useState(DEFAULT_PRICES);

  return (
    <div className="App">
      <PriceInputs inputs={inputs} onChange={setInputs} />
      <AsyncResults inputs={inputs} name="Elendel" />
      <input type="number" />
    </div>
  );
}

export default App;
