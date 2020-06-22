import React from 'react';
// import Predictor from '../predictor';
import { Inputs, Prediction } from '../models';
import IslandOverview from './island-overview/island-overview';
import { format } from 'path';

// @ts-ignore
// import Worker from 'worker-loader!../predictor'; // eslint-disable-line import/no-webpack-loader-syntax

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback?: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}
interface Props {
  inputs: Inputs;
  name: string;
}

const areEqual = (prev: Props, next: Props) => {
  if (prev.name !== next.name) {
    return false;
  }

  if (prev.inputs.previousPattern !== next.inputs.previousPattern) {
    return false;
  }

  if (prev.inputs.prices.length !== next.inputs.prices.length) {
    return false;
  }

  const pricesMatch = prev.inputs.prices.every((prevPrice, index) => {
    const nextPrice = next.inputs.prices[index];
    return prevPrice === nextPrice;
  });

  return pricesMatch;
};

const formatPrices = (prices: (number | null)[]) => {
  // Firebase doesn't like undefined values, but the predictor doesn't like null
  return [prices[0], ...prices].map((p) => (p === null ? undefined : p));
};

const AsyncResults = ({ inputs, name }: Props) => {
  const [results, setResults] = React.useState<Prediction[] | null>(null);
  React.useEffect(() => {
    const worker = new Worker('predictor.js');
    worker.onmessage = (e) => setResults(e.data);
    worker.postMessage({
      prices: formatPrices(inputs.prices),
      previous: inputs.previousPattern,
      first_buy: false,
    });
  }, [inputs]);

  // const predictor = new Predictor(
  //   formatPrices(inputs.prices),
  //   false,
  //   inputs.previousPattern,
  // );
  // const results = predictor.analyze_possibilities();
  return (
    <div className="async-results">
      {results && <IslandOverview predictions={results} name={name} />}
    </div>
  );
};

export default React.memo(AsyncResults, areEqual);
