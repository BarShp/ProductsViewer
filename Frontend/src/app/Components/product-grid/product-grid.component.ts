import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pv-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent {
  @Input() products: Product[];

}
