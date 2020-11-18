import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorDetallePageRoutingModule } from './administrador-detalle-routing.module';

import { AdministradorDetallePage } from './administrador-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorDetallePageRoutingModule
  ],
  declarations: [AdministradorDetallePage]
})
export class AdministradorDetallePageModule {}
