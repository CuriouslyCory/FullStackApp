// import core libraries
import { Pipe, PipeTransform } from '@angular/core';

// import models
import { Product } from './models/product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(products: Product[], filter: string): Product[] {
    if (!products || !filter) {
      return products;
    }
    //console.log(Object.keys(products));
    if (filter) {
      filter = filter.toLowerCase();
      let filteredProducts = products.filter(function (product: Product) {
        let truthyAry = (Object.keys(product).map( ( index, value) => {
          return (String(product[index]).toLowerCase().indexOf(filter) > -1);
        }));
        return (truthyAry.indexOf(true) > -1);
      });
      return filteredProducts;
    }
  }
  

}
