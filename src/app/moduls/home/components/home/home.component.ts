import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { Poetry } from '../../../../models/poetry';

import { CreateTextComponent } from 'src/app/moduls/create-text/components/create-text/create-text.component'; 
import { ViewTextComponent } from 'src/app/moduls/view-text/components/view-text/view-text.component';
import { SyntaxTextComponent } from 'src/app/moduls/syntax-text/components/syntax-text/syntax-text.component';

import { SharedDataService } from '../../services/shared-data/shared-data.service';
import { ApiService } from 'src/app/moduls/shared/services/api-service/api.service';

import { ApiResponse } from 'src/app/moduls/shared/services/api-service/models/responses/base-responses/ApiResponse';
import { GetAuthorResponse } from 'src/app/moduls/shared/services/api-service/models/responses/GetAuthorResponse';
import { Author } from 'src/app/models/Author';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  authors!: Author[];
  selectedAuthorId: number = -1;
  selectedAuthorTextsCount: number = 0;

  constructor(private http: HttpClient, private router: Router, private sharedDataService: SharedDataService, private apiService: ApiService){}

  ngOnInit(){
    this.getAuthors();
    this.resetNavigate();
  }

  getAuthors(){
    this.apiService.getAllAuthors().subscribe(
      (response: ApiResponse<GetAuthorResponse[]>) => {

        this.authors = response.data.map((authorResponse: GetAuthorResponse) => {
          return new Author(
            authorResponse.id,
            authorResponse.name,
            authorResponse.role
          );
        });

        this.selectedAuthorId = this.authors[1].id;
        this.getTextsCount();
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  getTextsCount(){
    this.apiService.getTextsCount(this.selectedAuthorId).subscribe(
      (response: ApiResponse<number>) => {
        console.log("Receive textsCount - response.data: ", response.data);
        this.selectedAuthorTextsCount = response.data;
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  onAuthorSelect(){
    this.sharedDataService.setAuthor(+this.selectedAuthorId);
    this.getTextsCount();
  }

  resetNavigate(){
    this.router.navigate([`/home/menu`]);
  }
}
