// libraries
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import product model
import { Product } from '../models/product';

// Import environemnt variables
import { environment } from '../../environments/environment';


@Injectable()
export class ProductService {

  private productApiUrl = `${environment.apiUrl}/product`;

  constructor(private http: Http) { }

  getAllProducts(): Promise<Product[]> {
    return this.http.get(this.productApiUrl)
             .toPromise()
             .then(response => response.json() as Product[])
             .catch(this.handleError);
  }

  getProductDetails(productId: number): Promise<Product> {
    const url = `${this.productApiUrl}/${productId}`;
    return this.http.get(url)
             .toPromise()
             .then(
               response => {
                 return response.json() as Product;
               }
             )
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}
