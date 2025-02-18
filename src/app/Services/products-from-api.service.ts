import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsFromApiService {
  baseURL = `${environment.baseUrl}/products`;
 
  constructor(private httpClinet: HttpClient) {}

  getAllProductsFromApi(): Observable<IProduct[]> {
    return this.httpClinet.get<IProduct[]>(this.baseURL);
  }

  getProductsByCategoryID(catID: string): Observable<IProduct[]> {
    return this.httpClinet.get<IProduct[]>(
      `${this.baseURL}/category?CategoryID=${catID}`
    );
  }

  getProductsByPrice(price: number): Observable<IProduct[]> {
    return this.httpClinet.get<IProduct[]>(
      `${this.baseURL}/search?price=${price}`
    );
  }

  getProductByID(id: string): Observable<IProduct> {
    return this.httpClinet.get<IProduct>(`${this.baseURL}/${id}`);
  }

  private getTokenFromCookies(): string | null {
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find((cookie) => cookie.startsWith('Token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }

  const token = this.getTokenFromCookies();
  addProduct(productData: FormData): Observable<any> {
    // console.log(token);
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    return this.httpClinet.post(`${this.baseURL}`, productData, { headers });
  }


  updateProductByID(id: string, productData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.httpClinet.patch(`${this.baseURL}/${id}`, productData, { headers });
  }


  deleteProductByID(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.httpClinet.delete(`${this.baseURL}/${id}`, { headers });
  }
























}
