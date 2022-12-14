import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducFormComponent } from './produc-form.component';

describe('ProducFormComponent', () => {
  let component: ProducFormComponent;
  let fixture: ComponentFixture<ProducFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ProducFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
