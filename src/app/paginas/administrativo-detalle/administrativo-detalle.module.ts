import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrativoDetallePageRoutingModule } from './administrativo-detalle-routing.module';

import { AdministrativoDetallePage } from './administrativo-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrativoDetallePageRoutingModule
  ],
  declarations: [AdministrativoDetallePage]
})
export class AdministrativoDetallePageModule {}
