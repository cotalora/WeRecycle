import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarCodigoPuntosPage } from './ingresar-codigo-puntos.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarCodigoPuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarCodigoPuntosPageRoutingModule {}
