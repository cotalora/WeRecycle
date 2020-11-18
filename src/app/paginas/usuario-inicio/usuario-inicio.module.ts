import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuarioInicioPageRoutingModule } from './usuario-inicio-routing.module';

import { UsuarioInicioPage } from './usuario-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuarioInicioPageRoutingModule
  ],
  declarations: [UsuarioInicioPage]
})
export class UsuarioInicioPageModule {}
