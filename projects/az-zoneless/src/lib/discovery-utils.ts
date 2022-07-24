/**
 * Based on the context i need to find the hosting component
 *
 * Created July 24th, 2022
 * @author: ywarezk
 * @version: 0.0.6
 */

import { ViewRef, ɵdetectChanges } from '@angular/core';

// this is where we have the id in the lview
const CONTEXT_KEY = '__ngContext__';
const PARENT_ID = 3;

/**
 * this function will get the dom node of the component
 * it will also get the lview and recursively search for an lview of the element
 * @param element - for example <app-child>
 * @param lview  - array of the lview
 * @returns lview
 */
function _findDomInViews(
  element: HTMLElement,
  lview: Array<any>
): Array<any> | null {
  if (lview[0] === element) return lview;

  for (let i = 0; i < lview.length; i++) {
    const current = lview[i];
    if (Array.isArray(current) && i !== PARENT_ID) {
      const found = _findDomInViews(element, current);
      if (found) return found;
    }
  }
  return null;
}

/**
 *
 * @param context - the context is derived from element.__ngContext__
 * @param views - recursivly traverse the views to find the proper view
 * @returns
 */
export function getInjector(element: HTMLElement, views: ViewRef[]): any {
  if (!views) return null;
  if (views.length === 0) return null;

  // find the dom node of the first component that hosts the element
  // i can tell by the change in context
  let dom = null;
  let current: any = element;
  while (current) {
    if (current[CONTEXT_KEY] !== current.parentNode[CONTEXT_KEY]) {
      dom = current.parentNode;
      break;
    } else {
      current = current.parentNode[CONTEXT_KEY];
    }
  }

  // from the dom node traverse the views to find the one for this component
  let foundLView: any;
  for (let i = 0; i < views.length; i++) {
    const current = (views[i] as any)._lView;
    foundLView = _findDomInViews(dom, current);
    if (foundLView) break;
  }

  return foundLView
    ? () => {
        ɵdetectChanges(foundLView[8]);
      }
    : null;
}
