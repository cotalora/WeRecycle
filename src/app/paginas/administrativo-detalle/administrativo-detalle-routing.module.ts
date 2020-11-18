import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativoDetallePage } from './administrativo-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AdministrativoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrativoDetallePageRoutingModule {}
