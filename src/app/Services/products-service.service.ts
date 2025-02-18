import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { ProductsFromApiService } from './products-from-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  ProductList: IProduct[];
  constructor(private productformApi:ProductsFromApiService) {
    this.ProductList = [
      {
        _id: 1,
        name: "Apple iPhone 14",
        quantity: 10,
        price: 999,
        discount: "10% Off",
        img: "https://i.pinimg.com/736x/7e/f6/02/7ef602c6b66304adc65fdfc3afa8cb15.jpg",
        CategoryID: 1
      },
      {
        _id: 2,
        name: "Samsung Galaxy",
        quantity: 1,
        price: 899,
        img: "https://i.pinimg.com/474x/1c/ce/99/1cce99de15bfea9028d23b1965a04f0f.jpg",
        CategoryID: 1
      },
      {
        _id: 3,
        name: "Sony PlayStation 5",
        quantity: 5,
        price: 599,
        discount: "16% Off",
        img: "https://i.pinimg.com/474x/23/cd/20/23cd20f2cfaae09f6290f0b0553a7c1a.jpg",
        CategoryID: 1
      },
      {
        _id: 4,
        name: "Woman Regular Fit",
        quantity: 0,
        price: 1199,
        img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/68/037506/1.jpg?1194",
        CategoryID: 2
      },
      {
        _id: 5,
        name: "Woman Pullover",
        quantity: 20,
        price: 200,
        discount: "25% Off",
        img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/9887121/1.jpg?3561",
        CategoryID: 2
      },
      {
        _id: 6,
        name: "Redmi Note 13",
        quantity: 12,
        price: 349,
        discount: "14% Off",
        img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/9326111/1.jpg?4185",
        CategoryID: 1
      },
      {
        _id: 7,
        name: "Baby Sweatshirt",
        quantity: 6,
        price: 3499,
        img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/95/0158111/1.jpg?6720",
        CategoryID: 3
      },
      {
        _id: 8,
        name: "Baby Sweatshirt",
        quantity: 25,
        price: 299,
        discount: "23% Off",
        img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/109492/1.jpg?2152",
        CategoryID: 3
      }
    ];
   }

   getAllProducts():IProduct[]{
     return this.ProductList
   }



   getProductsByCatID(category: string):IProduct[]{
    if(category==="All"){
      return this.ProductList
    }else{
     return this.ProductList.filter((product:IProduct)=>{
      return product.CategoryID === Number(category);
     })
    }
  }

  getProductByID(PrdID:number):IProduct|undefined{
    return this.ProductList.find((product:IProduct)=>{
      // console.log(PrdID);
      // console.log(product.ID);
       return product._id===PrdID
    })
  }


  getProductsIDS():number[]{
   return this.ProductList.map((product)=>{return product._id})
  }



  
}
