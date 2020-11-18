import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministrativoRegistroPageRoutingModule } from './administrativo-registro-routing.module';

import { AdministrativoRegistroPage } from './administrativo-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministrativoRegistroPageRoutingModule
  ],
  declarations: [AdministrativoRegistroPage]
})
export class AdministrativoRegistroPageModule {}
