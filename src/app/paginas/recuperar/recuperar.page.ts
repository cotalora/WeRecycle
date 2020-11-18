import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from './../../proveedores/access-providers';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  email : string = "";
  name : string;
  message : string;
  endpoint : string;
  token : string = "";

  http: HttpClient;

  
  constructor(
    http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    public navController: NavController,
    private loadingController: LoadingController
    ) { 
      this.http = http;
    }

  ngOnInit() {
    this.name = "Hayden Pierce";
    this.message = "Hello, this is Hayden.";

    this.endpoint = "https://werecycle.000webhostapp.com/api/sendEmail.php";
  }
  login() {
    this.navController.navigateRoot(['/login']);
  }
  async sendEmail() {
    const loader = await this.loadingController.create({
      spinner: 'bubbles'
    });
    

    if(this.email == "") {
      this.presentToast("Escriba su correo");
    } else if (this.email.indexOf('@ucundinamarca.edu.co',0) < 3) {
      this.presentToast("El correo debe ser institucional")
    } else {
      this.token = Math.floor(Math.random()*(9999-1000+1)+1000).toString();
      
      loader.present();
      console.log(this.email);
      return new Promise(resolve => {
        let postVars = {
          aksi: 'email_auth',
          email: this.replace(this.email, 1),
          mil: this.email,
          token: this.token
        }
        this.accessProviders.postData(postVars, 'proses_api.php').subscribe((res:any) => {
          if (res.success == false) {
            loader.dismiss();
            this.presentToast('Correo no registrado');
          } else {
            this.accessProviders.postEmail(postVars, 'sendEmail.php').subscribe((res:any) => {
              if (res.succes == true) {
                loader.dismiss();
                console.log('Bien')
              } else {
                loader.dismiss();
                console.log('Mal')
              }
            }, err => {
              loader.dismiss();
              if (err.status == 0) {
                this.presentToast('Revise su conexión');
              } else if(err.status == 200){
                this.storage.set('storage_xxx', res.result);
                this.navController.navigateRoot(['/token-correo/'+ res.result.id]);
                this.email = "";
              }
            });
          }
        }, err => {
          loader.dismiss();
          if (err.status == 0) {
            this.presentToast('Revise su conexión');
          } else if (err.status == 200) {
            this.presentToast("Correo no registrado");
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Recuperar'
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
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Recuperar'
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
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  replace(input: string, key: number) : string {
    return input.replace(/([a-z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 97) % 26 + 97)
      ).replace(/([A-Z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 65) % 26 + 65))
      .replace(/([0-9])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 40) % 26 + 40));
  }
  press(event){
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 46)
  }
}
