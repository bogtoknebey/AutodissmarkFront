import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './moduls/shared/components/login/login.component';
import { LogoutComponent } from './moduls/shared/components/logout/logout.component';
import { authGuard } from './moduls/shared/services/auth-guard/auth.guard';
import { HomeComponent } from './moduls/home/components/home/home.component';
import { CreateTextComponent } from './moduls/create-text/components/create-text/create-text.component';
import { ViewTextComponent } from './moduls/view-text/components/view-text/view-text.component';
import { SyntaxTextComponent } from './moduls/syntax-text/components/syntax-text/syntax-text.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
