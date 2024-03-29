import React from 'react';
import { Inputs, Prediction } from '../models';

const formatPrices = (prices: (number | null)[]) => {
  // Firebase doesn't like undefined values, but the predictor doesn't like null
  return [prices[0], ...prices].map((p) => (p === null ? undefined : p));
};

const usePredictor = (
  inputs: Inputs,
  onComplete: (results: Prediction[]) => void = () => {},
) => {
  const [results, setResults] = React.useState<Prediction[] | null>(null);
  React.useEffect(() => {
    setResults(null);
    const worker = new Worker('predictor.js');
    worker.onmessage = (e) => {
      setResults(e.data);
      onComplete(e.data);
    };
    worker.postMessage({
      prices: formatPrices(inputs.prices),
      previous: inputs.previousPattern,
      first_buy: false,
    });
  }, [inputs, onComplete]);

  return [results];
};

export default usePredictor;
