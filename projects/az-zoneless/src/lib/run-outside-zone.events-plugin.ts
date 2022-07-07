/**
 *
 *
 * Created July 6th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { Injectable, NgZone } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import camelCase from 'camelcase';

@Injectable()
export class RunOutsideZoneEventsPlugin {
  manager: EventManager;

  private _calcEvent(eventName: string): string {
    return camelCase(eventName.substring(2, eventName.indexOf('.')));
  }

  supports(eventName: string): boolean {

    return /^az.*\.zoneless$/.test(eventName)
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function
  ): Function {
    const eventRealName = this._calcEvent(eventName);
    const ngZone = this.manager.getZone()
    if (!(ngZone instanceof NgZone)) {
      throw new Error('zoneless events requires you to run angular with Zonejs')
    }

    ngZone.runOutsideAngular(() => {
      element.addEventListener(eventRealName, handler as EventListener, false);
    })

    return () =>
      this.removeEventListener(element, eventRealName, handler);
  }

  removeEventListener(
    target: any,
    eventName: string,
    callback: Function
  ): void {
    const eventRealName = this._calcEvent(eventName);
    return target.removeEventListener(eventRealName, callback as EventListener);
  }
}
