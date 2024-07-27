import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private selectedAuthorIdSubject = new BehaviorSubject<number>(-1);
  private selectedTextIdSubject = new BehaviorSubject<number>(-1);

  selectedAuthorId = this.selectedAuthorIdSubject.asObservable();
  selectedTextId = this.selectedAuthorIdSubject.asObservable();

  setAuthor(authorId: number) {
    this.selectedAuthorIdSubject.next(authorId);
  }

  setText(textId: number) {
    this.selectedTextIdSubject.next(textId);
  }
}