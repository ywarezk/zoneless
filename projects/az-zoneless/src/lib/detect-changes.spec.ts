/**
 * Test case for the event plugin that runs detect changes after the event
 *
 * Created July 7th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { Component, OnInit } from '@angular/core';
import {
  ComponentFixture,
  ComponentFixtureNoNgZone,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZonelessModule } from './zone-less.module';

@Component({
  template: `
    <button id="new-click-event" (azClick)="counter = counter + 1">
      {{ counter }}
    </button>
  `,
})
export class DetectChanges implements OnInit {
  counter = 0;

  ngOnInit(): void {
    expect(Zone.current.name).not.toBe('angular');
  }
}

describe('detect-changes events', () => {
  let fixture: ComponentFixture<DetectChanges>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetectChanges],
      imports: [ZonelessModule],
      providers: [
        {
          provide: ComponentFixtureNoNgZone,
          useValue: true,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectChanges);
    fixture.detectChanges();
  });

  it('click should work even outside the angular zone', () => {
    const button = fixture.debugElement.query(By.css('#new-click-event'));
    expect((button.nativeElement as HTMLButtonElement).innerText.trim()).toBe(
      '0'
    );
    button.nativeElement.dispatchEvent(new Event('click'));
    // notice that every cd is synchronously, which is amazing
    expect((button.nativeElement as HTMLButtonElement).innerText.trim()).toBe(
      '1'
    );
  });
});
