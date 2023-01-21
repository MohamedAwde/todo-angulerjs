import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Products } from 'src/app/models/product.models';
import { ProductsService } from 'src/app/services/products.service';
import { DeleteBtnComponent } from '../delete-btn/delete-btn.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  loading = false;
  error!: string;
  rowData: Products = [];

  columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    { field: 'notes' },
    { field: 'delete', cellRenderer: DeleteBtnComponent },
  ];

  defaulatColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
  };

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.loading = true;

    this.productService.getProductsList().subscribe({
      next: (products) => {
        this.loading = false;
        this.rowData = products as Products;
        this.error = '';
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });

    this.productService.productAddedEvent.subscribe((product) => {
      this.rowData.push(product);
    });

    this.productService.productDeletedEvent.subscribe((product) => {
      var foundIndex = this.rowData.findIndex((p) => p.id == product.id);
      this.rowData.splice(foundIndex, 1);
    });

    this.productService.productUpdateEvent.subscribe((product) => {
      var foundIndex = this.rowData.findIndex((p) => p.id == product.id);
      this.rowData[foundIndex] = product;
    });
  }

  addProduct() {}

  onCellClicked(event: CellClickedEvent) {
    if (event.value !== undefined) {
      this.productService.productsSelectedEvent.emit(event.data);
    }
  }
}
