import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditMode } from 'src/app/edit-mode';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.css'],
})
export class UserFromComponent implements OnInit {
  @ViewChild('userNameForm') form?: NgForm;
  editMode: EditMode = EditMode.NEW_PRODUCT;
  userId = '';
  loading = false;
  error: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.userSelectedEvent.subscribe(({ id, ...data }) => {
      console.log('selected user id', id);
      this.userId = id;
      this.form?.setValue(data);
      this.editMode = EditMode.EDIT_PRODUCT;
    });
  }

  handleSubmit() {
    this.retry();
  }

  retry() {
    this.loading = true;
    this.form?.form.disable();

    if (this.editMode === EditMode.NEW_PRODUCT && !this.userId) {
      this.usersService.userAdd(this.form?.value).subscribe(
        () => {
          this.loading = false;
          this.error = '';
          this.form?.form.enable();
          this.form?.reset();
          this.userId = '';
        },
        (error) => {
          this.form?.form.enable();
          this.loading = false;
          this.error = 'Error while connecting to the server';
        }
      );
    } else {
      this.usersService
        .userUpdated({ ...this.form?.value, id: this.userId })
        .subscribe(
          () => {
            this.loading = false;
            this.error = '';
            this.form?.form.enable();
            this.editMode = EditMode.NEW_PRODUCT;
            this.form?.reset();
            this.userId = '';
          },
          (error) => {
            this.form?.form.enable();
            this.loading = false;
            this.error = 'Error while connecting to the server';
          }
        );
    }
  }
}
