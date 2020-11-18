import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorInicioPage } from './administrador-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorInicioPageRoutingModule {}
