import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private eventSubject = new Subject<{ event: string, payload?: any }>();

  constructor() { }

  public publish(event: string, payload?: any): void{
    this.eventSubject.next({event, payload});
  }

  listening(event: string): Observable<{ event: string, payload?: any }> {
    return this.eventSubject.pipe(filter(data => (data.event === event)));
  }
}
