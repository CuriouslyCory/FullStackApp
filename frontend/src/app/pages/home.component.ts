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
  providers: [ AnalyticsService, ProductService ]
})
export class HomeComponent implements OnInit {

  productIds: number[];

  constructor( private productService: ProductService, private analyticsService: AnalyticsService ) { }


  ngOnInit() {
    this.getProducts();
  }

  getProducts (): void {
    this.productService.getAllProducts().then(number => this.productIds = number);
  }

}
