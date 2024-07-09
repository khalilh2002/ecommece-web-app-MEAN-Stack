import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
export const routes: Routes = [
    {
        path:"home",
        component: HomeComponent,
        title:"home"
        
    },
    {
        path:"",
        component: HomeComponent,
        title:"home"
        
    },
    {
        path:"product",
        component: ProductComponent,
        title:"product"
        
    },
    {
        path:"login",
        component: LoginComponent,
        title:"login"
        
    }

];
