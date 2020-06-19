import React from 'react';

import { Inputs } from '../../models';

import './price-inputs.scss';

const PRICES = [
  'Sunday',
  'Mon AM',
  'Mon PM',
  'Tues AM',
  'Tues PM',
  'Wed AM',
  'Wed PM',
  'Thurs AM',
  'Thurs PM',
  'Fri AM',
  'Fri PM',
  'Sat AM',
  'Sat PM',
];

export interface InputProps {
  name: string;
  inputs: Inputs;
  onChange: (inputs: Inputs) => void;
}

const PriceInputs = ({ name, inputs, onChange }: InputProps) => {
  const [isCollapsed, setCollapsed] = React.useState(true);
  return (
    <div className="price-inputs">
      <div className="inputs-header">
        <span>{name}</span>
        <button onClick={() => setCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Show Prices' : 'Hide Prices'}
        </button>
      </div>
      <div className="inputs-list">
        {!isCollapsed &&
          PRICES.map((price, index) => (
            <div className="price-input" key={price}>
              <label>{price}</label>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default PriceInputs;
