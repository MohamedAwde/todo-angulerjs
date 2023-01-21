import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ProductFromComponent } from './components/product-from/product-form.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { DeleteBtnComponent } from './components/delete-btn/delete-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ProductFromComponent,
    ProductsTableComponent,
    DeleteBtnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    AgGridModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
