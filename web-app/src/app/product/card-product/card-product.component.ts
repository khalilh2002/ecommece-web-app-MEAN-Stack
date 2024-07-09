import { Component, Input } from '@angular/core';
import { ProductType } from '../../interface/product-type';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() product : ProductType | null = null;

  getApiUrl(){
    return environment.apiUrl;
  }
  getImageUrl(): string {
    // Get base API URL from environment
    const apiUrl = environment.apiUrl;

    // Check if product.image exists, otherwise use default image path
    const imagePath = this.product?.image ? this.product.image : 'default/image.png';
    console.log(`${apiUrl}${imagePath}`);
    

    // Construct and return full image URL
    return `${apiUrl}${imagePath}`;
  }
}
