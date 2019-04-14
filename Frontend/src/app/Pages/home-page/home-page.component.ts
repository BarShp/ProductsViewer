import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../Services/products-service.service';

@Component({
  selector: 'pv-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  private page: number = 0;
  private loadingProducts: boolean = false;
  private endOfResults: boolean = false;
  private filterField: string = "name";
  private filterValue: string = '';
  private sortBy: string = "name";
  private autocomplete: string[] = [];
  private products: Product[] = [];

  constructor(private productsService: ProductsService) {

  }

  ngOnInit() {
    this.resetProducts();
    this.loadNextPage();
    this.loadAutocomplete();
  }

  onSearch() {
    this.resetProducts();
    this.loadNextPage();
  }

  onFilterValueChanged(value: string) {
    this.filterValue = value;
    this.loadAutocomplete();
  }

  onFilterFieldChanged(field: string) {
    this.filterField = field;
  }

  onSort(value) {
    this.sortBy = value;
    this.resetProducts();
    this.loadNextPage();
  }

  onScroll() {
    this.loadNextPage();
    console.log('scrolled');
  }

  private resetProducts() {
    this.page = 0;
    this.products = [];
    this.endOfResults = false;
  }

  private loadNextPage() {
    if (!this.endOfResults) {
      this.loadingProducts = true;
      const getProductsSubscription = this.productsService.getProducts(this.page, { field: this.filterField, value: this.filterValue }, this.sortBy)
        .subscribe((products: Product[]) => {
          this.loadingProducts = false;
          getProductsSubscription.unsubscribe();
          if (products.length) {
            this.products.push(...products);
          } else {
            this.endOfResults = true;
          }
        });
      this.page++;
    }
  }

  private loadAutocomplete() {
    this.productsService.getAutocomplete({ field: this.filterField, value: this.filterValue })
      .map((res: Object[]) => {
        let serialized = [];
        res.forEach(obj => {
          serialized.push(obj[Object.keys(obj)[0]]);
        });
        return serialized;
      })
      .subscribe((autocomplete) => {
        this.autocomplete = autocomplete;
      })
  }
}
