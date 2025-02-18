import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: number, discount: string): number {
    if (discount === "No Discount") {
      return value;
    } else {
      const discountValue = parseInt(discount)/ 100;
      return Math.round(value - (value * discountValue));
    }
  }

}
