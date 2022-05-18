import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediaMananaPage } from './media-manana.page';

const routes: Routes = [
  {
    path: '',
    component: MediaMananaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediaMananaPageRoutingModule {}
