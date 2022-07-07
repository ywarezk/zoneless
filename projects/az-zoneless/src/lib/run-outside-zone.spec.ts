/**
 * Testing the run outside zone events
 *
 * Created July 6th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZonelessModule } from './zone-less.module';

@Component({
  template: `
    <button id="in-zone" (click)="whatIsMyZone()">
      This should run inside the zone
    </button>

    <button id="outside-zone" (azClick.zoneless)="whatIsMyZone2()">
      This should run outside the zone
    </button>
  `,
})
class RunOutsideZone {
  whatIsMyZone() {
    expect(Zone.current.name).toBe('angular');
  }

  whatIsMyZone2() {
    expect(Zone.current.name).not.toBe('angular');
  }
}

describe('events-plugin', () => {
  let fixture: ComponentFixture<RunOutsideZone>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ZonelessModule],
      declarations: [RunOutsideZone],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RunOutsideZone);
    fixture.detectChanges();
  });

  /**
   * testing the events to run inside of angular zone
   */
  it('regular click events are in the zone', () => {
    const button = fixture.debugElement.query(By.css('#in-zone'));
    button.nativeElement.dispatchEvent(new Event('click'));
  });

  /**
   * Testing events to run outside the zone
   */
  it('zoneless click events are outside the zone', () => {
    const button = fixture.debugElement.query(By.css('#outside-zone'));
    button.nativeElement.dispatchEvent(new Event('click'));
  });
});
