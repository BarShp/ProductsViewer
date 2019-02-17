import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../Services/auth.service';
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

  constructor(private router: Router, private authService: AuthService, private productsService: ProductsService) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigate(['/Login']);
      }
    }, (error) => {
      console.log('error', error);
    });
  }

  ngOnInit() {
    this.resetProducts();
    this.loadNextPage();
    this.loadAutocomplete();
  }

  onLoggedOut() {
    this.router.navigate(['/Login']);
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

  // private loadNextPage() {
  //   const getProductsSubscription = this.productsService.getProducts(this.page, sortBy: this.sortBy)
  //     .subscribe((products: Product[]) => {
  //       getProductsSubscription.unsubscribe();
  //       this.products.push(...products);
  //       // WHY SORTING IN THE CLIENT?: 
  //       //  when using pagination, even if [PageX] is sorted, [PageX+1] might contain values unsorted to [PageX]
  //       //  E.g - [Page1 Sorted] - 1,3,5
  //       //        [Page2 Sorted] - 2,4,6
  //       //        Sorting the data in the DB after pagination will only result in [1,3,5,2,4,6], which isn't really sorted.
  //       //        If you still want to use pagination AND sorting, you must sort the whole DB before going through it's "pages".
  //       //        Moreover - Using INFINITE SCROLL AND SORT, causes weird behaviour - 
  //       //          while scrolling down, the data gets sorted, thus allowing new data to go to the top of the page (which you already went through).
  //       //          It may be fixed only by sorting the DB in advance (which isn't a great practice when talking about large DBs)
  //       //  I still created the sort in the DB because I was told it needs to be done, but it's redundant if it's sorted here too.
  //       // this.products.sort((a, b) => (a[this.sortBy] > b[this.sortBy]) ? 1 : (a[this.sortBy] < b[this.sortBy]) ? -1 : 0)
  //       this.page++;
  //     })
  // }
}
