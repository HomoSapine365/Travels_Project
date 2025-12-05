import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDetail } from './bus-detail';

describe('BusDetail', () => {
  let component: BusDetail;
  let fixture: ComponentFixture<BusDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      })
    .compileComponents();

    fixture = TestBed.createComponent(BusDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

