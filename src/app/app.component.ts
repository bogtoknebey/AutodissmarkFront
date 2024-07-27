import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { Poetry } from './models/poetry';

import {CreateTextComponent} from './moduls/create-text/components/create-text/create-text.component';
import {ViewTextComponent} from './moduls/view-text/components/view-text/view-text.component';
import {SyntaxTextComponent} from './moduls/syntax-text/components/syntax-text/syntax-text.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild(CreateTextComponent) createCmp!: CreateTextComponent;
  @ViewChild(ViewTextComponent) randomCmp!: ViewTextComponent;
  @ViewChild(SyntaxTextComponent) syntaxCmp!: SyntaxTextComponent;

  name: number = -1;
  createModifyMode: boolean = false;
  selectedPoetry!: Poetry;

  authors!: string[];
  selectedAuthor: string = "";
  selectedAuthorPoetryCount: number = 0;

  baseUrl:string = environment.baseUrl;

  constructor(private http: HttpClient){}
  ngOnInit(){
    this.getAuthors();
  }

  randomView: boolean = false;
  createView: boolean = false;
  syntaxView: boolean = false;

  setRandomView(name: number = 1){
    this.name = name
    console.log("setRandomView");
    this.createView = false;
    this.syntaxView = false;
    this.randomView = true;
  }
  setCreateView(modifyMode: boolean = false){
    this.createModifyMode = modifyMode;
    console.log("setCreateView");
    this.randomView = false;
    this.syntaxView = false;
    this.createView = true;
  }
  setSyntaxView(){
    console.log("setSyntaxView");
    this.randomView = false;
    this.createView = false;
    this.syntaxView = true;
  }
  reset(){
    console.log("reset");
    this.createView = false;
    this.randomView = false;
    this.syntaxView = false;
  }

  getAuthors(){
    this.http.get(`${this.baseUrl}/poetry`)
    .subscribe(
      (response: any) => {
        this.authors = response;
        this.selectedAuthor = this.authors[1];
        this.getPoetryCount();
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  onAuthorSelect(){
    this.getPoetryCount();
    this.reloadSubpageWithDefault();
  }

  getPoetryCount(){
    this.http.get(`${this.baseUrl}/poetry/count/${this.selectedAuthor}`)
    .subscribe(
      (response: any) => {
        this.selectedAuthorPoetryCount = response;
      },
      error => {
        console.error('Error fetching data:', error);
      } 
    );
  }

  reloadSubpageWithDefault(){
    // let delay = 50;
    // if(this.randomView){
    //   this.reset();
    //   setTimeout(() => {
    //     this.setRandomView();
    //   }, delay);    
    // } else if(this.createView){
    //   this.reset();
    //   setTimeout(() => {
    //     this.setCreateView();
    //   }, delay);    
    // } else if(this.syntaxView){
    //   this.reset();
    //   setTimeout(() => {
    //     this.setSyntaxView();
    //   }, delay);
    // }
    if(this.createView){
      this.createCmp.setDefaultData(this.selectedAuthor);
    } else if(this.randomView){
      this.randomCmp.setDefaultData(this.selectedAuthor);
    } else if(this.syntaxView){
      this.syntaxCmp.setDefaultData(this.selectedAuthor);
    }
  }

  createToView(data: string) {
    let name = parseInt(data);
    this.setRandomView(name);
    this.getPoetryCount();
  }

  viewToCreate(data: Poetry){
    this.selectedPoetry = data;
    this.setCreateView(true);
  }
}
