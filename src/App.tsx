import React from 'react';
import './App.scss';

import { useCollection } from 'react-firebase-hooks/firestore';

import IslandOverview from './components/island-overview/island-overview';
import { Inputs } from './models';
import PriceInputs from './components/price-inputs/price-inputs';
import { firestore } from './api/firebase';

interface Island extends Inputs {
  name: string;
}

function App() {
  const [islands, loading, error] = useCollection(
    firestore.collection('islands'),
  );

  return (
    <div className="App">
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
            <IslandOverview inputs={inputs} name={name} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
