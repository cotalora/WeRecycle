import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarCodigoUsuarioPage } from './ingresar-codigo-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarCodigoUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarCodigoUsuarioPageRoutingModule {}
