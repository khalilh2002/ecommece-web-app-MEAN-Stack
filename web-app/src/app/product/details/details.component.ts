import { Component, Input, OnInit } from '@angular/core';
import { ProductType } from '../../interface/product-type';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../service/product-service.service';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  product : ProductType | null = null;

  constructor(private activatedRoute : ActivatedRoute , private productService:ProductService ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
    try  {
      const id:string|null = params.get('id')
      if (id) {
        this.productService.getOneProduct(id).subscribe({
          next:(res)=>{
            this.product = res            
          }
        })
      }

    }catch(e){
      console.log(e);
      
    }

    });
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

}
