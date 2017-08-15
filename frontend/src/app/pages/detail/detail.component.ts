// import core libraries
import 'rxjs/add/operator/switchMap';
import { Location, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// import services
import { AnalyticsService } from '../../services/analytics.service';
import { ProductService } from '../../services/product.service';

// import models
import { Product } from '../../models/product';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public productDetail: Product;
  public recommendations: Product[];
  
  constructor(
    private analyticsService: AnalyticsService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public snackBar: MdSnackBar,
  ) {
    //init this as an empty object because it will throw an error when reading the databindings if it's undefined
    this.productDetail = new Product();
  }

  ngOnInit() {
    // get the product Id from the route and pass get the product from the product service
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProductDetails( +params.get('productId') ))
      .subscribe(product => {
        this.productDetail = product;
        
        // record page visit
        this.analyticsService.postEvent('details-' + product.id);
        
        // get recommended products from api based on this product
        this.getRecommendations(product.id);
      });
  }

  addToCart() {
    // display a added to cart message
    this.snackBar.open(`${this.productDetail.name} added to cart`, '', {
      duration: 500
    });
  }

  getRecommendations (productId: number) {
    this.productService.getRecommendations(productId)
                        .then( recommendations => { this.recommendations = recommendations});
  }

}
