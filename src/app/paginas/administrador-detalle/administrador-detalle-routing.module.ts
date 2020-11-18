import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorDetallePage } from './administrador-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorDetallePageRoutingModule {}
