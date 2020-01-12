import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {User} from '../../shared/interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  users: User[] = [];
  uSub: Subscription;
  dsub: Subscription;
  searchStr = '';

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.uSub = this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  remove(id: string) {
    // @ts-ignore
    this.dsub = this.userService.remove(id)._subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.dsub) {
      this.dsub.unsubscribe();
    }
  }

}
