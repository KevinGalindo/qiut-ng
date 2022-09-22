import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgProductsComponent } from './pg-products.component';

describe('PgProductsComponent', () => {
  let component: PgProductsComponent;
  let fixture: ComponentFixture<PgProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PgProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PgProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
