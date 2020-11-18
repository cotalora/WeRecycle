import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogUsuarioCrudPage } from './log-usuario-crud.page';

describe('LogUsuarioCrudPage', () => {
  let component: LogUsuarioCrudPage;
  let fixture: ComponentFixture<LogUsuarioCrudPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUsuarioCrudPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogUsuarioCrudPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
