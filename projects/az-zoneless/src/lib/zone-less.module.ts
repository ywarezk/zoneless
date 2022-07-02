/**
 * Module that exposes all the library directives
 *
 * Created June 14th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { NgModule } from '@angular/core';
import { ZoneLessDirective } from './zone-less.directive';
import { ZoneFullDirective } from './zone-full.directive';

@NgModule({
  declarations: [
    ZoneLessDirective,
    ZoneFullDirective
  ],
  exports: [
    ZoneLessDirective,
    ZoneFullDirective
  ]
})
export class ZonelessModule { }
