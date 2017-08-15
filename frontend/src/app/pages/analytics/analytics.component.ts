// import core components
import { Component, OnInit } from '@angular/core';

// import services
import { AnalyticsService } from '../../services/analytics.service';

// import models
import { EventRecord } from '../../models/event-record';
import { Session } from '../../models/session';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  sessions: Session[];

  constructor( private analyticsService: AnalyticsService ) { }

  ngOnInit() {
     // get list of sessions from service
     this.analyticsService.getSessionList()
        .then(sessions => { this.sessions = sessions } );
  }

}
