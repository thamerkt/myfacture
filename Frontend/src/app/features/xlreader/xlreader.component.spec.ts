import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlreaderComponent } from './xlreader.component';

describe('XlreaderComponent', () => {
  let component: XlreaderComponent;
  let fixture: ComponentFixture<XlreaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XlreaderComponent]
    });
    fixture = TestBed.createComponent(XlreaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
