import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: Product[] = [];
  constructor(private producSevice : ProductsService){

  }

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.producSevice.getAllSimple()
    .subscribe(products =>{
      this.products = products;
    });
  }
}
