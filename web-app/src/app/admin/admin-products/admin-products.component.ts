import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product-service.service';
import { TableModule } from 'primeng/table';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [TableModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit{
  baseUrl = environment.baseUrl;
  getImage(urlImg: string) {
    return this.baseUrl + "/" + urlImg
  }
  products:any[]=[]
  constructor(private productService : ProductService) {
    
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

}
