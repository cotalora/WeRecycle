import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarCodigoPuntosPage } from './ingresar-codigo-puntos.page';

describe('IngresarCodigoPuntosPage', () => {
  let component: IngresarCodigoPuntosPage;
  let fixture: ComponentFixture<IngresarCodigoPuntosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarCodigoPuntosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarCodigoPuntosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
