import moment, { type Moment } from 'moment';
import { getWebsiteContext } from '@sqs/config-context/website';

// NOTE: most of this logic is ported over from `/frontend/packages/census-ui/src/utils/dateRangeUtils.js`
// to ensure the date range logic in the Analytics widget matches what is shown in the Analytics panel
// Eventually, it would be good to extract and share that logic.

export enum AnalyticsPeriod {
  LAST_30_DAYS = 'LAST_30_DAYS'
}

export type DateRange = {
  start: Date,
  end: Date,
};

export type DateRangeComparison = {
  current: DateRange,
  previous: DateRange
};

function getOffsetDays(period: AnalyticsPeriod): number {
  const OffsetMap = {
    DAY: 1,
    WEEK: 7,
    MONTH: 28,
    YEAR: 365
  };

  if (period === AnalyticsPeriod.LAST_30_DAYS) {
    return OffsetMap.MONTH;
  }

  throw new Error('Date range not supported');
}

function getPreviousDates(startDate: Moment, endDate: Moment, period: AnalyticsPeriod) {
  const offsetDays = getOffsetDays(period);

  return {
    start: moment.utc(startDate).subtract(offsetDays, 'days'),
    end: moment.utc(endDate).subtract(offsetDays, 'days'),
  };
}

function getPeriodStartDate(endDate: Moment, period: AnalyticsPeriod): Moment {
  if (period === AnalyticsPeriod.LAST_30_DAYS) {
    return moment.utc(endDate).subtract(29, 'days');
  }

  throw new Error('Date range not supported');
}

const getToday = (currentUtcOffsetMillis: number): Moment => {
  const utcOffsetMinutes = Math.floor(currentUtcOffsetMillis / (60 * 1000));
  const nowWithOffset = moment.utc().utcOffset(utcOffsetMinutes);

  const today = moment.utc([
    nowWithOffset.year(),
    nowWithOffset.month(),
    nowWithOffset.date()
  ]);

  return today;
};

export function getComparisonFromPeriod(period: AnalyticsPeriod): DateRangeComparison {
  const currentPeriodEnd = getToday(getWebsiteContext()?.website?.timeZoneOffset || 0);
  const currentPeriodStart = getPeriodStartDate(currentPeriodEnd, period);
  const previousDateRange = getPreviousDates(currentPeriodStart, currentPeriodEnd, period);

  // End-dates are padded because the API expects date ranges with inclusive starts and exclusive ends.
  return {
    current: {
      start: currentPeriodStart.toDate(),
      end: currentPeriodEnd.add(1, 'days').toDate()
    },
    previous: {
      start: previousDateRange.start.toDate(),
      end: previousDateRange.end.add(1, 'days').toDate()
    },
  };
}
