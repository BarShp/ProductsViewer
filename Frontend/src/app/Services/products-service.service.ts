import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class ProductsService {
  private BASE_URL: string = "http://localhost/products";

  constructor(private http: HttpClient, private auth: AuthService) { }

  public getProducts(page: number, filter: Filter = null, sortBy = "") {
    let headers = this.auth.authorizationHeader();
    return this.http.get(this.BASE_URL + '/all' + page + this.createQueryParams(filter, sortBy), { headers: headers });
  }

  public getProduct(id: string) {
    let headers = this.auth.authorizationHeader();
    return this.http.get(this.BASE_URL + '/product' + id, { headers: headers });
  }

  public getAutocomplete(filter: Filter) {
    let headers = this.auth.authorizationHeader();
    return this.http.get(this.BASE_URL + `/autocomplete?field=${filter.field}&value=${filter.value}`, { headers: headers });
  }

  private createQueryParams(filter: Filter, sortBy: string): string {
    let filterQuery: string = "";
    if (filter) {
      filterQuery = `field=${filter.field}&value=${filter.value}`;
    }
    if (sortBy) {
      sortBy = 'sortBy=' + sortBy;
    }
    const joinedQuery = [filterQuery, sortBy].filter(Boolean).join("&");
    return joinedQuery ? '?' + joinedQuery : '';
  }
}
