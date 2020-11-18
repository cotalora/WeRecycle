import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogAdministrativoCrudPage } from './log-administrativo-crud.page';

describe('LogAdministrativoCrudPage', () => {
  let component: LogAdministrativoCrudPage;
  let fixture: ComponentFixture<LogAdministrativoCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogAdministrativoCrudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogAdministrativoCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
