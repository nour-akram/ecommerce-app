import { Component, OnDestroy, OnInit } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { map, catchError, of, Subscription, every } from 'rxjs';

@Component({
  selector: 'app-observable',
  imports: [],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.scss'
})
export class ObservableComponent implements OnInit ,OnDestroy{

  private sub?: Subscription;
  products= [];
  private sub2?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.sub= of(1, 2, 3, 4, 5, 6).pipe(every(x => x < 5)).subscribe(x => console.log(x));
    ///////////////////////////////////////////////////////////////
    this.sub2 = ajax('https://dummyjson.com/products?limit=20&skip=0').pipe(
      map(res => res.response )
    ).subscribe(prd => {
      console.log(prd.products);
      this.products=prd.products;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      console.log('Unsubscribed from observable');
    }

    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }



}

