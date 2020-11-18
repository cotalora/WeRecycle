import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = "";
  contrasena: string = "";
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  disabledButton;

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    private alertController: AlertController,
    public navController: NavController
  ) { }

  ngOnInit() {
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }
  openRegister() {
    this.navController.navigateRoot(['/usuario-registro']);
  }
  openRecuperar() {
    this.navController.navigateRoot(['/recuperar']);
  }

  replace(input: string, key: number) : string {
    return input.replace(/([a-z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 97) % 26 + 97)
      ).replace(/([A-Z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 65) % 26 + 65))
      .replace(/([0-9])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 40) % 26 + 40));
  }

  async tryLogin(){
    
    if (this.correo == "") {
      this.presentToast("Es necesario su correo")
    } else if (this.contrasena == "") {
      this.presentToast("Es necesario su contraseña")
    } else {
      this.disabledButton = true;
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          correo: this.replace(this.correo, 1),
          contrasena: this.contrasena
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.storage.set('storage_xxx', res.result);
            if (res.result.estadoCuenta == "0") {
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert();
            } else {
              if(res.result.rol == "1"){
                this.navController.navigateRoot(['/usuario-inicio']);
              } else if (res.result.rol == "2") {
                this.navController.navigateRoot(['/administrativo-inicio']);
              } else {
                this.navController.navigateRoot(['/administrador-inicio']);
              }
            }
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Correo o contraseña incorrecta');
          }
        },(err) => {
          loader.dismiss();
          if (err.status == 0) {
            this.disabledButton = false;
            this.presentToast('Revise su conexión');
          } else if (err.status == 200) {
            this.disabledButton = false;
            this.presentToast('Correo o contraseña incorrecta');
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Login'
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
            this.disabledButton = false;
            this.presentToast('Error ' + err.status);
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Login'
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

  async presentToast(a){
    const toast = await this.toastController.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Su cuenta está inhabilitada. ¿Desea activarla?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No'
        }, {
          text: 'Sí',
          handler: () => {
            this.openRecuperar();
          }
        }
      ]
    });
    await alert.present();
  }
  press(event){
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 46)
  }
  pass(event) {
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 47 && event.charCode < 58)
    || event.charCode == 45 || event.charCode == 42 || event.charCode == 63 || event.charCode == 33 || event.charCode == 35 || event.charCode == 36
    || event.charCode == 47 || event.charCode == 40 || event.charCode == 41 || event.charCode == 123 || event.charCode == 125 || event.charCode == 95
    || event.charCode == 209 || event.charCode == 241) 
  }
}
