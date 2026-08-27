import { useTheme } from '@sqs/rosetta-styled';
import { getBreakpoint } from '@sqs/rosetta-utilities';

const usePlatform = () => {
  const { breakpoints } = useTheme();
  const { platform } = getBreakpoint(breakpoints);
  return platform;
};

export const useIsMobile = () => {
  const platform = usePlatform();
  return platform === 'mobile';
};

export const useIsMobileOrTablet = () => {
  const platform = usePlatform();
  return ['mobile', 'tablet'].includes(platform);
};

export const useIsDesktop = () => {
  const isMobileOrTablet = useIsMobileOrTablet();
  return !isMobileOrTablet;
};

export default usePlatform;
