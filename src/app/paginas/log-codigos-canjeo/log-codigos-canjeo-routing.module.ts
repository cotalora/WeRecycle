import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogCodigosCanjeoPage } from './log-codigos-canjeo.page';

const routes: Routes = [
  {
    path: '',
    component: LogCodigosCanjeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogCodigosCanjeoPageRoutingModule {}
