import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PesoPage } from './peso.page';

describe('PesoPage', () => {
  let component: PesoPage;
  let fixture: ComponentFixture<PesoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PesoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
