import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwproductComponent } from './veiwproduct.component';

describe('VeiwproductComponent', () => {
  let component: VeiwproductComponent;
  let fixture: ComponentFixture<VeiwproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
