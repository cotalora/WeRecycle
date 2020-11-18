import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogUsuarioCrudPage } from './log-usuario-crud.page';

const routes: Routes = [
  {
    path: '',
    component: LogUsuarioCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogUsuarioCrudPageRoutingModule {}
