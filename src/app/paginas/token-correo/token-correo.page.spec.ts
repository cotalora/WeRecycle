import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TokenCorreoPage } from './token-correo.page';

describe('TokenCorreoPage', () => {
  let component: TokenCorreoPage;
  let fixture: ComponentFixture<TokenCorreoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenCorreoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenCorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
