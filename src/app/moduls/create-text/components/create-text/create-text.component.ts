import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';

import { Poetry } from '../../../../models/poetry';
import { environment } from '../../../../environments/environment';

import { ApiResponse } from 'src/app/moduls/shared/services/api-service/models/responses/base-responses/ApiResponse';

import { SharedDataService } from 'src/app/moduls/home/services/shared-data/shared-data.service';
import { ApiService } from 'src/app/moduls/shared/services/api-service/api.service';

@Component({
  selector: 'app-create-text',
  templateUrl: './create-text.component.html',
  styleUrls: ['./create-text.component.css']
})
export class CreateTextComponent implements OnInit {
  @Output() closeWithData: EventEmitter<string> = new EventEmitter<string>();

  modifyMode!: boolean;
  author!: string;
  poetryText: string = "";
  poetryName: string = "";
  poetry!: Poetry;

  dissName: string = "Марк";
  isSaved: boolean = false; 
  minLen: number = 1;
  randomWordsCount: number = 1;
  dissMode: boolean = false;

  shakeAble: boolean = true;
  shakesCount: number = 0;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private sharedDataService: SharedDataService, private apiService: ApiService) {}

  ngOnInit()
  {
    this.sharedDataService.selectedAuthorId.subscribe(data => {
      this.author = `${data}`;
    });

    this.route.queryParams.subscribe(params => {
      this.modifyMode = params['modifyMode'];
      this.poetry = params['poetry'];
    });

    this.onLoad();
  }

  onLoad(){
    if(this.modifyMode){
      this.poetryText = this.poetry.Text;
    } else {
      this.setNewPoetryName();
    }
  }
  setDefaultData(author: string){
    this.author = author;
    this.modifyMode = false;
    this.poetryText = "";
    this.poetryName = "";
    this.poetry = new Poetry("","","");
    this.isSaved = false;

    this.onLoad();
  }


  setNewPoetryName(){
    this.apiService.getTextsCount(+this.author).subscribe(
      (response: ApiResponse<number>) => {
        this.poetryName = (response.data + 1).toString();
      },
      error => {
        console.error('Error fetching data:', error);
      } 
    );
  }

  createPoetry(){
    if(this.author == "" || this.poetryText == ""){
      return;
    }
  
    let p: Poetry = new Poetry(this.author, "text", this.poetryText);
    this.apiService.createText(+this.author, this.poetryText, "text").subscribe(
      (response: ApiResponse<number>) => {
        console.log('Request successful:', response);
        
        p.Name = `${response.data}`;
        this.poetry = p;

        console.log(`Selected poetry. Author: ${this.poetry.Author}, Name: ${this.poetry.Name}, Text: ${this.poetry.Text}`);
        this.modifyMode = true;
      },
      error => {
        console.error('Request error:', error);
        alert(error.error?.Message);
      }
    );
  }

  updatePoetry(){
    if(this.poetry == undefined || this.poetry?.Author == "" || this?.poetryText == ""){
      return;
    }
    this.poetry.Text = this.poetryText;
    
    // form object
    this.http.post(`${environment.baseUrl}/poetry/put`, this.poetry).subscribe( 
      (response: any) => {
        console.log('Request successful:', response);
        alert(response.Message);

        this.isSaved = true;
      },
      error => {
        console.error('Request error:', error);
        alert(error.error?.Message);
      }
    );
  }

  onTextChange(){
    this.isSaved = false;
  }

  switchView(){
    console.log("switchView method...");
    this.closeWithData.emit(this.poetry.Name);
  }
  
  deletePoetry(){
    console.log("delete poetry executing...");
    if(!this.modifyMode) {
      return;
    }
    this.poetry.Text = "";
    
    // form object
    this.http.post(`${environment.baseUrl}/poetry/delete`, this.poetry).subscribe( 
      (response: any) => {
        console.log('Request successful:', response);
        alert(response.Message);
        this.navigateToView();
      },
      error => {
        console.error('Request error:', error);
        alert(error.error?.Message);
      }
    );
  }

  navigateTo(view: string, queryParams: object) {
    this.router.navigate([`/${view}`], { queryParams: queryParams });
  }

  navigateToView() {
    let queryParams = { 
      author: this.author,
      selectedNum: this.poetry.Name
    };

    this.navigateTo("view", queryParams);
  }

  addRandomWord(type: string, newLines: number = 0, author: string = this.author){
    if (this.minLen < 1) 
      this.minLen = 1;
    if (this.minLen > 10)
      this.minLen = 10;  

    let url = environment.baseUrl;

    if (type == 'author') {
      url += `/syntax/random/${author}/${this.minLen}/${this.randomWordsCount}`;
    } else if (type == 'local') {
      url += `/syntax/random/local/${this.randomWordsCount}`;
    } else if (type == 'global') {
      url += `/syntax/random/global/${this.randomWordsCount}`;
    } else {
      return;
    }

    console.log(`URL: ${url}`);
    this.http.get(url)
    .subscribe(
      (response: any) => {
        let words: string[] = response;

        // Replace one of words to dissName if necessary
        if (this.dissMode){
          words[this.getRandomNumber(0, words.length - 1)] = "Марк";
        }

        // updated text formatting
        let text = this.poetryText;
        words.forEach(function(word){
          word += " ";
          const lastChar = text.slice(-1);
          const needCaps = lastChar == '\n' || lastChar == '';
          const needsBefoureSpace = lastChar !== ' ' && lastChar !== '\n' && lastChar !== '';
          if(needCaps){
            word = word.charAt(0).toUpperCase() + word.slice(1);
          }
          if(needsBefoureSpace){
            word = " " + word;
          }
          text += word;
        });

        // new lines adding
        for (let i = 0; i < newLines; i++) 
          text += '\n';
        // result saving
        this.poetryText = text;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  addText(text: string){
    this.poetryText += text;
  }

  async multiAddRandomWord(){
    let blocks = 1;
    for(let i = 0; i < blocks; i++){
      await this.addRandomWord('local', 1);
      await this.addRandomWord('global', 1);
      await this.addRandomWord('global', 1);
      await this.addRandomWord('local', 1);
    }
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  minLenAction(action: string){
    const min = 1;
    const max = 10;

    if (action == '+'){
      if (this.minLen < max){
        this.minLen++;
      }
    }else if (action == '-'){
      if (this.minLen > min){
        this.minLen--;
      }
    }
  }
  randomWordsCountAction(action: string){
    const min = 1;
    const max = 10;

    if (action == '+'){
      if (this.randomWordsCount < max){
        this.randomWordsCount++;
      }
    }else if (action == '-'){
      if (this.randomWordsCount > min){
        this.randomWordsCount--;
      }
    }
  }
  shakesCountAction(action: string){
    const min = 0;
    const max = 10;

    if (action == '+'){
      if (this.shakesCount < max){
        this.shakesCount += 2;
      }
    }else if (action == '-'){
      if (this.shakesCount > min){
        this.shakesCount -= 2;
      }
    }
  }


  translateShaker(){
    if(this.shakesCount == 0 || this.poetryText == "") 
      return;
    this.shakeAble = false;
    let o = { Text: this.poetryText, SwitchTimes: this.shakesCount}
    this.http.post(`${environment.baseUrl}/poetry/translate`, o)
    .subscribe(
      (response: any) => {
        this.poetryText = response;
        this.shakeAble = true;
      },
      error => {
        console.error('Error fetching data:', error);
        this.shakeAble = true;
      } 
    );
  }
}

