// import core libraries
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

// import product model
import { Product } from '../models/product';

// import environemnt variables
import { environment } from '../../environments/environment';


@Injectable()
export class ProductService {

  private productApiUrl = `${environment.apiUrl}/product`;

  constructor(private http: Http) { }

  // get array of products from api
  // todo: add pagination
  getAllProducts(): Promise<Product[]> {
    return this.http.get(this.productApiUrl)
             .toPromise()
             .then(response => response.json() as Product[])
             .catch(this.handleError);
  }

  // get individual product detail from api
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
  
  // retrieve 5 products from the api
  // todo: pass in a variable count of reccomendations to retrieve
  getRecommendations(productId: number): Promise<Product[]> {
    const url = `${this.productApiUrl}/${productId}/recommendations`;
    return this.http.get(url)
             .toPromise()
             .then(response => response.json() as Product[])
             .catch(this.handleError);
  }

  // log errors to console
  // todo: handle errors more carefully
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // log error to console
    return Promise.reject(error.message || error);
  }
}
