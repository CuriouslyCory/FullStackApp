import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// import services
import { AnalyticsService } from '../../services/analytics.service';

//import models
import { EventRecord } from '../../models/event-record';

@Component({
  selector: 'app-analytics-detail',
  templateUrl: './analytics-detail.component.html',
  styleUrls: ['./analytics-detail.component.scss']
})
export class AnalyticsDetailComponent implements OnInit {

  events: EventRecord[];

  constructor(
    private analyticsService: AnalyticsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    // get the session id from the route and get the events from the service
    this.route.paramMap
      .switchMap((params: ParamMap) => this.analyticsService.getSessionDetails( params.get('sessionId') ))
      .subscribe(events => {
        this.events = events
      });
  }

  goBack(): void {
    this.location.back();
  }
}
