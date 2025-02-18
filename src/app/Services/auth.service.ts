import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userLoggedBehavior: BehaviorSubject<boolean>;

  constructor(private cookieService: CookieService) {
    this.userLoggedBehavior = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  login(token: string): void {
    this.cookieService.set('Token', token);
    this.userLoggedBehavior.next(true);
  }

  // register(token: string): void {
  //   this.cookieService.set('Token', token);
  //   this.userLoggedBehavior.next(true);
  // }

  logout(): void {
    this.cookieService.delete('Token', '/');
    this.userLoggedBehavior.next(false);
  }

  getUserLogged(): Observable<boolean> {
    return this.userLoggedBehavior.asObservable();
  }

  get isUserLogged(): boolean {
    return this.cookieService.check('Token');
  }
}
