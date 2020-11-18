import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarCodigoCanjeoPage } from './ingresar-codigo-canjeo.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarCodigoCanjeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarCodigoCanjeoPageRoutingModule {}
