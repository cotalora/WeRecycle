import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogCodigosSumaPuntosPageRoutingModule } from './log-codigos-suma-puntos-routing.module';

import { LogCodigosSumaPuntosPage } from './log-codigos-suma-puntos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogCodigosSumaPuntosPageRoutingModule
  ],
  declarations: [LogCodigosSumaPuntosPage]
})
export class LogCodigosSumaPuntosPageModule {}
