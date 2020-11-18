import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-token-correo',
  templateUrl: './token-correo.page.html',
  styleUrls: ['./token-correo.page.scss'],
})
export class TokenCorreoPage implements OnInit {
  id: string;
  token: string;
  token0: string;
  token1: string;
  token2: string;
  token3: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accessProviders: AccessProviders,
    private toastController: ToastController,
    private loadingController: LoadingController,
    public navController: NavController
  ) { }

  ngOnInit() {
  }
  recuperar(){
    this.navController.navigateRoot(['/recuperar']);
  }
  press(event,field,back){
    
    if ((event.keyCode != 8) && (event.keyCode > 47 && event.keyCode < 58)) {
      field.setFocus();
    } else if(event.keyCode == 8) {
      back.setFocus();
    }
    
  }
  pressto(event){
    return (event.keyCode > 47 && event.keyCode < 58);
  }

  
  async validarToken(){
    this.token = (this.token0+this.token1+this.token2+this.token3);
    this.activatedRoute.params.subscribe((data: any) => {
      this.id = data.id;
    });
    if (this.token0 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token1 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token2 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token3 == "") {
      this.presentToast('Falta un dígito');
    } else {
      const loader = await this.loadingController.create({
        spinner: 'bubbles'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'validate_tokenEmail',
          id: this.id,
          token: this.token
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          loader.dismiss();
          if (res.success == true) {
            this.presentToast('Cambie su contraseña');
            this.navController.navigateRoot(['/cambio-contrasena/'+this.id]);
          } else {
            loader.dismiss();
            this.presentToast('El código no es correcto');
          }
        }, err => {
          loader.dismiss();
          if (err.status == 0) {
            this.presentToast('Revise su conexión');
          } else if (err.status == 200) {
            this.presentToast('El código no es correcto');
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Token correo'
              }
              this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
                if (res.success == true) {
                  loader.dismiss();
                } else {
                  loader.dismiss();
                }
              });
            });
          } else {
            this.presentToast('Error '+err.status);
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Token correo'
              }
              this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
                if (res.success == true) {
                  loader.dismiss();
                } else {
                  loader.dismiss();
                }
              });
            });
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
}
