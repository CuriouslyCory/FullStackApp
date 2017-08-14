import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Import services
import { AnalyticsService } from './services/analytics.service';

// Array of navigation endpoints for side nav to use
const NAVELEMENTS = [
  { name: 'Home', icon: 'home', route: '/home' },
  { name: 'Analytics', icon: 'insert_chart', route: '/analytics' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ AnalyticsService ]
})
export class AppComponent {
  public title = 'Leslie\'s Pool Supply';
  public navElements = NAVELEMENTS;
  public pageTitle: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute, private analyticsService: AnalyticsService ) {
    router.events.subscribe( ( url: any ) => {
      //
    });
  }
  
  public filterResults($event){
    console.log($event);
  }
}
