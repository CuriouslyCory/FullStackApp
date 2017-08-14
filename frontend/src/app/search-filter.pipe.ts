// import core libraries
import { Pipe, PipeTransform } from '@angular/core';

// import models
import { Product } from './models/product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[], filter: Product): Product[] {
    if (!products || !filter) {
      return products;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return products.filter((products: Product) => this.applyFilter(products, filter));
  }
  
  applyFilter(product: Product, filter: Product): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (product[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (product[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
