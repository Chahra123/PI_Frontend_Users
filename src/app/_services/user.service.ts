import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/_model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:8754';
  requestHeader = new HttpHeaders({
    'No-Auth': 'True',
  });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}
  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }
  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: any[] | null = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].nomRole === allowedRoles[j]) {
            isMatch = true;
          }
        }
      }
    }
    return isMatch;
  }
  getUsersList():Observable<User[]>{
    return this.httpclient.get<User[]>(this.PATH_OF_API+'/users');
  }
  createUser(user:User):Observable<Object>{
    return this.httpclient.post(this.PATH_OF_API+'/users',user);
  }
  updateUser(id:number,user:User):Observable<Object>
  {
    return this.httpclient.put(this.PATH_OF_API+'/users'+`/${id}`,user);
  }
  getUserById(id:number):Observable<User>
  {
    return this.httpclient.get<User>(this.PATH_OF_API+'/users'+`/${id}`);
  }
  deleteUser(id:number):Observable<Object>
  {
    return this.httpclient.delete(this.PATH_OF_API+'/users'+`/${id}`);
  }
}
