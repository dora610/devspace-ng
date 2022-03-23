import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevRepoComponent } from './dev-repo.component';

describe('DevRepoComponent', () => {
  let component: DevRepoComponent;
  let fixture: ComponentFixture<DevRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
