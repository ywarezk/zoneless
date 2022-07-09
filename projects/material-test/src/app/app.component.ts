import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <mat-checkbox id="checkbox" [formControl]="checkboxControl"
      >click me {{ checkboxControl.value }}</mat-checkbox
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  checkboxControl = new FormControl(true);
}
