import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Prediction } from '../../models';
import { prepGraphData } from './utils';

interface Props {
  predictions: Prediction[];
}

const IslandGraph = ({ predictions }: Props) => {
  const data = prepGraphData(predictions);
  return (
    <LineChart data={data} width={300} height={200}>
      <CartesianGrid />
      <XAxis dataKey="name" interval={1} />
      <YAxis width={30} domain={[0, 700]} />
      <Line type="monotone" dataKey="min" />
      <Line type="monotone" dataKey="max" />
    </LineChart>
  );
};

export default IslandGraph;
