import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IMCPage } from './imc.page';

describe('IMCPage', () => {
  let component: IMCPage;
  let fixture: ComponentFixture<IMCPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IMCPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IMCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
