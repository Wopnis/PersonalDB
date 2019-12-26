import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {FbCreateResponse, User} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}

  create(user: User): Observable<User> {
      return this.http.post<User>(`${environment.fbDbUrl}/users.json`, user)
        .pipe(map((response: FbCreateResponse) => {
          return {
            ...user,
            id: response.name,
            date: new Date(user.date)
          };
        }));

  }
}


// 'mongodb://localhost:27017/users-database'

// `${environment.fbDbUrl}/users.json`

// 'http://localhost:8000/users/'
