import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarCodigoCanjeoPageRoutingModule } from './generar-codigo-canjeo-routing.module';

import { GenerarCodigoCanjeoPage } from './generar-codigo-canjeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarCodigoCanjeoPageRoutingModule
  ],
  declarations: [GenerarCodigoCanjeoPage]
})
export class GenerarCodigoCanjeoPageModule {}
