import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogUsuarioCrudPageRoutingModule } from './log-usuario-crud-routing.module';

import { LogUsuarioCrudPage } from './log-usuario-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogUsuarioCrudPageRoutingModule
  ],
  declarations: [LogUsuarioCrudPage]
})
export class LogUsuarioCrudPageModule {}
