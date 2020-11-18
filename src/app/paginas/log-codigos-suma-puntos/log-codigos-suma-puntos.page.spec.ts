import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogCodigosSumaPuntosPage } from './log-codigos-suma-puntos.page';

describe('LogCodigosSumaPuntosPage', () => {
  let component: LogCodigosSumaPuntosPage;
  let fixture: ComponentFixture<LogCodigosSumaPuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogCodigosSumaPuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogCodigosSumaPuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
