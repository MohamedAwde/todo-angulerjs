import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="text-center p-5">
    <div class="spinner-border text-secondary" role="status"></div>
    <p>{{ label }}</p>
  </div>`,
})
export class SpinnerComponent {
  @Input('label') label = '';
}
