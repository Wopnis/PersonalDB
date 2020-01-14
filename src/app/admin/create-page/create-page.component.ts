import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {UserService} from '../../shared/user.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private  alert: AlertService
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      surname: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      company: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.form.value.name,
      surname: this.form.value.surname,
      city: this.form.value.city,
      email: this.form.value.email,
      phone: this.form.value.phone,
      company: this.form.value.company,
      date: new Date()
    };
    this.userService.create(user).subscribe(() => {
      this.form.reset();
      this.alert.success('Пользователь добавлен');
    });
    console.log(user);
  }

}
