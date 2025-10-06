import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {selectUserNameAndOrdersSum, usersFeature} from "../../store/users/users.reducer";
import {Store} from "@ngrx/store";
import {UsersActions} from "../../store/users/users.actions";
import {UserNameComponent} from "./user-name/user-name.component";
import {UserOrderSumComponent} from "./user-order-sum/user-order-sum.component";

@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserNameComponent, UserOrderSumComponent],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {
  users$ = this.store.select(usersFeature.selectAll);
  userData$ = this.store.select(selectUserNameAndOrdersSum);
  selectedUserId$ = this.store.select(usersFeature.selectSelectedUserId);

  constructor(private store: Store) {
  }

  selectUser(id: number) {
    this.store.dispatch(UsersActions.setSelectedUser({id}));
  }
}
