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
    previousPattern: 0,
    prices: [100, 300, 210, 242, 242, 222, 242, 111, 231, 122, 123, 123, 120],
  },
  'Lotus Lake': {
    previousPattern: 0,
    prices: [100, 300, 210, 242, 242, 222, 242, 111, 231, 122, 123, 123, 120],
  },
};

function App() {
  const [islandInputs, setInputs] = React.useState(ISLANDS);

  return (
    <div className="App">
      {Object.entries(islandInputs).map(([name, inputs]) => (
        <div className="island-info">
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
