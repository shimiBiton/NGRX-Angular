import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, distinctUntilChanged, map} from 'rxjs/operators';
import { of, switchMap } from 'rxjs';
import { OrdersActions } from './orders.actions';
import {OrderService} from "../services/order.service";
import {UsersActions} from "../users/users.actions";


@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrdersBySelectedUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.setSelectedUser),
      map(({ id }) => id),
      distinctUntilChanged(),
      switchMap((id) => [
        OrdersActions.loadOrdersByUser({ userId: id }),
      ])
    )
  );

  loadOrdersByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrdersByUser),
      switchMap(({ userId }) =>
        this.orderService.getOrdersByUser(userId).pipe(
          map((orders) =>
            OrdersActions.loadOrdersByUserSuccess({ orders })
          ),
          catchError((error) =>
            of(OrdersActions.loadOrdersByUserFailure({ error }))
          )
        )
      )
    )
  );
}
