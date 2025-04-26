import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvWindowComponent } from './cv-window.component';

describe('CvWindowComponent', () => {
  let component: CvWindowComponent;
  let fixture: ComponentFixture<CvWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
