import React from 'react';

import { Inputs, PATTERN } from '../../models';
import { $enum } from 'ts-enum-util';
import { getPatternLabel } from '../../util/patternLabels';

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

interface PatternProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (val: number) => void;
}

const PatternOption = ({ label, value, checked, onChange }: PatternProps) => {
  return (
    <label>
      {' '}
      {label}
      <input
        type="radio"
        name="previousPattern"
        value={value}
        checked={checked}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
};

export interface InputProps {
  name: string;
  inputs: Inputs;
  onChange: (inputs: Inputs) => void;
}

const PriceInputs = ({ name, inputs: intialInputs, onChange }: InputProps) => {
  const [isCollapsed, setCollapsed] = React.useState(true);
  const [inputs, setInputs] = React.useState<Inputs | null>(null);

  React.useEffect(() => {
    setInputs(intialInputs);
  }, [intialInputs]);

  const onPatternChange = (val: number) => {
    if (!inputs) {
      return; // realistically this handler should never fire without inputs
    }
    setInputs({ ...inputs, prices: [...inputs.prices], previousPattern: val });
  };

  return (
    <div className="price-inputs">
      <div className="inputs-header">
        <span>{name}</span>
        <button onClick={() => setCollapsed(!isCollapsed)}>
          {isCollapsed ? 'Show Prices' : 'Hide Prices'}
        </button>
      </div>
      {!isCollapsed && inputs && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onChange(inputs);
          }}
        >
          <div className="pattern-select">
            <div>Previous Pattern</div>
            <div className="pattern-options">
              <PatternOption
                label="Unknown"
                checked={inputs.previousPattern === -1}
                value={-1}
                onChange={onPatternChange}
              />
              {$enum(PATTERN)
                .getValues()
                .map((pattern) => (
                  <PatternOption
                    label={getPatternLabel(pattern)}
                    checked={pattern === inputs.previousPattern}
                    value={pattern}
                    onChange={onPatternChange}
                  />
                ))}
            </div>
          </div>
          <div className="inputs-list">
            {PRICES.map((price, index) => (
              <div className="price-input" key={price}>
                <label>{price}</label>
                <input
                  type="number"
                  value={inputs?.prices[index] ?? undefined}
                  onChange={(e) => {
                    const newinputs = {
                      ...inputs,
                      prices: [...inputs?.prices],
                    };
                    newinputs.prices[index] =
                      e.target.value !== '' ? Number(e.target.value) : null;
                    setInputs(newinputs);
                  }}
                />
              </div>
            ))}
            <input type="submit" value="Save" />
          </div>
        </form>
      )}
    </div>
  );
};

export default PriceInputs;
