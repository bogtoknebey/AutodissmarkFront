import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './moduls/shared/shared.module';
import { CreateTextModule } from './moduls/create-text/create-text.module';
import { SyntaxTextModule } from './moduls/syntax-text/syntax-text.module';
import { ViewTextModule } from './moduls/view-text/view-text.module';
import { HomeModule } from './moduls/home/home.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './moduls/shared/services/jwt-interceptor/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    SharedModule,
    CreateTextModule,
    SyntaxTextModule,
    ViewTextModule,
    HomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }  // Зарегистрируйте интерсептор
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
