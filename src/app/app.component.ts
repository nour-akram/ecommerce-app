import { Component } from '@angular/core';
import { HeaderComponent } from "../Components/header/header.component";
// import { ProductsComponent } from "../Components/products/products.component";
import { FooterComponent } from "../Components/footer/footer.component";
// import { CartsComponent } from "../Components/carts/carts.component";
import { IProduct } from '../Models/iproduct';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'day2-angular';


  // Carts:IProduct[] = []

  // cart(value:IProduct){
  //   //  console.log("CART",value);
  //    this.Carts.push(value);
  //   //  console.log(this.Carts);
  //    return this.Carts
  // }

  // removeFromCart(value: IProduct) {
  //   // console.log("REMOVE", value);
  //   this.Carts = this.Carts.filter((product) => product.ID !== value.ID);
  //   // console.log(this.Carts);
  // }
}
