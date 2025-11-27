import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VhCodeCategory } from './vh-code-category';

describe('VhCodeCategory', () => {
  let component: VhCodeCategory;
  let fixture: ComponentFixture<VhCodeCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VhCodeCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VhCodeCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
