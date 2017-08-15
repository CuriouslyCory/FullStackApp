// core libraries
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// import models
import { EventRecord } from '../models/event-record';
import { Session } from '../models/session';

// import environemnt variables
import { environment } from '../../environments/environment';

@Injectable()
export class AnalyticsService {

  private eventApiUrl = `${environment.apiUrl}/session`;
  private sessionId = localStorage.getItem('sessionId');

  constructor(private http: Http) { }

  // create event action
  postEvent(eventTitle: string): Promise<EventRecord> {
    // set the content type so lumen knows how to translate the content body
    const HEADERS = new Headers({ 'Content-Type': 'application/json' });
    const OPTIONS = new RequestOptions({ headers: HEADERS });

    // post the event to the api
    return this.http.post( `${this.eventApiUrl}/event`, JSON.stringify({eventTitle: eventTitle, sessionId: this.sessionId}), OPTIONS )
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

  // get a list of sessions
  // todo: add pagination
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

  // get session event details
  getSessionDetails(sessionId: string): Promise<EventRecord[]> {
    return this.http.get( `${this.eventApiUrl}/event/${sessionId}` )
                    .toPromise()
                    .then(response => {
                      // If this is the first event tracked it will pass back a new sessionId.
                      // Store the sessionId in localStorage so it persists
                      if (this.sessionId === '' || this.sessionId === null){
                        this.sessionId = response.json().sessionId;
                        localStorage.setItem('sessionId', this.sessionId);
                      }
                      return response.json() as EventRecord[]
                    })
                    .catch(this.handleError);
  }

  // I would definitely want to handle errors better in a real world situation
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}
