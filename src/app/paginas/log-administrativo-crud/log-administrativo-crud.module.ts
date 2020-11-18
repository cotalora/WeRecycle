import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogAdministrativoCrudPageRoutingModule } from './log-administrativo-crud-routing.module';

import { LogAdministrativoCrudPage } from './log-administrativo-crud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogAdministrativoCrudPageRoutingModule
  ],
  declarations: [LogAdministrativoCrudPage]
})
export class LogAdministrativoCrudPageModule {}
