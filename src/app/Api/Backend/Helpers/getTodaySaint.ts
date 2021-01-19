import { saints } from './saints';

export default function getTodaySaint() {
  const today = new Date();
  const monthString = today.toLocaleString('default', { month: 'long' }).toLowerCase();
  const day = today.getDate() - 1;

  if (saints[monthString][day]) {
    const todaySaint = saints[monthString][day];

    if (todaySaint[1] !== '') {
      return `${todaySaint[1]} ${todaySaint[0]}`;
    }

    return `${todaySaint[0]}`;
  }

  return null;
}
