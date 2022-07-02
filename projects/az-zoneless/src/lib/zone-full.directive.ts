/**
 * The usage of this directive is as follows

 <div *azZoneFull>
  ... everything here will run under the angular zone
 </div>

 *
 * Created January 18th, 2021
 * @author: ywarezk
 * @copyright: Nerdeez LTD
 * @version: 0.0.1
 */

import { Directive, NgZone, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[azZoneFull]'
})
export class ZoneFullDirective {

  constructor(
    private readonly _templateRef: TemplateRef<any>,
    private readonly _viewContainer: ViewContainerRef,
    private readonly _ngzone: NgZone
  ) {
    setTimeout(() => {
      this._ngzone.run(() => {
        this._viewContainer.createEmbeddedView(this._templateRef);
      })
    })
  }

}
