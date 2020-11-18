import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogCodigosSumaPuntosPage } from './log-codigos-suma-puntos.page';

const routes: Routes = [
  {
    path: '',
    component: LogCodigosSumaPuntosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogCodigosSumaPuntosPageRoutingModule {}
