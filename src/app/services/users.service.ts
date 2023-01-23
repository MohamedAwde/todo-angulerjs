import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, of } from 'rxjs';

import { User, Users } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: Users = [];

  userPopulateEvent = new EventEmitter<User>();
  userDeletedEvent = new EventEmitter<User>();
  userSelectedEvent = new EventEmitter<User>();
  userUpdatedEvent = new EventEmitter<User>();
  userAddedEvent = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  getUsers() {
    if (this.users.length > 0) {
      return of(this.users);
    } else {
      return this.http.get<Users>('http://localhost:3000/users');
    }
  }

  userAdd(newUser: User) {
    return this.http.post<User>('http://localhost:3000/users', newUser).pipe(
      map((user) => {
        this.users.push(user);
        this.onUserAdded(user);
        return user;
      })
    );
  }
  userRemove(oldUser: User) {
    return this.http
      .delete<User>('http://localhost:3000/users/' + oldUser.id)
      .pipe(
        map((user) => {
          const userIndex = this.users.findIndex((u) => u.id === user.id);
          if (userIndex) {
            this.users.splice(userIndex, 1);
            this.userDeletedEvent.emit(user);
          } else {
            this.users = [];
          }
        })
      );
  }
  userUpdated(updatedUser: User) {
    return this.http
      .put<User>('http://localhost:3000/users/' + updatedUser.id, updatedUser)
      .pipe(
        map((user) => {
          const userIndex = this.users.findIndex((u) => u.id === user.id);
          this.users[userIndex] = user;
          this.onUserUpdated(user);
        })
      );
  }
  userSelected(user: User) {
    this.onUserSelected(user);
  }

  private onUserSelected(user: User) {
    this.userSelectedEvent.emit(user);
  }

  private onUserUpdated(user: User) {
    this.userUpdatedEvent.emit(user);
  }

  private onUserAdded(user: User) {
    this.userAddedEvent.emit(user);
  }
}
