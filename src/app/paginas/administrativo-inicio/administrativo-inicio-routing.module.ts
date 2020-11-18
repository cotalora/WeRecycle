import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativoInicioPage } from './administrativo-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativoInicioPageRoutingModule {}
