import { Injectable } from '@angular/core';
import {delay, Observable, of} from "rxjs";
import {User} from "../users/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private mockUsers: User[] = [
    {
      id: 1,
      name: 'Shimi',
    },
    {
      id: 2,
      name: 'Biton',
    }
  ];

  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(500));
  }
}
