/**
 * Given an HTMLElement this service will detect changes on the hosting component
 *
 * Created July 24th, 2022
 * @author: ywarezk
 * @version: 0.0.6
 * @license: MIT
 */

import { ApplicationRef, Injectable, ɵdetectChanges } from '@angular/core';

// this is where we have the id in the lview
const CONTEXT_KEY = '__ngContext__';
const PARENT_ID = 3;
const CONTEXT = 8;

type detectChangeFn = () => void;

@Injectable({
  providedIn: 'root',
})
export class DetectChangesService {
  private readonly _cacheCd = new Map<HTMLElement, detectChangeFn>();

  /**
   * Given an element, i will go up the parent node and look for the node of the
   * Hosting component
   * @param element
   */
  private _findDomHostingComponent(element: HTMLElement): HTMLElement | null {
    let current: any = element;
    while (current) {
      if (current[CONTEXT_KEY] !== current.parentNode[CONTEXT_KEY]) {
        return current.parentNode;
      } else {
        current = current.parentNode[CONTEXT_KEY];
      }
    }
    return null;
  }

  /**
   * Traverse the application views and search for the lview of the element
   * you should send the dom element of the component
   * @param element
   */
  private _findLView(
    element: HTMLElement,
    lview: Array<any>
  ): Array<any> | null {
    if (lview[0] === element) return lview;

    for (let i = 0; i < lview.length; i++) {
      const current = lview[i];
      if (Array.isArray(current) && i !== PARENT_ID) {
        const found = this._findLView(element, current);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * did not find the component so will application tick
   * @param element
   */
  private _failedCdFallback(element: HTMLElement) {
    this._cacheCd.set(element, () => {
      this._app.tick();
    });
    this._app.tick();
  }

  constructor(private _app: ApplicationRef) {}

  /**
   * given an element
   * find the hosting component and call detect changes on the component
   */
  detectChanges(element: HTMLElement) {
    // if cache provide the detect changes function then simply call it
    const cachedCd = this._cacheCd.get(element);
    if (cachedCd) {
      return cachedCd();
    }

    // find hosting component dom element
    const componentElement = this._findDomHostingComponent(element);
    if (!componentElement) {
      this._failedCdFallback(componentElement as any);
    }

    // get the lview of the component
    let foundLView: any;
    const views = (this._app as any)._views;
    for (let i = 0; i < views.length; i++) {
      const current = (views[i] as any)._lView;
      foundLView = this._findLView(componentElement as any, current);
      if (foundLView) break;
    }
    if (!foundLView) {
      this._failedCdFallback(componentElement as any);
    }

    // get the component instance and context
    const context = foundLView[CONTEXT];
    if (!context) {
      this._failedCdFallback(componentElement as any);
    }

    this._cacheCd.set(element, () => {
      ɵdetectChanges(context);
    });
    ɵdetectChanges(context);
  }
}
