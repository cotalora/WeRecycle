import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrativoInicioPageRoutingModule } from './administrativo-inicio-routing.module';

import { AdministrativoInicioPage } from './administrativo-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrativoInicioPageRoutingModule
  ],
  declarations: [AdministrativoInicioPage]
})
export class AdministrativoInicioPageModule {}
