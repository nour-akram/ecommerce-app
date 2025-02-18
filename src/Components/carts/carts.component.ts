import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../Models/iproduct';
import { CurrencyPipe } from '@angular/common';
import { CreditCartFormatPipe } from '../../app/Pipes/credit-cart-format.pipe';
import { AddTocartService } from '../../app/Services/add-tocart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carts',
  imports: [CurrencyPipe,CreditCartFormatPipe,RouterModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {
  // @Input() AllCarts:IProduct[]=[];
  // totalPrice:number=0

  AllCarts: IProduct[] = [];
  totalPrice: number = 0;

  constructor(private cartService: AddTocartService){}
  ngOnInit(): void {
    console.log(this.AllCarts);

    this.loadCart();
  }

  loadCart() {
    this.AllCarts = this.cartService.getCarts();
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.AllCarts.reduce((sum, cart) => sum + cart.price * (cart.count ?? 1), 0);
  }

  removeFromCart(productId: number,event: Event) {
    event.stopPropagation();
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }
}
