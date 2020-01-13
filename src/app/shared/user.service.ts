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
  getAll(): Observable<User[]> {
    return this.http.get(`${environment.fbDbUrl}/users.json`)
      .pipe(map((response:{[key: string]: any}) => {
        return Object
          .keys(response)
        .map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        }));
      }));
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.fbDbUrl}/users/${id}.json`)
      .pipe(map((user: User) => {
        return {
          ...user, id,
        date: new Date(user.date)
      };
    }));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void >(`${environment.fbDbUrl}/users/${id}.json`);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${environment.fbDbUrl}/users/${user.id}.json`, user);
  }
}


// 'mongodb://localhost:27017/users-database'

// `${environment.fbDbUrl}/users.json`

// 'http://localhost:8000/users/'
