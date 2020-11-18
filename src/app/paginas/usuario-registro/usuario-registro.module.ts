import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioRegistroPageRoutingModule } from './usuario-registro-routing.module';

import { UsuarioRegistroPage } from './usuario-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioRegistroPageRoutingModule
  ],
  declarations: [UsuarioRegistroPage]
})
export class UsuarioRegistroPageModule {}
