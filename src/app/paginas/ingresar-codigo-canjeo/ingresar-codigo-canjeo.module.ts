import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarCodigoCanjeoPageRoutingModule } from './ingresar-codigo-canjeo-routing.module';

import { IngresarCodigoCanjeoPage } from './ingresar-codigo-canjeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarCodigoCanjeoPageRoutingModule
  ],
  declarations: [IngresarCodigoCanjeoPage]
})
export class IngresarCodigoCanjeoPageModule {}
