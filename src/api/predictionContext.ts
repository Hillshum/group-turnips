import React from 'react';
import { Prediction } from '../models';

export interface PredictionStore {
  [name: string]: Prediction[];
}

export default React.createContext<PredictionStore>({});
