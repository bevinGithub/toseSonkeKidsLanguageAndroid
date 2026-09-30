import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GuestFlipLearnCardComponent } from './guest-flip-learn-card.component';

describe('GuestFlipLearnCardComponent', () => {
  let component: GuestFlipLearnCardComponent;
  let fixture: ComponentFixture<GuestFlipLearnCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestFlipLearnCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GuestFlipLearnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
