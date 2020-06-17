import React from 'react';

import { Inputs } from '../../models';

const PRICES = [
  'Sunday',
  'Monday AM',
  'Monday PM',
  'Tuesday AM',
  'Tuesday PM',
  'Wednesday AM',
  'Wednesday PM',
  'Thursday AM',
  'Thursday PM',
  'Friday AM',
  'Friday PM',
  'Saturday AM',
  'Saturday PM',
];

interface Props {
  inputs: Inputs;
  onChange: (inputs: Inputs) => void;
}

const PriceInputs = ({ inputs, onChange }: Props) => {
  return (
    <div className="price-inputs">
      {PRICES.map((price, index) => (
        <div className="price-input" key={price}>
          <label>
            {price}
            <input
              type="number"
              value={inputs.prices[index]}
              onChange={(e) => {
                const newinputs = { ...inputs, prices: [...inputs.prices] };
                newinputs.prices[index] = e.target.value
                  ? Number(e.target.value)
                  : undefined;
                onChange(newinputs);
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default PriceInputs;
