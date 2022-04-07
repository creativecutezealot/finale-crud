import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
interface IPerson {
  name: string;
  address: string;
  phone: string;
}
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: IPerson[] = [];
  currentUser = null;
  currentIndex = -1;
  search = '';
  type = 'onlyName';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveUsers();
    this.currentUser = null;
    this.currentIndex = -1;
  }

  setActiveUser(user, index): void {
    this.currentUser = user;
    this.currentIndex = index;
  }


  searchUser(): void {
    this.userService.findByQuery(`${this.type}=${this.search}`)
      .subscribe(
        data => {
          this.currentUser = null;
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  onChangeType(e): void {
    this.type = e.target.value;
  }
}
