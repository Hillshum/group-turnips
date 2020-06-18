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

export interface InputProps {
  name: string;
  inputs: Inputs;
  onChange: (inputs: Inputs) => void;
}

const PriceInputs = ({ name, inputs, onChange }: InputProps) => {
  return (
    <div className="price-inputs">
      <div>{name}</div>
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
