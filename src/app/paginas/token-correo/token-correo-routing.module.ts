import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TokenCorreoPage } from './token-correo.page';

const routes: Routes = [
  {
    path: '',
    component: TokenCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenCorreoPageRoutingModule {}
