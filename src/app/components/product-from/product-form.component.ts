import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditMode } from 'src/app/edit-mode';
import { Product } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'product-from',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFromComponent implements OnInit {
  @ViewChild('productFrom') from!: NgForm;

  isSubmitting = false;
  selecetedProduct!: Product;
  editMode: EditMode = EditMode.NEW_PRODUCT;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.productsSelectedEvent.subscribe((data) => {
      this.selecetedProduct = data;
      const { id, ...restData } = data;
      this.from.setValue(restData);
      this.editMode = EditMode.EDIT_PRODUCT;
    });
  }

  productData: Product = {
    make: '',
    model: '',
    price: 0,
    notes: '',
  };

  handleProductSubmition() {
    if (this.from.form.errors) {
      return;
    }
    const product = this.from.value;
    this.from.form.disable();
    this.isSubmitting = true;

    if (this.editMode === EditMode.NEW_PRODUCT) {
      this.productsService.productAdd(product).subscribe({
        next: (product) => {
          this.from.form.enable();
          this.isSubmitting = false;
          this.productsService.productAddedEvent.emit(product);
          this.from.reset();
          this.editMode = EditMode.NEW_PRODUCT;
        },
        error: (error) => {
          this.isSubmitting = false;
          this.from.form.enable();
          alert(error?.message);
        },
      });
    } else {
      this.productsService
        .productUpdate({ ...this.from.value, id: this.selecetedProduct.id })
        .subscribe({
          next: (product) => {
            this.editMode = EditMode.NEW_PRODUCT;
            this.from.form.enable();
            this.isSubmitting = false;
            this.productsService.productUpdateEvent.emit({
              ...this.from.value,
              id: this.selecetedProduct.id,
            });
            this.from.reset();
          },
          error: (error) => {
            this.isSubmitting = false;
            this.from.form.enable();
            alert(error?.message);
          },
        });
    }
  }
}
