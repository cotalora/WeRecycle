import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngresarCodigoUsuarioPage } from './ingresar-codigo-usuario.page';

describe('IngresarCodigoUsuarioPage', () => {
  let component: IngresarCodigoUsuarioPage;
  let fixture: ComponentFixture<IngresarCodigoUsuarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarCodigoUsuarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngresarCodigoUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
