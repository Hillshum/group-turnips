import React from 'react';
import Predictor from '../predictor';
import { Inputs, Prediction } from '../models';
import IslandOverview from './island-overview/island-overview';

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

const AsyncResults = ({ inputs, name }: Props) => {
  const [results, setResults] = React.useState<Prediction[] | null>(null);
  const callbackRef = React.useRef<RequestIdleCallbackHandle>();
  React.useEffect(() => {
    if (window.requestIdleCallback) {
      if (callbackRef.current) {
        window.cancelIdleCallback(callbackRef.current);
        callbackRef.current = null;
      }
      callbackRef.current = window.requestIdleCallback(() => {
        const predictor = new Predictor(
          inputs.prices as any,
          false,
          inputs.previousPattern,
        );
        const predictions = predictor.analyze_possibilities();
        setResults(predictions);
      });
    }
  }, [inputs]);
  return (
    <div className="async-results">
      {results && <IslandOverview predictions={results} name={name} />}
    </div>
  );
};

export default React.memo(AsyncResults);
