import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button id="button-counter2" (azClick)="doSomething()">click me</button>
    <p id="counter2">{{ counter() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  private _counter = 0;

  doSomething() {
    console.log('do something');
  }

  counter() {
    this._counter++;
    return this._counter;
  }
}
