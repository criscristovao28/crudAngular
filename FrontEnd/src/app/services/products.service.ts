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
  token!: string;
  constructor(private http: HttpClient) {
    // token = localStorage.getItem('token');
   }

  Get(): Observable<Product[]>
  {
    var token = localStorage.getItem('token');
    return this.http.get<Product[]>(this.url, {headers: {['Authorization']: `Bearer ${token}`}});
  }

  create(product: Product): Observable<Product>
  {
    var token = localStorage.getItem('token');
    return this.http.post<Product>(this.url, {
      name: product.name,
      category : product.category,
      price: product.price
    }, {headers: {['Authorization']: `Bearer ${token}`}});
  }

  update(product: Product): Observable<Product>
  {
    var token = localStorage.getItem('token');
    return this.http.put<Product>(this.url, {
      id: product.id,
      name: product.name,
      category : product.category,
      price: product.price
    }, {headers: {['Authorization']: `Bearer ${token}`}});
  }

  delete(id:string)
  {
    var token = localStorage.getItem('token');
    return this.http.delete(`${this.url}?id=${id}`, {headers: {['Authorization']: `Bearer ${token}`}});
  }
}
