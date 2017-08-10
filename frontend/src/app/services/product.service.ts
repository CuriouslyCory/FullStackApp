// libraries
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// Import product model
import { Product } from '../models/product';


@Injectable()
export class ProductService {

  private productApiUrl = 'http://fullstack.api/product';

  constructor(private http: Http) { }

  getAllProducts(): Promise<number[]> {
    return this.http.get(this.productApiUrl)
             .toPromise()
             .then(response => response.json().data as number[])
             .catch(this.handleError);
  }

  getProductDetails(productId: number): Promise<Product> {
    const url = '${this.productApiUrl}/${id}';
    return this.http.get(url)
             .toPromise()
             .then(response => response.json().data as Product)
             .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}
