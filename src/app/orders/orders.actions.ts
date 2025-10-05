import { createActionGroup, props } from '@ngrx/store';

import { Order } from './order.model';

export const OrdersActions = createActionGroup({
  source: 'Orders/API',
  events: {
    'Load Orders By User': props<{ userId: number }>(),
    'Load Orders By User Success': props<{ orders: Order[] }>(),
    'Load Orders By User Failure': props<{ error: any }>(),
    'Upsert Order': props<{ order: Order }>(),
  }
});
