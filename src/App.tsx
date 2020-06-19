import React from 'react';
import './App.scss';

import AsyncResults from './components/async-results';
import { Inputs } from './models';
import PriceInputs from './components/price-inputs/price-inputs';

interface IslandList {
  [key: string]: Inputs;
}

const ISLANDS = {
  Elendel: {
    previousPattern: -1,
    prices: [100, 120],
  },
  'Lotus Lake': {
    previousPattern: -1,
    prices: [100],
  },
};

function App() {
  const [islandInputs, setInputs] = React.useState(ISLANDS);

  return (
    <div className="App">
      {Object.entries(islandInputs).map(([name, inputs]) => (
        <div key={name} className="island-info">
          <PriceInputs
            name={name}
            inputs={inputs}
            onChange={(inputs) =>
              setInputs({ ...islandInputs, [name]: inputs })
            }
          />
          <AsyncResults inputs={inputs} name={name} />
        </div>
      ))}
    </div>
  );
}

export default App;
