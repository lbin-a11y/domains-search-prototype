import { getBreakpoint } from '@sqs/rosetta-utilities';
import { rosetta } from '@sqs/rosetta-themes';

const { breakpoints } = rosetta.default;

export default () => {
  return getBreakpoint(breakpoints).platform === 'mobile';
};
