import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledocComponent } from './profiledoc.component';

describe('ProfiledocComponent', () => {
  let component: ProfiledocComponent;
  let fixture: ComponentFixture<ProfiledocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiledocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfiledocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
