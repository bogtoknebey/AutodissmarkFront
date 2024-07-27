import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    PlayerComponent,
    RecorderComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    PlayerComponent,
    RecorderComponent,
    LoginComponent,
    LogoutComponent
  ]
})
export class SharedModule { }
