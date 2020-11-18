import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenCorreoPageRoutingModule } from './token-correo-routing.module';

import { TokenCorreoPage } from './token-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TokenCorreoPageRoutingModule
  ],
  declarations: [TokenCorreoPage]
})
export class TokenCorreoPageModule {}
