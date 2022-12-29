import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService 
{
  url="https://localhost:7242/api/products";
  
  constructor(private http: HttpClient) { }


  Get(): Observable<Product[]>
  {
    return this.http.get<Product[]>(this.url);
  }

  create(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.url, {
      name: product.name,
      category : product.category,
      price: product.price
    });
  }

  update(product: Product): Observable<Product>
  {
    return this.http.put<Product>(this.url, {
      id: product.id,
      name: product.name,
      category : product.category,
      price: product.price
    });
  }

  delete(id:string)
  {
    return this.http.delete(`${this.url}?id=${id}`);
  }
}
