// import base libraries
import { Component, OnInit } from '@angular/core';

// import services
import { ProductService } from '../../services/product.service';
import { AnalyticsService } from '../../services/analytics.service';
import { SearchComService } from '../../services/search-com.service';

// import models
import { Product } from '../../models/product';

// import pipes
import { SearchFilterPipe } from '../../search-filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ProductService ]
})
export class HomeComponent implements OnInit {

  products: Product[];
  searchTerm: string;

  constructor( 
    private productService: ProductService,
    private analyticsService: AnalyticsService,
    private searchComService: SearchComService
  ) { }


  ngOnInit() {
    this.analyticsService.postEvent('home');
    this.getProducts();
    this.searchComService.searchTermSource$.subscribe(
      searchTerm => {
        console.log('detected search term change');
        console.log(searchTerm);
        this.searchTerm = searchTerm;
      });
  }

  getProducts(): void {
    this.productService.getAllProducts().then(
      products => {
        this.products = products;
      }
    );
  }

}
