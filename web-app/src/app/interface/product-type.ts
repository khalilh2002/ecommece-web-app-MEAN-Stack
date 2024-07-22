export interface ProductType {
    _id?: string; 
    name: string;
    description?: string;
    image?: string;
    price: number;
    quantity: number;
    rating?:number;
    category?:any;
    createdAt?: Date;
}
