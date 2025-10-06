import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {User} from "../../store/users/user.model";
import {UsersActions} from "../../store/users/users.actions";

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      name: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        id: Number(this.userForm.value.id),
        name: this.userForm.value.name,
      };

      this.store.dispatch(UsersActions.upsertUser({user}));
      this.userForm.reset();
    }
  }
}
