import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCartFormat'
})
export class CreditCartFormatPipe implements PipeTransform {

  transform(value: string): string {
    if(value.length!==16){
       return '';
    }
    return `${value.slice(0, 4)}-${value.slice(4, 8)}-${value.slice(8, 12)}-${value.slice(12, 16)}`;
  }

}
