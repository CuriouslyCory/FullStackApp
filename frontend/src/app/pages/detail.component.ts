import { Component, OnInit } from '@angular/core';

// import services
import { AnalyticsService } from '../services/analytics.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor( private analyticsService: AnalyticsService ) { }

  ngOnInit() {
    this.analyticsService.postEvent('details');
  }

}
