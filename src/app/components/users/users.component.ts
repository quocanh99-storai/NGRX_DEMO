import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as UserSelector from 'src/app/state/user/user.selector';
import * as UserActions from "../../state/user/user.actions";

@Component({
  selector: 'app-users',
  template: `
    <div *ngIf="loading$ | async" class="container">
      <div class="text-center mt-3">
        <div class="spinner-grow spinner-grow-sm text-dark" role="status">
        </div>
        <span class="ms-2">Loading...</span>
      </div>
    </div>

    <div class="d-flex align-content-center justify-content-between my-4">
      <h2>Users</h2>
      <button class="btn btn-primary" (click)="addUser()">Add more</button>
    </div>

    <ng-container *ngIf="users$ | async as users">
      <table class="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          <tr *ngFor="let user of users">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>
                <button class="btn btn-danger" (click)="removeUser(user.id)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
    </ng-container>
  `,
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  users$ = this.store.select(UserSelector.selectUsers)
  loading$ = this.store.select(UserSelector.selectLoading)
  loaded$ = this.store.select(UserSelector.selectLoaded)
  error$ = this.store.select(UserSelector.selectError)

  addUser() {
    const user: User = {
      id: 6,
      name: 'Benly2',
      email: 'benly2@gmai.com'
    }
    this.store.dispatch(UserActions.addUser({ user }))
  }

  removeUser(id: number) {
    this.store.dispatch(UserActions.removeUser({ id }))
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers())
  }
}
