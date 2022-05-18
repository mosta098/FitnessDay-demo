import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KcalPageRoutingModule } from './kcal-routing.module';

import { KcalPage } from './kcal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KcalPageRoutingModule
  ],
  declarations: [KcalPage]
})
export class KcalPageModule {}
