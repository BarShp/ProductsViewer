import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pv-product-thumbnail',
  templateUrl: './product-thumbnail.component.html',
  styleUrls: ['./product-thumbnail.component.css']
})

export class ProductThumbnailComponent implements OnInit {
  @Input() product: Product;

  ngOnInit() {
    if (this.product.description.length > 30) {
      this.product.description = this.product.description.substring(0, 28) + "...";
    }
  }
}
