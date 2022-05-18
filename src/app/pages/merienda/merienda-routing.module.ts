import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeriendaPage } from './merienda.page';

const routes: Routes = [
  {
    path: '',
    component: MeriendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeriendaPageRoutingModule {}
