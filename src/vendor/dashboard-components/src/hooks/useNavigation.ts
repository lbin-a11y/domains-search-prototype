import Router, { Route, RouterContext } from '@sqs/universal-router';
import { useContext } from 'react';

const useNavigation = () => {
  const router: Router = useContext(RouterContext);
  return {
    push: router.push.bind(router),
    pushWithBackTo: (pathname: string) => {
      const { path: backTo } = router.getCurrentRoute() as Route;
      router.push({
        pathname,
        state: {
          backTo
        }
      });
    },
  };
};

export default useNavigation;
