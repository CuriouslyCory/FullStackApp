// Core libraries
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import models
import { EventRecord } from '../models/event-record';
import { Session } from '../models/session';

// Import environemnt variables
import { environment } from '../../environments/environment';

@Injectable()
export class AnalyticsService {

  private eventApiUrl = `${environment.apiUrl}/event`;
  private sessionId = localStorage.getItem('sessionId');

  constructor(private http: Http) { }

  // Create event action
  postEvent(eventTitle: string): Promise<EventRecord> {
    const HEADERS = new Headers({ 'Content-Type': 'application/json' });
    const OPTIONS = new RequestOptions({ headers: HEADERS });
    return this.http.post( this.eventApiUrl, JSON.stringify({eventTitle: eventTitle, sessionId: this.sessionId}), OPTIONS )
                    .toPromise()
                    .then(response => {
                      // If this is the first event tracked it will pass back a new sessionId.
                      // Store the sessionId in localStorage so it persists
                      if (this.sessionId === '' || this.sessionId === null){
                        this.sessionId = response.json().sessionId;
                        localStorage.setItem('sessionId', this.sessionId);
                      }
                      return response.json() as EventRecord
                    })
                    .catch(this.handleError);
  }

  // Get a paginated list of sessions
  getSessionList(): Promise<Session[]> {
    return this.http.get( this.eventApiUrl )
                    .toPromise()
                    .then(response => {
                      // If this is the first event tracked it will pass back a new sessionId.
                      // Store the sessionId in localStorage so it persists
                      if (this.sessionId === '' || this.sessionId === null){
                        this.sessionId = response.json().sessionId;
                        localStorage.setItem('sessionId', this.sessionId);
                      }
                      return response.json() as Session[]
                    })
                    .catch(this.handleError);
  }

  // Get Session Event Details
//  getSessionDetails(sessionId: string): Promise<EventRecord[]> {
//    
//  }

  // I would definitely want to handle errors better in a real world situation
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}
