import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {usersFeature} from "../../store/users/users.reducer";
import {Store} from "@ngrx/store";
import {UsersActions} from "../../store/users/users.actions";
import {LoaderComponent} from "../../shared/loader/loader.component";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users$ = this.store.select(usersFeature.selectAll);
  loading$ = this.store.select(usersFeature.selectLoading);
  error$ = this.store.select(usersFeature.selectError);

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(UsersActions.loadUsers());
  }

  deleteUser(id: number): void {
    this.store.dispatch(UsersActions.deleteUser({id}));
  }

}
