import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-administrador-inicio',
  templateUrl: './administrador-inicio.page.html',
  styleUrls: ['./administrador-inicio.page.scss'],
})
export class AdministradorInicioPage implements OnInit {

  datastorage: any;
  nombre: string;
  id: string;
  reciduos: any = [];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    public navController: NavController,
    private activatedRoute: ActivatedRoute,
  ) { }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.nombre = this.datastorage.pNombre;
      this.id = this.datastorage.idPersona;
    });
    this.getReciduos();
  }

  ngOnInit() {
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
              fuente: 'Inicio administrador'
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
  goActividadUsuarios(){
    this.navController.navigateRoot(['/log-usuario-crud']);
  }
  goActividadAdministrativos(){
    this.navController.navigateRoot(['/log-administrativo-crud']);
  }
  goCodigosCanjeo(){
    this.navController.navigateRoot(['/log-codigos-canjeo']);
  }
  goCodigosSumaPuntos(){
    this.navController.navigateRoot(['/log-codigos-suma-puntos']);
  }
  goToDetails(){
    this.navController.navigateRoot(['/administrador-detalle']);
  }
  goToCrearAdministrativo(){
    this.navController.navigateRoot(['/administrativo-registro']);
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: '¿Desea cerrar sesión?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No',
          handler: (blah) => {
            console.log('Cancelación confirmada: blah')
          }
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
}
