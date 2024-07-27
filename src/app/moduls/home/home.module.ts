import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { HomeRoutingModule } from './home-routing.module'
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CreateTextModule } from '../create-text/create-text.module';
import { SyntaxTextModule } from '../syntax-text/syntax-text.module';
import { ViewTextModule } from '../view-text/view-text.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    
    SharedModule,
    CreateTextModule,
    SyntaxTextModule,
    ViewTextModule
  ]
})
export class HomeModule { }
