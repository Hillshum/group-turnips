import { Prediction } from '../../models';

const days = [
  {
    label: 'S',
    index: 0,
  },
  {
    label: 'M AM',
    index: 2,
  },
  {
    label: 'M PM',
    index: 3,
  },
  {
    label: 'Tu AM',
    index: 4,
  },
  {
    label: 'Tu PM',
    index: 5,
  },
  {
    label: 'W AM',
    index: 6,
  },
  {
    label: 'W PM',
    index: 7,
  },
  {
    label: 'Th AM',
    index: 8,
  },
  {
    label: 'Th PM',
    index: 9,
  },
  {
    label: 'F AM',
    index: 10,
  },
  {
    label: 'F PM',
    index: 11,
  },
  {
    label: 'S AM',
    index: 12,
  },
  {
    label: 'S PM',
    index: 13,
  },
];

const getMax = (index: number, predictions: Prediction[]) => {
  const prices = predictions.map((p) => p.prices[index].max);
  return Math.max(...prices);
};

const getMin = (index: number, predictions: Prediction[]) => {
  const prices = predictions.map((p) => p.prices[index].min);
  return Math.min(...prices);
};

export const prepGraphData = (predictions: Prediction[]) => {
  return days.map((day) => {
    return {
      name: day.label,
      min: getMin(day.index, predictions),
      max: getMax(day.index, predictions),
    };
  });
};
