// import base libraries
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

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
  @ViewChild('productButton') productButton: ElementRef;

  constructor( 
    private productService: ProductService,
    private analyticsService: AnalyticsService,
    private searchComService: SearchComService,
    private searchFilterPipe: SearchFilterPipe
  ) { }


  ngOnInit() {
    this.analyticsService.postEvent('home');
    this.getProducts();
    this.searchComService.searchTermSource$.subscribe(
      searchTerm => {
        console.log('detected search term change');
        console.log(searchTerm);
        this.searchTerm = searchTerm;
        this.scrollToProduct();
      });
  }

  getProducts(): void {
    this.productService.getAllProducts().then(
      products => {
        this.products = products;
      }
    );
  }
  
  productsLoaded(): boolean {
    if( this.products && this.products.length > 0){
      return true
    }
    return false;
  }

  noProducts(): boolean {
    let filteredProducts = this.searchFilterPipe.transform(this.products, this.searchTerm);
    if (this.productsLoaded() && filteredProducts.length < 1){
      return true
    }
    return false;
  }

  chunkProducts(numColumns): Product[] {
    // don't do anything if it's not loaded, it'll thrown errors
    if(!this.products || this.products.length < 1) {
      return [];
    }
    
    // we want to chunk the filtered products
    let filteredProducts = this.searchFilterPipe.transform(this.products, this.searchTerm);
    // init holding tanks
    let chunkedProducts = [];
    let chunk: Product[] = [];

    // itterate through array turning it into chunks of numColumns
    for(let i = 0; i < filteredProducts.length; i++) {
      // if we're on the nth column start a new row
      if (i % numColumns === 0 && i !== 0) {
        chunkedProducts.push(chunk);
        chunk = [];
      }
      chunk.push(filteredProducts[i]);
    }

    // if there's any left over in the buffer, push it to the array
    if (chunk.length > 0) {
      chunkedProducts.push(chunk);
    }

    return chunkedProducts;
  }
  
  // hacky way to trigger a scroll to the top of the products section
  scrollToProduct() {
    let el: HTMLElement = this.productButton.nativeElement as HTMLElement;
    el.click();
  }
  

}
