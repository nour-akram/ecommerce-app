import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsServiceService } from '../../app/Services/products-service.service';
import { IProduct } from '../../Models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { NotFoundComponent } from "../not-found/not-found.component";
import { HttpClient } from '@angular/common/http';
import { ProductsFromApiService } from '../../app/Services/products-from-api.service';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, NotFoundComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  ProductId:string=""
  Product:IProduct|undefined=undefined;

  ProductIDs:number[]=[];
  currentIndex:number=0;

  constructor(public activateRoute:ActivatedRoute,public productService:ProductsServiceService,private router: Router,private productfromApi:ProductsFromApiService){}

  ngOnInit(): void {
    // this.ProductId=Number(this.activateRoute.snapshot.paramMap.get("prdID"));
    // console.log("Product ID from URL:", this.ProductId);
    // this.Product= this.productService.getProductByID(this.ProductId);
    // console.log(this.Product);
    ////////////////////////
   
  this.activateRoute.paramMap.subscribe(params => {
    // console.log(params.get("prdID"),"jiiiiiii");
    
    this.ProductId = params.get("prdID") || "" ;
    // console.log("Current Product ID:", this.ProductId);

    if (this.ProductId) {
      this.productfromApi.getProductByID(this.ProductId).subscribe({
        next: (data) => {
          this.Product = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  });

  
 
  this.productfromApi.getAllProductsFromApi().subscribe(products => {
    this.ProductIDs = products.map(product => product._id); 
    // console.log("Product IDs:", this.ProductIDs);


    
    if (this.ProductId) {
      this.currentIndex = this.ProductIDs.findIndex(id => id === Number(this.ProductId));
    }
  });

    console.log(this.currentIndex);
    
  }







  goBack() {
    this.router.navigate(['/products']);
  }


  prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.router.navigate(["/productDetails", this.ProductIDs[this.currentIndex]]);
  }
}

next() {
  if (this.currentIndex < this.ProductIDs.length - 1) {
    this.currentIndex++;
    this.router.navigate(["/productDetails", this.ProductIDs[this.currentIndex]]);
  }
}
}