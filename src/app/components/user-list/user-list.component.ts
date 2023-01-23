import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, Users } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Users = [];
  usersSubscription?: Subscription;
  loading: boolean = true;
  error: string = '';
  deleting = false;
  currDeletingUserIndex = 0;

  constructor(private usersService: UsersService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.retry();

    this.usersService.userUpdatedEvent.subscribe((user) => {
      const userIndex = this.users.findIndex((u) => u.id === user.id);
      this.users[userIndex] = user;
    });

    this.usersService.userAddedEvent.subscribe((user) => {
      this.users.push(user);
    });

    this.usersService.userDeletedEvent.subscribe((user) => {
      const userIndex = this.users.findIndex((u) => u.id === user.id);
      this.users.splice(userIndex, 1);
    });
  }

  handleDelete(user: User, index: number) {
    this.currDeletingUserIndex = index;
    this.deleting = true;
    this.error = '';
    this.usersService.userRemove(user).subscribe(
      () => {
        this.deleting = false;
        this.error = '';
      },
      (error) => {
        this.deleting = false;
        this.error = error;
      }
    );
    this.usersService.getUsers().subscribe((users) => (this.users = users));
  }

  handlePopulateInfo(user: User) {
    this.usersService.userPopulateEvent.emit(user);
  }

  handlePopulateToFrom(user: User) {
    this.usersService.userSelected(user);
  }

  retry() {
    this.error = '';
    this.loading = true;

    this.usersSubscription = this.usersService.getUsers().subscribe(
      (users) => {
        this.loading = false;
        this.users = users;
      },
      (_error) => {
        this.error = 'Error while connecting to the server';
      }
    );
  }
}
