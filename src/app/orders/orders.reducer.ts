import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from './order.model';
import { OrdersActions } from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface OrdersState extends EntityState<Order> {
  loading: boolean;
  error: any;
}

export const ordersAdapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: OrdersState = ordersAdapter.getInitialState({
  loading: false,
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(OrdersActions.loadOrdersByUser, (state, { userId }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(OrdersActions.loadOrdersByUserSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, { ...state, loading: false, error: null })
  ),
  on(OrdersActions.loadOrdersByUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(OrdersActions.upsertOrder, (state, { order }) =>
    ordersAdapter.upsertOne(order, state)
  ),
);

export const ordersFeature = createFeature({
  name: ordersFeatureKey,
  reducer,
  extraSelectors: ({ selectOrdersState }) => ({
    ...ordersAdapter.getSelectors(selectOrdersState),
    selectLoading: createSelector(
      selectOrdersState,
      (state) => state.loading
    ),
    selectError: createSelector(
      selectOrdersState,
      (state) => state.error
    ),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = ordersFeature;
