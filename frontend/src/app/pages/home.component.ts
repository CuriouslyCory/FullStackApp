// import base libraries
import { Component, OnInit } from '@angular/core';

// import services
import { ProductService } from '../services/product.service';
import { AnalyticsService } from '../services/analytics.service';

// import models
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ProductService ]
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor( private productService: ProductService, private analyticsService: AnalyticsService ) { }


  ngOnInit() {
    this.analyticsService.postEvent('home');
    this.getProducts();
  }

  getProducts (): void {
    this.productService.getAllProducts().then(product => this.products = product);
  }

}
