/**
 * This directive will run the template his getting in a zoneless mode
 * Usage:

 <div *azZoneLess>
    <!-- Whatever you run here will run in zone less mode -->
    <mat-checkbox>this will not work</mat-checkbox>
 </div>

 *
 * Created June 14th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import {
  AfterViewInit,
  Directive,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[azZoneLess]',
})
export class ZoneLessDirective implements AfterViewInit {
  constructor(
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainer: ViewContainerRef,
    private readonly _ngzone: NgZone
  ) {
    if(!(_ngzone instanceof NgZone)) {
      throw new Error('In hybrid mode zone js should be included, and bootstrapping the application should not be with the noop zone')
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._ngzone.runOutsideAngular(() => {
        this._viewContainer.createEmbeddedView(this._templateRef);
      });
    })
  }
}
