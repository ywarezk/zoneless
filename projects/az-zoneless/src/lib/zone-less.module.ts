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
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ZonelessEventsPlugin } from './zoneless.events-plugin';
import { DetectChangesEventsPlugin } from './detect-changes.events-plugin';
import { RunOutsideZoneEventsPlugin } from './run-outside-zone.events-plugin';

@NgModule({
  declarations: [
    ZoneLessDirective,
    ZoneFullDirective,
  ],
  exports: [
    ZoneLessDirective,
    ZoneFullDirective
  ],
  providers: [
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: ZonelessEventsPlugin
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: DetectChangesEventsPlugin
    },
    {
      provide: EVENT_MANAGER_PLUGINS,
      multi: true,
      useClass: RunOutsideZoneEventsPlugin
    },
  ]
})
export class ZonelessModule { }
