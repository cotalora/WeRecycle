import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarCodigoPuntosPageRoutingModule } from './ingresar-codigo-puntos-routing.module';

import { IngresarCodigoPuntosPage } from './ingresar-codigo-puntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarCodigoPuntosPageRoutingModule
  ],
  declarations: [IngresarCodigoPuntosPage]
})
export class IngresarCodigoPuntosPageModule {}
