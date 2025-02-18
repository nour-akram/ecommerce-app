import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const requireAuthGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router=inject(Router)
  if (authservice.isUserLogged) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
