import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CreateTextComponent } from '../create-text/components/create-text/create-text.component';
import { ViewTextComponent } from '../view-text/components/view-text/view-text.component';
import { SyntaxTextComponent } from '../syntax-text/components/syntax-text/syntax-text.component';
import { MenuComponent } from './components/menu/menu.component';

import { authGuard } from '../shared/services/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'home/create', component: CreateTextComponent, canActivate: [authGuard] },
      { path: 'home/view', component: ViewTextComponent, canActivate: [authGuard] },
      { path: 'home/syntax', component: SyntaxTextComponent, canActivate: [authGuard] },
      { path: 'home/menu', component: MenuComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'home/menu', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
