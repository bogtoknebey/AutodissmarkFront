import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ViewTextComponent } from './components/view-text/view-text.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewTextComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    ViewTextComponent
  ]
})
export class ViewTextModule { }
