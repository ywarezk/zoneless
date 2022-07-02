/**
 * Testing the zoneless directive
 *
 * Created June 14th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ZonelessModule } from './zone-less.module';

@Component({
  template: `
    <div *azZoneLess>
      <button id="detectZone" (click)="detectZone()">
        My zone is: <span id="zone">{{ zone }}</span>
      </button>
      <div *azZoneFull>
        <button id="detectZone2" (click)="detectZone()">
          runs in angular
        </button>
      </div>
    </div>
  `,
})
class TestComponent {
  zone = Zone.current.name;

  constructor(private _cd: ChangeDetectorRef) {}

  detectZone() {
    this.zone = Zone.current.name;
    this._cd.detectChanges();
  }
}

describe('azZoneLess', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ZonelessModule],
      declarations: [TestComponent],
    }).compileComponents();
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  }));

  fit('zone should not be angular', fakeAsync(() => {
    tick()
    fixture.debugElement
      .query(By.css('#detectZone'))
      .nativeElement.dispatchEvent(new Event('click'));
    expect(
      fixture.debugElement.query(By.css('#zone')).nativeElement.innerText
    ).not.toBe('angular');

    fixture.debugElement
      .query(By.css('#detectZone2'))
      .nativeElement.dispatchEvent(new Event('click'));
    expect(
      fixture.debugElement.query(By.css('#zone')).nativeElement.innerText
    ).toBe('angular');
  }));
});
