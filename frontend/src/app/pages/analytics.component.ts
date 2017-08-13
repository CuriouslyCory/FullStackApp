// import core components
import { Component, OnInit } from '@angular/core';

// import services
import { AnalyticsService } from '../services/analytics.service';

// import models
import { EventRecord } from '../models/event-record';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  sessions: any;

  constructor( private analyticsService: AnalyticsService ) { }

  ngOnInit() {
     this.analyticsService.getSessionList()
        .then(sessions => { this.sessions = sessions } );
  }

}
