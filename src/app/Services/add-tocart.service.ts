import { Injectable } from '@angular/core';
import { IProduct } from '../../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class AddTocartService {

  constructor() { }
  private Allcarts: IProduct[] = [];

  getCarts(): IProduct[] {
    return this.Allcarts;
  }

  addToCart(product: IProduct) {
    let existingProduct = this.Allcarts.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.count = (existingProduct.count || 1) + 1;
    } else {
      this.Allcarts.push({ ...product, count: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.Allcarts = this.Allcarts.filter(item => item._id !== productId);
  }
}
