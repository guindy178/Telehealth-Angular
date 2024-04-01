import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprofiledocComponent } from './editprofiledoc.component';

describe('EditprofiledocComponent', () => {
  let component: EditprofiledocComponent;
  let fixture: ComponentFixture<EditprofiledocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprofiledocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprofiledocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
