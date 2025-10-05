import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions } from './users.actions';
import {UserService} from "../services/user.service";
import {OrdersActions} from "../orders/orders.actions";
import {OrderService} from "../services/order.service";


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    );
  });

  deleteUserOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      tap(({ id }) => this.orderService.deleteOrdersByUser(id)),
      map(({ id }) => OrdersActions.deleteOrdersByUser({ userId: id }))
    )
  );

}
