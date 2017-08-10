import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Array of navigation endpoints for side nav to use
const NAVELEMENTS = [
  { name: 'Home', icon: 'home', route: '/home' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Leslie\'s Pool Supply';
  public navElements = NAVELEMENTS;
  public pageTitle: string;

  constructor( private router: Router, private activatedRoute: ActivatedRoute ) {
    // Method to bind the page title through the navelements to determine the friendly page title
    router.events.subscribe( ( url: any ) => {
      if (url.url !== '/') {
        this.pageTitle = this.navElements.filter( ( element: any ) => element.route === url.url )[0].name;
      }
    });
  }
}
