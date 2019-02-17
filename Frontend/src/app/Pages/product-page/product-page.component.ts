import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import { ProductsService } from '../../Services/products-service.service';

@Component({
  selector: 'pv-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productsService.getProduct(params.get('id')))
    ).map(
      (result) => {
        return result as Product;
      }
    );
  }

}
