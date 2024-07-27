import { Component, OnInit, Input, HostListener, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Poetry } from '../../../../models/poetry';
import { AudioRecord } from '../../../../models/audioRecord';

import { SharedDataService } from 'src/app/moduls/home/services/shared-data/shared-data.service';
import { ApiService } from 'src/app/moduls/shared/services/api-service/api.service';

@Component({
  selector: 'app-view-text',
  templateUrl: './view-text.component.html',
  styleUrls: ['./view-text.component.css']
})

export class ViewTextComponent implements OnInit {
  baseUrl:string = environment.baseUrl;

  author!: string;
  selectedNum: number = -1;
  selectedPoetry: Poetry = new Poetry("", "", "");
  
  playerSwitch: boolean = false; 
  isLoad: boolean = false;

  autoAudioAble: boolean = true;
  recievedRecord: boolean = false;

  autoCreateAble:boolean = true;
  autoCreateRecord: boolean = false;

  
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private sharedDataService: SharedDataService){}

  ngOnInit() {
    this.sharedDataService.selectedAuthorId.subscribe(data => {
      this.author = `${data}`;
    });
    this.sharedDataService.selectedTextId.subscribe(data => {
      this.selectedNum = data;
    });

    this.route.queryParams.subscribe(params => {
      this.selectedNum = params['selectedNum'];
    });

    this.onLoad();
  }

  onLoad(){
    if(this.selectedNum > 0){
      this.byNumberFetch();
    }else{
      this.randomFetch();
    }
  }


  setDefaultData(author: string){
    this.author = author;
    this.selectedNum = 1;
    this.selectedPoetry = new Poetry("","","");
    this.playerSwitch = false;
    this.isLoad = false;
    
    this.onLoad();
  }


  playerRecordSwitch(){
    this.playerSwitch = !this.playerSwitch;
  }


  byNumberFetch(){
    this.isLoad = true;
    this.reset();
    this.http.get(`${this.baseUrl}/poetry/${this.author}/${this.selectedNum}`)
    .subscribe(
      (response: any) => {
        this.selectedPoetry = response;
        this.isLoad = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoad = false;
      }
    );
  }
  

  randomFetch(){
    this.isLoad = true;
    this.reset();
    this.http.get(`${this.baseUrl}/poetry/random/${this.author}`)
    .subscribe(
      (response: any) => {
        this.selectedPoetry = response;
        this.selectedNum = parseInt(this.selectedPoetry.Name);
        this.isLoad = false;
      },
      error => {
        console.error('Error fetching data:', error);
        this.isLoad = false;
      }
    );
  }


  addAutoCreate(){
    this.autoCreateAble = false;
    this.autoCreateRecord = false;

    let targetName = "Марк";

    this.http.get(`${this.baseUrl}/multi/autocreate/${this.author}/${targetName}`)
      .subscribe(
        (response: any) => {
          console.log('Audio uploaded successfully:', response);
          this.autoCreateAble = true;
          this.autoCreateRecord = true;
        },
        error => {
          console.error('Error fetching data:', error);
          this.autoCreateAble = true;
        }
      );
  }


  addAutoAudio(){
    this.autoAudioAble = false;
    this.recievedRecord = false;

    this.http.post(`${this.baseUrl}/voice/autocreate`, this.selectedPoetry)
      .subscribe(
        (response: any) => {
          console.log('Audio uploaded successfully:', response);
          this.autoAudioAble = true;
          this.recievedRecord = true;
        },
        error => {
          console.error('Error fetching data:', error);
          this.autoAudioAble = true;
        }
      );
  }


  getNext(){
    if(this.playerSwitch) return;
    if (this.selectedPoetry.Text != ""){
      console.log("getNext is working:");
      console.log(`Befour: author:${this.author}, selectedNum:${this.selectedNum}`);
      this.selectedNum++;
      this.byNumberFetch();
      console.log(`After: author:${this.author}, selectedNum:${this.selectedNum}`);
    }
  }


  getPrev(){
    if(this.playerSwitch) return;
    if (this.selectedNum > 1){
      console.log("getPrev is working:");
      console.log(`Befour: author:${this.author}, selectedNum:${this.selectedNum}`);
      this.selectedNum--;
      this.byNumberFetch();
      console.log(`After: author:${this.author}, selectedNum:${this.selectedNum}`);
    }
  }

  navigateTo(view: string, queryParams: object) {
    this.router.navigate([`/${view}`], { queryParams: queryParams });
  }

  navigateToCreate() {
    let queryParams = { 
      modifyMode: true,
      author: this.author,
      poetry: this.selectedNum
    };

    this.navigateTo("create", queryParams);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.isLoad) return;
    if(event.ctrlKey || event.metaKey){
      return;
    }
    
    if(this.playerSwitch) {
      
    } else {
      console.log("key has been cotched");
      if (event.key === 'ArrowLeft')
        this.getPrev();
      if (event.key === 'ArrowRight')
        this.getNext();
      if (event.key === 'r')
        this.randomFetch();
    };

    if (event.key === 's')
      this.playerRecordSwitch();
      
  }


  reset(){
    //this.playerSwitch = false;
    this.selectedPoetry = new Poetry("", "No found", "");
  }
}
