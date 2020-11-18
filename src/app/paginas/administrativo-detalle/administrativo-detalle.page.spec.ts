import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdministrativoDetallePage } from './administrativo-detalle.page';

describe('AdministrativoDetallePage', () => {
  let component: AdministrativoDetallePage;
  let fixture: ComponentFixture<AdministrativoDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativoDetallePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdministrativoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
