/**
 * Create events that will call detect changes after they are finished
 *
 * Created July 6th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { camelCase } from './camelcase';
import { DetectChangesService } from './detect-changes.service';

@Injectable()
export class DetectChangesEventsPlugin {
  manager: EventManager;

  private _splitEvent(eventName: string): [string, string] {
    const prefix = eventName.substring(0, 2);
    const event = eventName.substring(2);
    return [prefix, camelCase(event)];
  }

  constructor(private _cd: DetectChangesService) {}

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

    const monkeyPatchHandler = (...args: any) => {
      handler.apply(element, args);
      this._cd.detectChanges(element);
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
