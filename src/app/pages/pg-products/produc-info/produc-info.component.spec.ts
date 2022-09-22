import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducInfoComponent } from './produc-info.component';

describe('ProducInfoComponent', () => {
  let component: ProducInfoComponent;
  let fixture: ComponentFixture<ProducInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProducInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
