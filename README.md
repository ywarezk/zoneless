# az-zoneless

[![Known Vulnerabilities](https://snyk.io/test/github/ywarezk/zoneless/badge.svg)](https://snyk.io/test/github/ywarezk/zoneless)
![build](https://github.com/ywarezk/zoneless/actions/workflows/ci.yaml/badge.svg)
[![codecov](https://codecov.io/gh/ywarezk/zoneless/branch/main/graph/badge.svg?token=NGE5CODVZD)](https://codecov.io/gh/ywarezk/zoneless)
[![npm version](https://badge.fury.io/js/az-zoneless.svg)](https://www.npmjs.com/az-zoneless)

A set of directive and utilities to manage an angular zoneless app.  
Using this library you can go completly zoneless and still support 3rd party libraries like `@angular/material`.

This library will solve the following:

- [Angular material components without zone.js](https://stackoverflow.com/questions/66238871/angular-material-components-without-zone-js)
- [Issue on angular material zoneless](https://github.com/angular/components/issues/9169)
- [Issue on angular material zoneless](https://github.com/angular/components/issues/23909)

_**Warning:** This package is experimental_

## How to work on zoneless mode

Watch this video I made to fully understand the best way to utilize zoneless in your angular app.

[![Angular going zoneless](https://github.com/ywarezk/academeez/raw/main/libs/lessons/courses/angular/change-detection/zonejs-opt-out/thumbnail.png)](https://youtu.be/R2wjayCaw30 "Angular going zoneless")

## Installation

```bash
npm i az-zoneless
```

In your `AppModule` add the `ZonelessModule` to the `imports` array.

```typescript
import { ZonelessModule } from 'az-zoneless'

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...,
    ZonelessModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Set your app to be zoneless

This library is meant to be used in an angular running in zoneless mode.  
To make angular work without `Zone.js` please do the following:

1. from the `polyfills.ts` comment out the line where `Zone.js` is imported

```typescript
// import 'zone.js';  // Included with Angular CLI.
```

2. in the `main.ts` you need to tell angular to not work with `Zone.js`

```typescript
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZone: "noop",
  })
  .catch((err) => console.error(err));
```

## Lecture about using angular in zoneless

Here is a lecture where I explain about angular in zoneless mode

## Events

1. After using the library, make sure to not use the regular events:

```html
<!-- Do not use the regular events   -->
<button (click)="doSomething()"></button>
```

These events will still work but they are less performent.

2. To improve performance and really take advantage of the fact that you are zoneless, please use the events like this:

```html
<button (azClick)="doSomething()"></button>
```

3. In case you do decide to run angular with `Zone.js` the library supplies you with an event that will run outside the angular zone.

```html
<!-- the doSomething method will not trigger change detection and will run outside the angular zone -->
<button (azClick.zoneless)="doSomething()"></button>
```

## Directives

If you are afraid to remove zone.js, we also supply with directives that will allow you to incrementally transition your app to be zoneless.  
Instead of removing zone.js completly, you can run part of your component tree outside zone.js

### azZoneLess

With this directive you can run part of your component tree outside zone.js.  
This will work only if you did not remove `Zone.js`

```html
<div>
  <h1>This part is inside zonejs</h1>
  <button (click)="doSomething()">
    clicking this will run change detection
  </button>

  <div *azZoneLess>
    <h1>This part is outside zonejs</h1>
    <button (click)="doSomething()">
      clicking this will run outside the zone and will only update is you call
      ChangeDetectorRef.detectChanges()
    </button>
  </div>
</div>
```

### azZoneFull

If you used the `azZoneLess` you can go back to running in angular zone using the `azZoneFull` directive.
This directive will only work if you did not remove `Zone.js`.

```html
<div>
  <h1>This part is inside zonejs</h1>
  <button (click)="doSomething()">
    clicking this will run change detection
  </button>

  <div *azZoneLess>
    <h1>This part is outside zonejs</h1>
    <button (click)="doSomething()">
      clicking this will run outside the zone and will only update is you call
      ChangeDetectorRef.detectChanges()
    </button>

    <div *azZoneFull>
      <!-- This will return us back to the zone.js -->
      <button (click)="doSomething()">This runs in the zone.js</button>
    </div>
  </div>
</div>
```
