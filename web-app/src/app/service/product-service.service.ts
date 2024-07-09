import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductType } from '../interface/product-type';
import { environment } from '../../environments/environment'; // Import environment


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly  baseUrl = `${environment.apiUrl}/products`; // Use environment variable
  
  constructor(private http: HttpClient) {} // Ensure HttpClient is correctly imported

  getAllProducts(): Observable<ProductType[] > {
      
    return this.http.get<ProductType[]>(`${this.baseUrl}`);
  }

  getOneProduct(id:string):Observable<ProductType>{
    return this.http.get<ProductType>(`${this.baseUrl}/${id}`);
  } 
}
