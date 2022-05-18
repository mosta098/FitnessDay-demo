import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProgramSelectorPage } from './program-selector.page';

describe('ProgramSelectorPage', () => {
  let component: ProgramSelectorPage;
  let fixture: ComponentFixture<ProgramSelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSelectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
