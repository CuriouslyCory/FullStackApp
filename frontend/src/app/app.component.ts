// import core libraries
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// import services
import { AnalyticsService } from './services/analytics.service';
import { SearchComService } from './services/search-com.service';

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
  private currentPath: string;
  private searchTerm: string;

  constructor( 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analyticsService: AnalyticsService,
    private location: Location,
    private searchComService: SearchComService
  ) {
    router.events.subscribe( ( url: any ) => {
      // the search bar does different things depending on the route, so let's pay attention
      this.currentPath = url.url;
    });
  }

  // search function
  public filterResults($event){
    console.log('filterResults called');
    if(this.searchTerm !== $event){
      this.analyticsService.postEvent('searched ' + $event);
      this.searchTerm = $event;
      this.searchComService.searchChange(this.searchTerm);
      if(this.currentPath !== '/home'){
        console.log('search routing to home');
        this.router.navigate(['home']);
      }
    }
    console.log($event);
  }
  
  selectCat(category): void {
    this.searchComService.searchChange(category);
  }
}
