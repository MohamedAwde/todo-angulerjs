import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ColDef } from 'ag-grid-community';
import { CellClickedEvent } from 'ag-grid-community/dist/lib/events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cellData!: { make: string; model: string; price: number; notes: string };
}
