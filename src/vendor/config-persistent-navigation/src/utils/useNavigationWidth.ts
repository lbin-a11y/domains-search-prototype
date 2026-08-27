import { useContext } from 'react';
import { Context } from '../context/Provider';

export function useNavigationWidth() {
  const { width } = useContext(Context);
  return width;
}
