/**
 * Test file for the app component
 *
 * Created July 8th, 2022
 * @author: ywarezk
 * @version: 0.0.1
 * @license: MIT
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { NgZone, ɵNoopNgZone } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatCheckboxModule],
      declarations: [AppComponent],
      providers: [{ provide: NgZone, useClass: ɵNoopNgZone }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  fit('sanity', async (done) => {
    const checkboxHarness = await loader.getHarness(MatCheckboxHarness);
    checkboxHarness.check();
  });
});
