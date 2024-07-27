import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUserValue;

  console.log("user: ", currentUser);
  
  if (currentUser) {
    return true;
  }

  console.log("auth failed");

  router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  return false;
};