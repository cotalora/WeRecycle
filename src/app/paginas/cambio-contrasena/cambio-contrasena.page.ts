import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from './../../proveedores/access-providers';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {
  contrasena: string = "";
  confirmaContrasena:string;
  id: string;

  countSpecialCharacters: number = 0;
  detecAr: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accessProviders: AccessProviders,
    private toastController: ToastController,
    public navController: NavController,
    private loadingController: LoadingController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  login(){
    this.navController.navigateRoot(['/login']);
  }
  async cambioContrasena(){
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
    });

    this.countSpecialCharacters = 0;
    this.detecAr = false;
    for (let index = 0; index < this.contrasena.length; index++) {
      this.contrasena.charAt(index);
      if (this.contrasena.charAt(index) != ('@' || '-' || '*' || '?' || '!' || '#' || '$' || '/' || '(' || ')' || '{'
      || '}' || '=' || '.' || ',' || ';' || ':' || ' ')) {
        this.countSpecialCharacters = this.countSpecialCharacters + 1;
      }
    }


    if (this.contrasena == "") {
      this.presentToast("Es necesaria la contraseña")
    } else if (this.countSpecialCharacters == this.contrasena.length) {
      this.presentToast("Necesita characteres especiales - * ? ! @ # $ / () {} = . , ; :");
    } else if (this.contrasena.length < 12) {
      this.presentToast("La contraseña debe tener 12 o más caracteres");
    } else if (this.contrasena.length > 64) {
      this.presentToast("La contraseña debe tener menos de 64 caracteres");
    } else if (this.contrasena.indexOf('12345',0) >= 0 && this.contrasena.indexOf('12345',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('qwert',0) >= 0 && this.contrasena.indexOf('qwert',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('contras',0) >= 0 && this.contrasena.indexOf('contras',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('abc',0) >= 0 && this.contrasena.indexOf('abc',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('1111',0) >= 0 && this.contrasena.indexOf('1111',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('0000',0) >= 0 && this.contrasena.indexOf('0000',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('2222',0) >= 0 && this.contrasena.indexOf('2222',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('3333',0) >= 0 && this.contrasena.indexOf('3333',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('4444',0) >= 0 && this.contrasena.indexOf('4444',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('5555',0) >= 0 && this.contrasena.indexOf('5555',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('6666',0) >= 0 && this.contrasena.indexOf('6666',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('7777',0) >= 0 && this.contrasena.indexOf('7777',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('8888',0) >= 0 && this.contrasena.indexOf('8888',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('9999',0) >= 0 && this.contrasena.indexOf('9999',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.confirmaContrasena != this.contrasena) {
      this.presentToast("La contraseña no coincide")
    } else {
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'update_Password',
          id: this.id,
          contrasena: this.contrasena
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.presentToast('Cambio exitoso');
            this.storage.clear();
            this.navController.navigateRoot(['/login']);
          } else {
            loader.dismiss();
            this.presentToast('Contraseña fallida');
          }
        }, err => {
          loader.dismiss();
          if (err.status == 0) {
            this.presentToast('Revise su conexión');
          } else if (err.status == 200) {
            this.presentToast('Contraseña fallida');
          } else {
            this.presentToast('Error '+err.status);
          }
        });
      });
    }
  }
  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }
  pass(event) {
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 47 && event.charCode < 58)
    || event.charCode == 45 || event.charCode == 42 || event.charCode == 63 || event.charCode == 33 || event.charCode == 35 || event.charCode == 36
    || event.charCode == 47 || event.charCode == 40 || event.charCode == 41 || event.charCode == 123 || event.charCode == 125 || event.charCode == 95
    || event.charCode == 209 || event.charCode == 241) 
  }
}
