import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import { of } from 'rxjs';
import { UsersActions } from './users.actions';
import {UserService} from "../services/user.service";


@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
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
}
