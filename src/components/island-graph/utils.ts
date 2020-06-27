import { Prediction } from '../../models';

const days = [
  {
    label: 'Sun',
    index: 0,
  },
  {
    label: 'Mon AM',
    index: 2,
  },
  {
    label: 'Mon PM',
    index: 3,
  },
  {
    label: 'Tues AM',
    index: 4,
  },
  {
    label: 'Tues PM',
    index: 5,
  },
  {
    label: 'Wed AM',
    index: 6,
  },
  {
    label: 'Wed PM',
    index: 7,
  },
  {
    label: 'Thurs AM',
    index: 8,
  },
  {
    label: 'Thurs PM',
    index: 9,
  },
  {
    label: 'Fri AM',
    index: 10,
  },
  {
    label: 'Fri PM',
    index: 11,
  },
  {
    label: 'Sat AM',
    index: 12,
  },
  {
    label: 'Sat PM',
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
