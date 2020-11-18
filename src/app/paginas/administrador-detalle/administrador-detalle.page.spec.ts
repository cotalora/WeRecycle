import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministradorDetallePage } from './administrador-detalle.page';

describe('AdministradorDetallePage', () => {
  let component: AdministradorDetallePage;
  let fixture: ComponentFixture<AdministradorDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministradorDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministradorDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
