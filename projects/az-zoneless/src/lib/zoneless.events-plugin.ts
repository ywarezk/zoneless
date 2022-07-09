/**
 * Zoneless supported events
 *
 * Created July 6th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { ApplicationRef, Injectable, NgZone } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

@Injectable()
export class ZonelessEventsPlugin {
  manager: EventManager;

  constructor(private _application: ApplicationRef) {}

  supports(): boolean {
    if (this.manager.getZone() instanceof NgZone) {
      return false;
    }
    return true;
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function
  ): Function {
    const monkeyPatchHandler = (...args: any) => {
      handler.apply(element, args);
      this._application.tick();
    };

    element.addEventListener(eventName, monkeyPatchHandler, false);
    return () =>
      this.removeEventListener(element, eventName, monkeyPatchHandler);
  }

  removeEventListener(
    target: any,
    eventName: string,
    callback: Function
  ): void {
    return target.removeEventListener(eventName, callback as EventListener);
  }
}
