import React from 'react';
import './App.scss';

import { useCollection } from 'react-firebase-hooks/firestore';

import AsyncResults from './components/async-results';
import { Inputs } from './models';
import PriceInputs from './components/price-inputs/price-inputs';
import { firestore } from './api/firebase';

interface Island extends Inputs {
  name: string;
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

  const [islands, loading, error] = useCollection(
    firestore.collection('islands'),
  );

  return (
    <div className="App">
      {/* {Object.entries(islandInputs).map(([name, inputs]) => ( */}
      {islands?.docs.map((island) => {
        const { name, ...inputs } = island.data() as Island;
        console.log(name, inputs);

        return (
          <div key={name} className="island-info">
            <PriceInputs
              name={name}
              inputs={inputs}
              onChange={(inputs) => island.ref.update({ ...inputs })}
            />
            <AsyncResults inputs={inputs} name={name} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
