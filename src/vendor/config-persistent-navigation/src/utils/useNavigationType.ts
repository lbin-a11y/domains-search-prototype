import { useContext } from 'react';
import { Context } from '../context/Provider';

export function useNavigationType() {
  const { navigationType } = useContext(Context);
  return navigationType;
}
