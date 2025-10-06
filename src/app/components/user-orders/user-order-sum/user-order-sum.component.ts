import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store} from "@ngrx/store";
import {selectUserNameAndOrdersSum} from "../../../store/users/users.reducer";
import {LoaderComponent} from "../../../shared/loader/loader.component";
import {ordersFeature} from "../../../store/orders/orders.reducer";

@Component({
  selector: 'app-user-order-sum',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './user-order-sum.component.html',
  styleUrls: ['./user-order-sum.component.scss']
})
export class UserOrderSumComponent {
  userData$ = this.store.select(selectUserNameAndOrdersSum);
  orderLoading$ = this.store.select(ordersFeature.selectLoading);

  constructor(private store: Store) {
  }

}
