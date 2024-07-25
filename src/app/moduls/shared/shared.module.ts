import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './components/player/player.component';
import { RecorderComponent } from './components/recorder/recorder.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    PlayerComponent,
    RecorderComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
