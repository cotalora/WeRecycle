import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarCodigoCanjeoPage } from './ingresar-codigo-canjeo.page';

describe('IngresarCodigoCanjeoPage', () => {
  let component: IngresarCodigoCanjeoPage;
  let fixture: ComponentFixture<IngresarCodigoCanjeoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarCodigoCanjeoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarCodigoCanjeoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
