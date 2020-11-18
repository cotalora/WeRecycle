import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-inicio',
  templateUrl: './usuario-inicio.page.html',
  styleUrls: ['./usuario-inicio.page.scss'],
})
export class UsuarioInicioPage implements OnInit {

  datastorage: any;
  nombre: string;
  papellido: string;
  puntaje: string;
  id: string;

  reciduos: any = [];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    public navController: NavController,
    private alertController: AlertController
  ) { }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.nombre = this.datastorage.pNombre;
      this.puntaje = this.datastorage.puntaje;
      this.papellido = this.datastorage.pApellido;
      this.id = this.datastorage.idPersona;
    });
    this.getReciduos();
  }

  ngOnInit() {
    
  }
  goToDetails(){
    this.navController.navigateRoot(['/usuario-detalle']);
  }
  goToCode() {
    this.navController.navigateRoot(['/ingresar-codigo-usuario']);
  }
  goToChange() {
    this.navController.navigateRoot(['/generar-codigo-canjeo']);
  }
  goToActiv() {
    this.navController.navigateRoot(['/actividad']);
  }

  async reloadData(){
    const loader = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    loader.present();

    return new Promise(resolve => {
      let body = {
        aksi: 'proses_sendData',
        id: this.id
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        if (res.success == true) {
          loader.dismiss();
          this.storage.set('storage_xxx', res.result);
        }
      }, (err) => {
        if (err.status == 0) {
          loader.dismiss();
          this.presentToast('Fallo en la conexión');
          this.storage.clear();
          this.navController.navigateRoot(['/login']);
        }
      });
    });
  }

  async getReciduos(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_reciduos'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.reciduos.push(datas);
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
              fuente: 'Inicio usuario'
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
  async presentToast(a){
    const toast = await this.toastController.create({
      message: a,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  
  async prosesLogout(){
    const loader = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    loader.present();
    this.storage.clear();
    this.navController.navigateRoot(['/login']);
    const toast = await this.toastController.create({
      message: 'Salida exitosa',
      duration: 1500
    });
    toast.present();
    loader.dismiss();
  }
  async presentAlert(){
    const alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No'
        }, {
          text: 'Sí',
          handler: () => {
            this.prosesLogout();
          }
        }
      ]
    });
    await alert.present();
  }
  async doRefresh(event){
    const loader = await this.loadingController.create({
      message: 'Espere...'
    });
    this.reloadData()
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }
}
