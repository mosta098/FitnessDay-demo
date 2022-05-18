import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgramSelectorPage } from './program-selector.page';

const routes: Routes = [
  {
    path: '',
    component: ProgramSelectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramSelectorPageRoutingModule {}
