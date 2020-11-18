import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogCodigosCanjeoPageRoutingModule } from './log-codigos-canjeo-routing.module';

import { LogCodigosCanjeoPage } from './log-codigos-canjeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogCodigosCanjeoPageRoutingModule
  ],
  declarations: [LogCodigosCanjeoPage]
})
export class LogCodigosCanjeoPageModule {}
