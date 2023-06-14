import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FakeStoreService {
  private apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  getProducts(sort: string = ''): Observable<any> {
    const url = `${this.apiUrl}/products`;
    let params = new HttpParams();
    if (sort) {
      params = params.set('sort', sort);
    }
    return this.http.get<any>(url, { params });
  }
}
