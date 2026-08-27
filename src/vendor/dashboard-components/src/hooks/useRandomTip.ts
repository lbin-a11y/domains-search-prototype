import { useState } from 'react';
import { TipContent } from '../components/Tip';

const getRandomTip = (tips: TipContent[]): TipContent => {
  const idx = Math.floor(Math.random() * tips.length);

  return tips[idx];
};

const useRandomTip = (tips: TipContent[]) => {
  const [tip] = useState(getRandomTip(tips));

  return tip;
};

export default useRandomTip;
