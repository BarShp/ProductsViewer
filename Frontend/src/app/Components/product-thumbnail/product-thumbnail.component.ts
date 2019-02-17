import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pv-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})
export class ProductThumbnailComponent {
  @Input() product: Product;
}
