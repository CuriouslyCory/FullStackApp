// import core libraries
import 'rxjs/add/operator/switchMap';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SlicePipe } from '@angular/common';

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

  constructor(
    private analyticsService: AnalyticsService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
    //init this as an empty object because it will throw an error when reading the databindings if it's undefined
    this.productDetail = new Product();
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProductDetails( +params.get('productId') ))
      .subscribe(product => {
        this.productDetail = product
        this.analyticsService.postEvent('details-' + product.id);
      });
  }

}
