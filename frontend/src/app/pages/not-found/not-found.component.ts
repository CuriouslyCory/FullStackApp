import { Component, OnInit } from '@angular/core';

// import services
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor( private analyticsService: AnalyticsService ) { }

  ngOnInit() {
    this.analyticsService.postEvent('not found');
  }

}
