import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeriendaPageRoutingModule } from './merienda-routing.module';

import { MeriendaPage } from './merienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeriendaPageRoutingModule
  ],
  declarations: [MeriendaPage]
})
export class MeriendaPageModule {}
