import { Component, OnInit } from '@angular/core';
import { AccessProviders } from './../../proveedores/access-providers';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-log-codigos-canjeo',
  templateUrl: './log-codigos-canjeo.page.html',
  styleUrls: ['./log-codigos-canjeo.page.scss'],
})
export class LogCodigosCanjeoPage implements OnInit {

  codigos: any = [];
  datastorage: any;

  constructor(
    private accessProviders: AccessProviders,
    private toastController: ToastController,
    private storage: Storage,
    public navController: NavController
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
    });
    this.getCodigoAdministrativos();
  }
  inicio() {
    this.navController.navigateRoot(['/administrador-inicio']);
  }
  getCodigoAdministrativos(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_codigosCanjeo'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.codigos.push(datas);
        }
        resolve(true);
      }, (err) => {
        if (err.status == 0) {
          this.presentToast('Fallo en la conexión');
          this.storage.clear();
          this.navController.navigateRoot(['/login']);
        } else {
          return new Promise(resolve => {
            let body = {
              aksi: 'log_error',
              codigo: err.status,
              fuente: 'Log codigo canjeo'
            }
            this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
              if (res.success == true) {
              }
            });
          });
        }
      });
    });
  }
  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1500
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

}
