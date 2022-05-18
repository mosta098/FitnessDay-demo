import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgramSelectorPageRoutingModule } from './program-selector-routing.module';

import { ProgramSelectorPage } from './program-selector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgramSelectorPageRoutingModule
  ],
  declarations: [ProgramSelectorPage]
})
export class ProgramSelectorPageModule {}
