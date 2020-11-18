import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorInicioPageRoutingModule } from './administrador-inicio-routing.module';

import { AdministradorInicioPage } from './administrador-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorInicioPageRoutingModule
  ],
  declarations: [AdministradorInicioPage]
})
export class AdministradorInicioPageModule {}
