import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { AddTargetToTextRequest } from "./models/requests/AddTargetToTextRequest";
import { CreateAuthorRequest } from './models/requests/CreateAuthorRequest';
import { CreateAutoVoiceoverRequest } from './models/requests/CreateAutoVoiceoverRequest';
import { CreateDissRequest } from './models/requests/CreateDissRequest';
import { CreateManualVoiceoverRequest } from './models/requests/CreateManualVoiceoverRequest';
import { CreateTextRequest } from './models/requests/CreateTextRequest';
import { ExpandTextRequest } from './models/requests/ExpandTextRequest';
import { LoginRequest } from './models/requests/LoginRequest';
import { Language, SwitchTranslateTextRequest } from './models/requests/SwitchTranslateTextRequest';
import { UpdateTextRequest } from './models/requests/UpdateTextRequest';

import { ApiResponse } from './models/responses/base-responses/ApiResponse';
import { GetDissResponse } from './models/responses/GetDissResponse';
import { GetRandomTextResponse } from './models/responses/GetRandomTextResponse';
import { GetVoiceoverResponse } from './models/responses/GetVoiceoverResponse';
import { LoginResponse } from './models/responses/LoginResponse';
import { GetAuthorResponse } from './models/responses/GetAuthorResponse';
import { GetTextResponse } from './models/responses/GetTextResponse';
import { DictionaryResponse } from './models/responses/DictionaryResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  //#region Auth
  login(login: string, password: string): Observable<ApiResponse<LoginResponse>>{
    const url = `${environment.baseUrl}/Auth/login`;
    const request = new LoginRequest(login, password);

    return this.http.post<ApiResponse<LoginResponse>>(url, request);
  }
  //#endregion
  
  //#region Author
  registerAuthor(name: string, email: string, password: string): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Author/register-author`;
    const request = new CreateAuthorRequest(name, email, password, "User");

    return this.http.post<ApiResponse<number>>(url, request);
  }

  getAuthor(authorId: string): Observable<ApiResponse<GetAuthorResponse>>{
    const url = `${environment.baseUrl}/Author/get-author?id=${authorId}`;
    return this.http.get<ApiResponse<GetAuthorResponse>>(url);
  }

  getAuthorsCount(): Observable<ApiResponse<number>> {
    const url = `${environment.baseUrl}/Author/get-authors-count`;
    return this.http.get<ApiResponse<number>>(url);
  }

  getAllAuthors(): Observable<ApiResponse<GetAuthorResponse[]>>{
    const url = `${environment.baseUrl}/Author/get-all-authors-list`;
    return this.http.get<ApiResponse<GetAuthorResponse[]>>(url);
  }
  //#endregion

  //#region Test
  test(): Observable<ApiResponse<string>>{
    const url = `${environment.baseUrl}/Test/test`;
    return this.http.get<ApiResponse<string>>(url);
  }
  //#endregion

  //#region Syntax
  getIncludes(authorId: number, minimalLength: number): Observable<ApiResponse<DictionaryResponse>>{
    const url = `${environment.baseUrl}/Syntax/get-includes?authorId=${authorId}&minimalLength=${minimalLength}`;
    return this.http.get<ApiResponse<DictionaryResponse>>(url);
  }

  getAuthorRandomWords(authorId: number, minimalLength: number, wordsCount: number): Observable<ApiResponse<string[]>>{
    const url = `${environment.baseUrl}/Syntax/get-author-random-words?authorId=${authorId}&minimalLength=${minimalLength}&wordsCount=${wordsCount}`;
    return this.http.get<ApiResponse<string[]>>(url);
  }
  //#endregion

  //#region Text
  createText(authorId: number, text: string, title: string): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Text/create-text`;
    const request = new CreateTextRequest(authorId, text, title);

    return this.http.post<ApiResponse<number>>(url, request);
  }

  getText (textId: number): Observable<ApiResponse<GetTextResponse>>{
    const url = `${environment.baseUrl}/Text/get-text?id=${textId}`;
    return this.http.get<ApiResponse<GetTextResponse>>(url);
  }

  getRandomTexts(authorId: number, textsCount: number): Observable<ApiResponse<GetRandomTextResponse[]>>{
    const url = `${environment.baseUrl}/Text/get-random-texts?authorId=${authorId}&textsCount=${textsCount}`;
    return this.http.get<ApiResponse<GetRandomTextResponse[]>>(url);
  }

  getTextsCount(authorId: number): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Text/get-texts-count?authorId=${authorId}`;
    return this.http.get<ApiResponse<number>>(url);
  }

  updateText(textId: number, authorId: number, text: string, title: string): Observable<ApiResponse<null>>{
    const url = `${environment.baseUrl}/Text/update-text`;
    const request = new UpdateTextRequest(textId, authorId, text, title);
    
    return this.http.put<ApiResponse<null>>(url, request);
  }

  deleteText(textId: number): Observable<ApiResponse<null>>{
    const url = `${environment.baseUrl}/Text/delete-text?id=${textId}`;   
    return this.http.delete<ApiResponse<null>>(url);
  }
  //#endregion

  //#region TextProccessing
  switchTranslateText(text: string, switchLanguage: Language, switchTimes: number): Observable<ApiResponse<string>>{
    const url = `${environment.baseUrl}/TextProccessing/switch-translate-text`;
    const request = new SwitchTranslateTextRequest(text,switchLanguage, switchTimes);

    return this.http.post<ApiResponse<string>>(url, request);
  }

  addTargetToText(text: string, target: string): Observable<ApiResponse<string>>{
    const url = `${environment.baseUrl}/TextProccessing/add-target-to-text`;
    const request = new AddTargetToTextRequest(text, target);

    return this.http.post<ApiResponse<string>>(url, request);
  }

  getRandomWords(dictionaryId: number, wordsCount: number): Observable<ApiResponse<string[]>>{
    const url = `${environment.baseUrl}/TextProccessing/get-random-words?dictionaryId=${dictionaryId}&wordsCount=${wordsCount}`;
    return this.http.get<ApiResponse<string[]>>(url);
  }

  generateText(linesCount: number, wordsInLineCount: number): Observable<ApiResponse<string>>{
    const url = `${environment.baseUrl}/TextProccessing/generate-text?linesCount=${linesCount}&wordsInLineCount=${wordsInLineCount}`;
    return this.http.get<ApiResponse<string>>(url);
  }
  //#endregion

  //#region Voiceover
  createManualVoiceover(textId: number, audioData: Blob): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Voiceover/create-manual-voiceover`;
    const request = new CreateManualVoiceoverRequest(textId, audioData);

    return this.http.post<ApiResponse<number>>(url, request);
  }

  createAutoVoiceover(textId: number, voiceId: number): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Voiceover/create-auto-voiceover`;
    const request = new CreateAutoVoiceoverRequest(textId, voiceId);

    return this.http.post<ApiResponse<number>>(url, request);
  }

  getVoiceover(voiceoverId: number): Observable<ApiResponse<GetVoiceoverResponse>>{
    const url = `${environment.baseUrl}/Voiceover/get-voiceover?id=${voiceoverId}`;
    return this.http.get<ApiResponse<GetVoiceoverResponse>>(url);
  }

  getVoiceoversByTextId(textId: number): Observable<ApiResponse<GetVoiceoverResponse[]>>{
    const url = `${environment.baseUrl}/Voiceover/get-text-voiceovers?textId=${textId}`;
    return this.http.get<ApiResponse<GetVoiceoverResponse[]>>(url);
  }

  deleteVoiceover(voiceoverId: number): Observable<ApiResponse<null>>{
    const url = `${environment.baseUrl}/Voiceover/delete-voiceover?id=${voiceoverId}`;
    return this.http.get<ApiResponse<null>>(url);
  }
  //#endregion
  
  //#region Diss
  createDiss(acapellaId: number, beatId: number, startPointMilliseconds: number, target: string): Observable<ApiResponse<number>>{
    const url = `${environment.baseUrl}/Diss/create-diss`;
    const request = new CreateDissRequest(acapellaId, beatId, startPointMilliseconds, target);

    return this.http.post<ApiResponse<number>>(url, request);
  }

  getDiss(dissId: number): Observable<ApiResponse<GetDissResponse>>{
    const url = `${environment.baseUrl}/Diss/get-diss?id=${dissId}`;
    return this.http.get<ApiResponse<GetDissResponse>>(url);
  }

  deleteDiss(dissId: number): Observable<ApiResponse<null>>{
    const url = `${environment.baseUrl}/Diss/delete-diss?id=${dissId}`;
    return this.http.get<ApiResponse<null>>(url);
  }
  //#endregion
}