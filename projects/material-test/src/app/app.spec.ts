/**
 * Test file for the app component
 *
 * Created July 8th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import {
  ComponentFixture,
  ComponentFixtureAutoDetect,
  ComponentFixtureNoNgZone,
  TestBed,
} from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ZonelessModule } from 'az-zoneless';
import { ApplicationRef, NgZone, ɵNoopNgZone } from '@angular/core';
import { ChildComponent } from './child.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  describe('with zone', () => {
    beforeEach(() => {
      return TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, MatCheckboxModule, ReactiveFormsModule],
        declarations: [AppComponent, ChildComponent],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true,
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    });

    it('with ngzone the checkbox should work', () => {
      const checkboxInput = fixture.debugElement.query(
        By.css('#checkbox input[type="checkbox"]')
      );
      const checkbox = fixture.debugElement.query(By.css('#checkbox'));
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(false);
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(true);
    });
  });

  describe('without zone', () => {
    beforeEach(() => {
      return TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, MatCheckboxModule, ReactiveFormsModule],
        declarations: [AppComponent, ChildComponent],
        providers: [
          {
            provide: NgZone,
            useClass: ɵNoopNgZone,
          },
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true,
          },
          {
            provide: ComponentFixtureNoNgZone,
            useValue: true,
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    });

    it('without ngzone the checkbox should not work', () => {
      const checkboxInput = fixture.debugElement.query(
        By.css('#checkbox input[type="checkbox"]')
      );
      const checkbox = fixture.debugElement.query(By.css('#checkbox'));
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(true);
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(true);
    });
  });

  describe('without zone and with azZoneless', () => {
    beforeEach(() => {
      return TestBed.configureTestingModule({
        imports: [
          NoopAnimationsModule,
          MatCheckboxModule,
          ReactiveFormsModule,
          ZonelessModule,
        ],
        declarations: [AppComponent, ChildComponent],
        providers: [
          {
            provide: ComponentFixtureAutoDetect,
            useValue: true,
          },
          {
            provide: NgZone,
            useClass: ɵNoopNgZone,
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
    });

    // set the application ref
    beforeEach(() => {
      const appRef = TestBed.inject<ApplicationRef>(ApplicationRef);
      fixture.componentRef.changeDetectorRef;
      const view = fixture.componentRef.hostView;
      (appRef as any)._views.push(view);
    });

    it('without ngzone and with ZonelessModule the checkbox should work', () => {
      const checkboxInput = fixture.debugElement.query(
        By.css('#checkbox input[type="checkbox"]')
      );
      const checkbox = fixture.debugElement.query(By.css('#checkbox'));
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(false);
      checkboxInput.nativeElement.dispatchEvent(new Event('click'));
      expect(
        checkbox.nativeElement.classList.contains('mat-checkbox-checked')
      ).toBe(true);
    });

    it('azClick calls detect changes only on the child', () => {
      const counter = fixture.debugElement.query(By.css('#counter'));
      const counter2 = fixture.debugElement.query(By.css('#counter2'));
      expect(counter.nativeElement.innerText.trim()).toBe('1');
      expect(counter2.nativeElement.innerText.trim()).toBe('1');
      const button = fixture.debugElement.query(By.css('#button-counter2'));
      button.nativeElement.dispatchEvent(new Event('click'));
      expect(counter.nativeElement.innerText.trim()).toBe('1');
      expect(counter2.nativeElement.innerText.trim()).toBe('2');
    });
  });
});
