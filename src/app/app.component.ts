import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserOrdersComponent} from "./components/user-orders/user-orders.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {AddUserFormComponent} from "./components/add-user-form/add-user-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    UserOrdersComponent,
    UsersListComponent,
    AddUserFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fmr-exercise';
}
