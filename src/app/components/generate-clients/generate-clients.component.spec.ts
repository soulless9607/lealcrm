import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateClientsComponent } from './generate-clients.component';

describe('GenerateClientsComponent', () => {
  let component: GenerateClientsComponent;
  let fixture: ComponentFixture<GenerateClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
