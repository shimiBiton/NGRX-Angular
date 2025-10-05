import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from './user.model';

export const UsersActions = createActionGroup({
  source: 'User/API',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),
    'Upsert User': props<{ user: User }>(),
    'Delete User': props<{ id: number }>(),
    'Set Selected User': props<{ id: number }>(),
  }
});
