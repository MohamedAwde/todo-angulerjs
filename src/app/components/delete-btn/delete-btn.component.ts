import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Product } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-btn',
  template: `<button
    [disabled]="isDeleting"
    (click)="deleteProduct()"
    class="btn btn-danger"
  >
    {{ isDeleting ? 'Deleting..' : 'Delete' }}
  </button>`,
})
export class DeleteBtnComponent implements ICellRendererAngularComp {
  isDeleting = false;
  rowData!: Product;

  constructor(private productService: ProductsService) {}

  agInit(params: ICellRendererParams<any, any>): void {
    this.rowData = params.data;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  deleteProduct() {
    if (!this.rowData?.id) {
      return;
    }
    this.isDeleting = true;
    this.productService.productDelete(this.rowData.id).subscribe({
      next: (res) => {
        this.productService.productDeletedEvent.emit(this.rowData);
        this.isDeleting = false;
      },
      error: (error) => {
        this.isDeleting = false;
        alert('error while deleting the product');
      },
    });
  }
}
