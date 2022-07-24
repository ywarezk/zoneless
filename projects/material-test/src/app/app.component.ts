import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <mat-checkbox id="checkbox" [formControl]="checkboxControl"
      >click me {{ checkboxControl.value }}</mat-checkbox
    >
    <!-- every cd will increment counter -->
    <p id="counter">{{ counter() }}</p>
    <app-child></app-child>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  checkboxControl = new FormControl(true);
  private _counter = 0;

  counter() {
    this._counter++;
    return this._counter;
  }
}
