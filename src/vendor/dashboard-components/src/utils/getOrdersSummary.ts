import qs from 'qs';
import network from '@sqs/network';
import { AxiosResponse } from 'axios';
import type { OrderType as Order } from '@sqs/commerce-orders-panel';
import OrderDirection from '@sqs/enums/OrderDirection';
import OrderItemType from '@sqs/enums/OrderItemType';
import OrderPaymentStates from '@sqs/enums/OrderPaymentStates';
import Money from '@sqs/i18n-ui/lib/money';

const OrderItemTypeMap: Record<OrderItemType, string> = {
  [OrderItemType.PHYSICAL]: 'PHYSICAL',
  [OrderItemType.DIGITAL]: 'DIGITAL',
  [OrderItemType.SERVICE]: 'SERVICE',
  [OrderItemType.GIFT_CARD]: 'GIFT_CARD',
  [OrderItemType.PAYWALL]: 'PAYWALL',
  [OrderItemType.CUSTOM_SALE]: 'CUSTOM_SALE',
  [OrderItemType.DONATION]: 'DONATION',
};

/**
 * This util is used to fetch a flattened and simplified list of recent orders for use on dashboards
 */

export type OrderSummary = {
  orderNumber: string,
  submittedOn: Date,
  customerName: string,
  customerEmail: string,
  orderTotal: Money,
  isTest: boolean,
  firstItemProductName: string,
  firstItemOrderItemType: OrderItemType
  isSubscription: boolean,
};

type Args = {
  limit: number,
  includeOrderItemTypes?: Array<OrderItemType>,
  orderDirection?: OrderDirection,
  paymentStates?: OrderPaymentStates[],
};

export type OrdersSummary = {
  totalCount: number,
  orders: Array<OrderSummary>
};

// We tweak this type because Moneys are returned from the API as JSON
export type RawOrder = Omit<Order, 'grandTotal'> & {
  grandTotal: {
    value?: string;
    decimalValue?: string;
    currency?: string;
    currencyCode?: string;
  }
};

type RawOrdersResponse = {
  totalCount: number,
  results: Array<RawOrder>
};

function parseOrder(order: RawOrder): OrderSummary {

  // For PAYWALL and DONATION orders, there is only one order.item, so we look at that to determine details about the order
  const firstItem = order.items[0];

  return {
    orderNumber: order.orderNumber,
    submittedOn: new Date(order.submittedOn),
    customerName: order.billingDetails.customer?.name || '',
    customerEmail: order.billingDetails.customer?.email || '',
    orderTotal: Money.fromJson(order.grandTotal),
    isTest: order.testMode,
    firstItemProductName: firstItem.productName || '',
    firstItemOrderItemType: firstItem.orderItemType,
    isSubscription: Boolean(order.subscriptionDetails)
  };
}

async function getLatestOrders({
  limit,
  includeOrderItemTypes = [],
  orderDirection = OrderDirection.DESCENDING,
  paymentStates,
}: Args): Promise<RawOrdersResponse> {
  const params = qs.stringify({
    orderBy: 'SUBMITTED_ON',
    orderDirection,
    limit: limit,
    includeTotalCount: true,
    offset: 0,
    includeOrderItemTypes: includeOrderItemTypes.map(type => OrderItemTypeMap[type]),
    paymentStates,
  }, {
    indices: false
  });

  const url = `/api/2/commerce/orders?${params}`;
  const response: AxiosResponse<RawOrdersResponse> = await network.get(url);

  return response.data;
}

export default async function getOrdersSummary(args: Args): Promise<OrdersSummary> {
  const { totalCount, results } = await getLatestOrders(args);

  return {
    totalCount,
    orders: results.map(parseOrder)
  };
}
