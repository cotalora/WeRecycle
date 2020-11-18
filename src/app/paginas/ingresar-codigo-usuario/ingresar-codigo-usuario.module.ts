import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarCodigoUsuarioPageRoutingModule } from './ingresar-codigo-usuario-routing.module';

import { IngresarCodigoUsuarioPage } from './ingresar-codigo-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarCodigoUsuarioPageRoutingModule
  ],
  declarations: [IngresarCodigoUsuarioPage]
})
export class IngresarCodigoUsuarioPageModule {}
