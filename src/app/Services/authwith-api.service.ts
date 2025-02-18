import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../Models/iuser';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthwithApiService {

  baseURL = `${environment.baseUrl}/admin/login`;
  constructor(private httpclient: HttpClient) { }

  login(user: IUser): Observable<{ token: string }>{
    return this.httpclient.post<{ token: string }>(this.baseURL, user);
  }
}
