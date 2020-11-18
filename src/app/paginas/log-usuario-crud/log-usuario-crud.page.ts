import { Component, OnInit } from '@angular/core';
import { AccessProviders } from './../../proveedores/access-providers';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-log-usuario-crud',
  templateUrl: './log-usuario-crud.page.html',
  styleUrls: ['./log-usuario-crud.page.scss'],
})
export class LogUsuarioCrudPage implements OnInit {

  usuarios: any = [];
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
    this.getUsuarios();
  }
  async getUsuarios(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_usuarios'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.usuarios.push(datas);
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
              fuente: 'Log usuario'
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
  inicio() {
    this.navController.navigateRoot(['/administrador-inicio']);
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
