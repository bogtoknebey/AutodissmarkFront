import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreateTextComponent } from './components/create-text/create-text.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateTextComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    CreateTextComponent
  ]
})
export class CreateTextModule { }
