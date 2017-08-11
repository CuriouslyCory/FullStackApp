// Core libraries
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import product model
import { EventRecord } from '../models/event-record';


@Injectable()
export class AnalyticsService {

  private eventApiUrl = 'http://fullstack.api/event';

  constructor(private http: Http) { }

  // Create event action
  postEvent(eventTitle: string): Promise<EventRecord> {
    const HEADERS = new Headers({ 'Content-Type': 'application/json' });
    const OPTIONS = new RequestOptions({ headers: HEADERS });
    return this.http.post( this.eventApiUrl, JSON.stringify({eventTitle: eventTitle}), OPTIONS )
                    .toPromise()
                    .then(response => response.json().data as EventRecord)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}