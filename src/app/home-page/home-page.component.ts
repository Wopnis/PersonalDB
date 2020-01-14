import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {User} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private userServce: UserService) { }

  ngOnInit() {
    this.users$ = this.userServce.getAll()
  }

}
