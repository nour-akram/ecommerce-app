import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../../Models/iuser';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthwithApiService } from '../../app/Services/authwith-api.service';
import { ProductsFromApiService } from '../../app/Services/products-from-api.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  errormsg: string = '';
  productId: string | null = null; 

  constructor(
    private productService: ProductsFromApiService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
      discount: [''],
      categoryId: ['', Validators.required],
      count: [0, Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');
      if (this.productId) {
      this.loadProductDetails(this.productId);
      }
    });
  }

  loadProductDetails(productId: string) {
    this.productService.getProductByID(productId).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          discount: product.discount,
          categoryId: product.CategoryID,
          count: product.count,
          
        });
      },
      error: (error) => {
        console.error( error);
      },
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveProduct() {
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.get('name')?.value);
    formData.append('quantity', this.productForm.get('quantity')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('discount', this.productForm.get('discount')?.value || '');
    formData.append('categoryId', this.productForm.get('categoryId')?.value);
    formData.append('count', this.productForm.get('count')?.value);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    if (this.productId) {
      this.productService
        .updateProductByID(this.productId, formData)
        .subscribe({
          next: (response) => {
            console.log('Product updated successfully', response);
            this.router.navigate(['/products']);
          },
          error: (error) => {
            this.errormsg = error.error.message;
          },
        });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully', response);
          this.productForm.reset();
          this.router.navigate(['/products']);
        },
        error: (error) => {
          this.errormsg = error.error.message;
        },
      });
    }
  }
}
