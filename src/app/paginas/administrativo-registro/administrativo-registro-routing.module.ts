import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativoRegistroPage } from './administrativo-registro.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativoRegistroPageRoutingModule {}
