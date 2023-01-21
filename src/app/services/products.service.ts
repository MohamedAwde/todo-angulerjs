import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product, Products } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productDeletedEvent = new EventEmitter<Product>();
  productAddedEvent = new EventEmitter<Product>();
  productUpdateEvent = new EventEmitter<Product>();
  productsSelectedEvent = new EventEmitter<Product>();

  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products').pipe(
      catchError((error) => {
        console.log('error from products service', error);
        return throwError(new Error('Error while getting products list'));
      })
    );
  }

  productAdd(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  productUpdate(product: Product): Observable<Product> {
    return this.http.put<Product>(
      'http://localhost:3000/products/' + product.id,
      product
    );
  }

  productDelete(productid: string) {
    return this.http.delete<Product>(
      'http://localhost:3000/products/' + productid
    );
  }
}
