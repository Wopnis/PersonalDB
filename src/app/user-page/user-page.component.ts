import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {User} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user$: Observable<User> ;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user$ = this.route.params
      .pipe(switchMap((params: Params) => {
          return this.userService.getById(params.id);
      }
      ));
  }

}
