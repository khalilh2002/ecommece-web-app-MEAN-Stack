import { Component , OnInit} from '@angular/core';
import { ProductService } from '../service/product-service.service';
import { ProductType } from '../interface/product-type';
import { RouterModule } from '@angular/router';
import { CardProductComponent } from './card-product/card-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule , CardProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  implements OnInit{
  products: ProductType[] = [];
  productOne: ProductType | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();    
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('All Products:', this.products); // Log all products after they are fetched
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  loadOneProduct(id:string): void {
    this.productService.getOneProduct(id).subscribe({
      next: (product) => {
        this.productOne = product;
        console.log('One Product:', this.productOne); // Log the single product after it is fetched
      },
      error: (error) => {
        console.error('Error loading single product:', error);
      }
    });
  }
}
