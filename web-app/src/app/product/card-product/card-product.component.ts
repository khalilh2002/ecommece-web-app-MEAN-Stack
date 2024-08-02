import { Component, Input } from '@angular/core';
import { ProductType } from '../../interface/product-type';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';


@Component({
  selector: 'app-card-product',
  standalone: true,

  imports: [
    RouterModule , 
    MatCardModule, 
    MatButtonModule , 
    MatBadgeModule 
  ],

  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CardProductComponent {
  @Input() product : any | null = null;

  constructor(private router:Router) {} 

  getApiUrl(){
    return environment.apiUrl;
  }
  getImageUrl(): string {
    // Get base API URL from environment
    const baseUrl = environment.baseUrl;

    // Check if product.image exists, otherwise use default image path
    const imagePath = this.product?.image ? this.product.image : 'product/default/image.png';
    console.log(`${baseUrl}${imagePath}`);
    

    // Construct and return full image URL
    return `${baseUrl}/${imagePath}`;
  }

  viewDetails(): void {
    // Logic to view product details
    this.router.navigate(['/details/product/'+this.product._id])
    
  }

  orderProduct(): void {
    // Logic to order the product
    console.log('Ordering product:', this.product?.name);
  }
}
