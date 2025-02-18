import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Store } from '../../Models/store';
import { IProduct } from '../../Models/iproduct';
// import { DiscountOffers } from '../../Models/discount-offers';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { RoundShadowCartDirective } from '../../app/Directives/round-shadow-cart.directive';
import { DiscountPipe } from '../../app/Pipes/discount.pipe';
import { ProductsServiceService } from '../../app/Services/products-service.service';
import { AddTocartService } from '../../app/Services/add-tocart.service';
import {  Router, RouterModule } from '@angular/router';
import { ProductsFromApiService } from '../../app/Services/products-from-api.service';
import { AuthService } from '../../app/Services/auth.service';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    NgbDropdownModule,
    FormsModule,
    SideBarComponent,
    RoundShadowCartDirective,
    DiscountPipe,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  isLoggedIn: boolean = false;

  store2: Store = new Store(
    'Amazon',
    ['Hypermarket', 'Market', 'clothes', 'phones'],
    'https://i.pinimg.com/474x/fa/16/b8/fa16b892512b3df516211c68fc489134.jpg'
  );
  ClientName: string = 'Nour Akram';
  //  Discount: DiscountOffers = DiscountOffers.DiscountPercentage;

  //  ProductList: IProduct[];
  filteredProductList: IProduct[] = [];
  purchasedProducts: { [key: number]: boolean } = {};
  menuOpen: { [key: string]: boolean } = {};
  showDeleteModal = true;
  productIdToDelete: string | null = null;


  constructor(
    public productsService: ProductsServiceService,
    public cartservice: AddTocartService,
    private productfromApi: ProductsFromApiService,
    private authService: AuthService,
    private router:Router
  ) {
    //  1=====>phone    2======>clothes  3===>babies
    // this.ProductList = [
    //   {
    //     ID: 1,
    //     Name: "Apple iPhone 14",
    //     Quantity: 10,
    //     Price: 999,
    //     Discount: "10% Off",
    //     Img: "https://i.pinimg.com/736x/7e/f6/02/7ef602c6b66304adc65fdfc3afa8cb15.jpg",
    //     CategoryID: 1
    //   },
    //   {
    //     ID: 2,
    //     Name: "Samsung Galaxy",
    //     Quantity: 1,
    //     Price: 899,
    //     Img: "https://i.pinimg.com/474x/1c/ce/99/1cce99de15bfea9028d23b1965a04f0f.jpg",
    //     CategoryID: 1
    //   },
    //   {
    //     ID: 3,
    //     Name: "Sony PlayStation 5",
    //     Quantity: 5,
    //     Price: 599,
    //     Discount: "16% Off",
    //     Img: "https://i.pinimg.com/474x/23/cd/20/23cd20f2cfaae09f6290f0b0553a7c1a.jpg",
    //     CategoryID: 1
    //   },
    //   {
    //     ID: 4,
    //     Name: "Woman Regular Fit",
    //     Quantity: 0,
    //     Price: 1199,
    //     Img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/68/037506/1.jpg?1194",
    //     CategoryID: 2
    //   },
    //   {
    //     ID: 5,
    //     Name: "Woman Pullover",
    //     Quantity: 20,
    //     Price: 200,
    //     Discount: "25% Off",
    //     Img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/9887121/1.jpg?3561",
    //     CategoryID: 2
    //   },
    //   {
    //     ID: 6,
    //     Name: "Redmi Note 13",
    //     Quantity: 12,
    //     Price: 349,
    //     Discount: "14% Off",
    //     Img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/9326111/1.jpg?4185",
    //     CategoryID: 1
    //   },
    //   {
    //     ID: 7,
    //     Name: "Baby Sweatshirt",
    //     Quantity: 6,
    //     Price: 3499,
    //     Img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/95/0158111/1.jpg?6720",
    //     CategoryID: 3
    //   },
    //   {
    //     ID: 8,
    //     Name: "Baby Sweatshirt",
    //     Quantity: 25,
    //     Price: 299,
    //     Discount: "23% Off",
    //     Img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/109492/1.jpg?2152",
    //     CategoryID: 3
    //   }
    // ];
    // this.filteredProductList=this.productsService.getAllProducts()
    this.productfromApi.getAllProductsFromApi().subscribe({
      next: (data) => {
        //  console.log(data);
        this.filteredProductList = data;
      },
    });
  }

  //
  ngOnInit(): void {
    this.authService.getUserLogged().subscribe({
      next: (status) => {
        this.isLoggedIn = status;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleMenu(productId: string, event: Event) {
    event.stopPropagation();
    this.menuOpen[productId] = !this.menuOpen[productId];
  }

  editProduct(event: Event, productId: string) {
    event.stopPropagation();
    this.router.navigate(['/admin', productId]);
  }
   onDeleteClick(event: Event, id: string): void {
    event.stopPropagation(); 
    this.productIdToDelete = id;
    this.showDeleteModal = true; 
  }

  onConfirmDelete(event: Event): void {
    event.stopPropagation(); 
    if (this.productIdToDelete) {
      this.productfromApi.deleteProductByID(this.productIdToDelete).subscribe(
        () => {
          this.showDeleteModal = false; 
          this.router.navigate(['/products']); 
        },
        (error) => {
          console.error('Error deleting product', error);
          this.showDeleteModal = true;  
        }
      );
    }
  }

  onCancelDelete(event: Event): void {
    event.stopPropagation(); 
    this.showDeleteModal = false; 
  }


  // @Output() EventAddToCart=new EventEmitter<IProduct>
  // @Output() EventRemoveFromCart = new EventEmitter<IProduct>();

  toggleBuyAndAddToCart(product: IProduct, event: Event) {
    event.stopPropagation();
    this.purchasedProducts[product._id] = !this.purchasedProducts[product._id];
    // console.log(this.purchasedProducts);
    // this.EventAddToCart.emit(product)

    if (this.purchasedProducts[product._id]) {
      // this.EventAddToCart.emit(product);
      this.cartservice.addToCart(product);
    } else {
      // this.EventRemoveFromCart.emit(product);
      this.cartservice.removeFromCart(product._id);
    }
    if (this.purchasedProducts[product._id]) {
      product.quantity = product.quantity - 1;
      if (product.count !== undefined) {
        product.count = product.count + 1;
      } else {
        product.count = 1;
      }
    } else {
      product.quantity = product.quantity + 1;
      if (product.count !== undefined) {
        product.count = product.count - 1;
      } else {
        product.count = 0;
      }
    }
    console.log(product);
  }

  getButtonText(id: number): string {
    return this.purchasedProducts[id] ? 'Cancel' : 'Buy';
  }
  getButtonIcon(id: number): string {
    return this.purchasedProducts[id] ? 'fa-x' : 'fa-cart-plus';
  }

  onFilterChange(selectedCategory: string) {
    // this.filteredProductList = this.productsService.getProductsByCatID(selectedCategory);
    this.productfromApi.getProductsByCategoryID(selectedCategory).subscribe({
      next: (data) => {
        //  console.log(data);
        this.filteredProductList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // filterationWithCategories(category: string):IProduct[]{
  //   if(category==="All"){
  //     return this.ProductList
  //   }else{
  //    return this.filteredProductList=this.ProductList.filter((product:IProduct)=>{
  //     return product.CategoryID === Number(category);
  //    })
  //   }
  // }

  handelDecreamentQunatity(id: number, event: Event) {
    event.stopPropagation();
    let currentProduct = this.productsService
      .getAllProducts()
      .find((product: IProduct) => {
        return product._id === id;
      });

    if (currentProduct) {
      currentProduct.quantity = currentProduct.quantity - 1;
      if (currentProduct.count !== undefined) {
        currentProduct.count = currentProduct.count + 1;
      } else {
        currentProduct.count = 1;
      }
    }
    console.log(currentProduct);
  }

  onFilterRange(range: number) {
    // console.log(range);
    // this.applyFilters(range);
    this.productfromApi.getProductsByPrice(range).subscribe({
      next: (data) => {
        //  console.log(data);
        this.filteredProductList = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // set range(value:number){
  //   console.log(value);
  //   this.applyFilters(value);
  //   this.currentRange=value;
  // }

  // mlhash lzma khlass
  applyFilters(value: number): IProduct[] {
    return (this.filteredProductList = this.productsService
      .getAllProducts()
      .filter((product: IProduct) => {
        return product.price >= value - 100 && product.price <= value;
      }));
  }
  //////////////////////////////////////
  dateCreated: Date = new Date();
  //////////////////////////////////
}
