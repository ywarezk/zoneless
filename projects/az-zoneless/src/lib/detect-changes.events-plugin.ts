/**
 * Create events that will call detect changes after they are finished
 *
 * Created July 6th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { ChangeDetectorRef, Injectable, Injector } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { camelCase } from './camelcase';

declare var ng: {
  getInjector(elementOrDir: {} | Element): Injector;
};

@Injectable()
export class DetectChangesEventsPlugin {
  manager: EventManager;

  private _splitEvent(eventName: string): [string, string] {
    const prefix = eventName.substring(0, 2);
    const event = eventName.substring(2);
    return [prefix, camelCase(event)];
  }

  supports(eventName: string): boolean {
    const [prefix] = this._splitEvent(eventName);
    if (prefix === 'az') {
      return true;
    }
    return false;
  }

  addEventListener(
    element: HTMLElement,
    eventName: string,
    handler: Function
  ): Function {
    const [_, eventRealName] = this._splitEvent(eventName);
    const injector = ng.getInjector(element);
    const cd = injector.get(ChangeDetectorRef);

    const monkeyPatchHandler = (...args: any) => {
      handler.apply(element, args);
      cd.detectChanges();
    };

    element.addEventListener(
      eventRealName,
      monkeyPatchHandler as EventListener,
      false
    );
    return () =>
      this.removeEventListener(
        element,
        eventRealName,
        monkeyPatchHandler as EventListener
      );
  }

  removeEventListener(
    target: any,
    eventName: string,
    callback: Function
  ): void {
    const [_, eventRealName] = this._splitEvent(eventName);
    return target.removeEventListener(eventRealName, callback as EventListener);
  }
}
