import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerarCodigoCanjeoPage } from './generar-codigo-canjeo.page';

describe('GenerarCodigoCanjeoPage', () => {
  let component: GenerarCodigoCanjeoPage;
  let fixture: ComponentFixture<GenerarCodigoCanjeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarCodigoCanjeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarCodigoCanjeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
