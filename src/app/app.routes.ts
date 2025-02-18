import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { AboutComponent } from '../Components/about/about.component';
import { ContactComponent } from '../Components/contact/contact.component';
import { ProductsComponent } from '../Components/products/products.component';
import { CartsComponent } from '../Components/carts/carts.component';
import { ProductDetailsComponent } from '../Components/product-details/product-details.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { ObservableComponent } from '../Components/observable/observable.component';
import { AdminComponent } from '../Components/admin/admin.component';
import { LoginComponent } from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { requireAuthGuard } from './Guards/require-auth.guard';

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent, title: "Home" },
  {path:"about",component:AboutComponent,title:"About"},
  {path:"contact",component:ContactComponent,title:"Contact"},
  {path:"products",component:ProductsComponent,title:"Products"},
  { path: "carts", component: CartsComponent, title: "Carts" },
  { path: "admin", component: AdminComponent, title: "Admin" ,canActivate:[requireAuthGuard]},
  { path: "admin/:id", component: AdminComponent, title: "Admin" ,canActivate:[requireAuthGuard]},
  { path: "login", component: LoginComponent, title: "Login" },
  {path:"register",component:RegisterComponent,title:"Register"},
  {path:"observable",component:ObservableComponent,title:"Observable"},
  {path:"productDetails/:prdID",component:ProductDetailsComponent,title:"ProductDetails"},
  {path:"**",component:NotFoundComponent,title:"NotFound"}
];
