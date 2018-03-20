import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentClientsComponent } from './permanent-clients.component';

describe('PermanentClientsComponent', () => {
  let component: PermanentClientsComponent;
  let fixture: ComponentFixture<PermanentClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanentClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanentClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
