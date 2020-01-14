import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../shared/user.service';
import {switchMap} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  submitted = false;
  uSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private  alert: AlertService
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.userService.getById(params.id);
      })
    ).subscribe((user: User) => {
      this.user = user;
      this.form = new FormGroup({
        name: new FormControl(user.name, Validators.required),
        surname: new FormControl(user.surname, Validators.required),
        city: new FormControl(user.city, Validators.required),
        company: new FormControl(user.company, Validators.required),
        email: new FormControl(user.email, Validators.required),
        password: new FormControl(user.password),
        phone: new FormControl(user.phone, Validators.required),
        id: new FormControl(user.id),
      });
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.uSub = this.userService.update({
      ...this.user,
      id: this.user.id,
      name: this.form.value.name,
      surname: this.form.value.surname,
      city: this.form.value.city,
      company: this.form.value.company,
      email: this.form.value.email,
      password: this.form.value.password,
      phone: this.form.value.phone
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Данные обновлены');
    });
  }

}
