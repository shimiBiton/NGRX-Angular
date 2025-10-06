import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {usersFeature} from "../../../store/users/users.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent {
  user$ = this.store.select(usersFeature.selectedUser);

  constructor(private store: Store) {
  }

}
