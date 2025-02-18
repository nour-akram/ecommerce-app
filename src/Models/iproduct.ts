export interface IProduct {
  _id:number;
  name:string;
  quantity:number;
  price:number;
  discount?:string;
  img:string;
  CategoryID:number;
  count?:number;
}
