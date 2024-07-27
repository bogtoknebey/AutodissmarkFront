import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SyntaxTextComponent } from './components/syntax-text/syntax-text.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SyntaxTextComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  exports:[
    SyntaxTextComponent
  ]
})
export class SyntaxTextModule { }
