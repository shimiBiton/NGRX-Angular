import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from './user.model';
import { UsersActions } from './users.actions';
import {ordersFeature} from "../orders/orders.reducer";
import {Order} from "../orders/order.model";

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  selectedUserId: number | null;
  error: any;
  loading: boolean;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = userAdapter.getInitialState({
  selectedUserId: null,
  error: null,
  loading: false,
});

export const usersReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UsersActions.loadUsersSuccess, (state: State, {users}) =>
    userAdapter.setAll(users, { ...state, error: null, loading: false }),
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(UsersActions.upsertUser, (state, {user}) =>
    userAdapter.upsertOne(user, state),
  ),

  on(UsersActions.deleteUser, (state, {id}) =>
    userAdapter.removeOne(id, state),
  ),

  on(UsersActions.setSelectedUser, (state, { id }) => ({
    ...state,
    selectedUserId: id,
  })),
);

export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer: usersReducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...userAdapter.getSelectors(selectUsersState),
    selectLoading: createSelector(
      selectUsersState,
      (state) => state.loading
    ),
    selectError: createSelector(
      selectUsersState,
      (state) => state.error
    ),
    selectedUser: createSelector(
      selectUsersState,
      (state) => state.selectedUserId ? state.entities[state.selectedUserId] ?? null : null
    ),
  }),
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = usersFeature;

export const selectOrdersOfSelectedUser = createSelector(
  usersFeature.selectSelectedUserId,
  ordersFeature.selectAll,
  (selectedUserId, allOrders): Order[] => {
    if (selectedUserId === null) {
      return [];
    }
    return allOrders.filter(o => o.userId === selectedUserId);
  }
);


export const selectUserNameAndOrdersSum = createSelector(
  usersFeature.selectEntities,
  usersFeature.selectSelectedUserId,
  selectOrdersOfSelectedUser,
  (entities, selectedUserId, orders) => {
    if (selectedUserId == null) {
      return null;
    }
    const user = entities[selectedUserId];
    if (!user) {
      return null;
    }
    const total = orders.reduce((sum, o) => sum + o.total, 0);
    return { name: user.name, total };
  }
);
