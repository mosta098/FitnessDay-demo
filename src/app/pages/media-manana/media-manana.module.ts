import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaMananaPageRoutingModule } from './media-manana-routing.module';

import { MediaMananaPage } from './media-manana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaMananaPageRoutingModule
  ],
  declarations: [MediaMananaPage]
})
export class MediaMananaPageModule {}
