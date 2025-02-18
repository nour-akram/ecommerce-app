import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRoundShadowCart]'
})
export class RoundShadowCartDirective implements OnChanges{

  @Input() defaultShadow:string=""

  constructor(private _elementRef:ElementRef) {
      // this._elementRef.nativeElement.style.boxShadow=this.defaultShadow;
      this._elementRef.nativeElement.style.borderRadius="10px"
   }
  ngOnChanges(changes: SimpleChanges): void {
    this._elementRef.nativeElement.style.boxShadow=this.defaultShadow
  }




   @HostListener("mouseover")  f1() {
    this._elementRef.nativeElement.style.boxShadow="5px 5px 5px #e1e1e1,-5px -5px 5px #e1e1e1";
   }
   @HostListener("mouseout")  f2(){
     this._elementRef.nativeElement.style.boxShadow=this.defaultShadow
   }

}
