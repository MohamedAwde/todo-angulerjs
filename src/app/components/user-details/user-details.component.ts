import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.userUpdatedEvent.subscribe((data) => {
      this.user = undefined;
    });
    this.userService.userPopulateEvent.subscribe((data) => (this.user = data));
    this.userService.userDeletedEvent.subscribe((data) => {
      if (this.user?.id === data.id) {
        this.user = undefined;
      }
    });
  }
  user?: User;
}
