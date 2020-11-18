import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogCodigosCanjeoPage } from './log-codigos-canjeo.page';

describe('LogCodigosCanjeoPage', () => {
  let component: LogCodigosCanjeoPage;
  let fixture: ComponentFixture<LogCodigosCanjeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCodigosCanjeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogCodigosCanjeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
