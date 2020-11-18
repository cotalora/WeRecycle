import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar-codigo-puntos',
  templateUrl: './ingresar-codigo-puntos.page.html',
  styleUrls: ['./ingresar-codigo-puntos.page.scss'],
})
export class IngresarCodigoPuntosPage implements OnInit {

  documento: string = "";
  resultado: string = "";
  residuo: string = "";
  datastorage: any;
  id: string;
  public selectedIndex;


  reciduos: any = [];
  

  constructor(
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private accessProviders: AccessProviders,
    private toastController: ToastController,
    public navController: NavController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.id = this.datastorage.idPersona;
    });
    this.getReciduos();
  }

  inicio(){
    this.navController.navigateRoot(['/administrativo-inicio']);
  }
  selectCard(idInce){
    this.residuo = idInce;
    this.selectedIndex = idInce;
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
        }
      });
    });
  }
  replace(input: string, key: number) : string {
    return input.replace(/([a-z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 97) % 26 + 97)
      ).replace(/([A-Z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 65) % 26 + 65))
      .replace(/([0-9])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 40) % 26 + 40));
  }
  async generarCodigo() {
    this.resultado = "";

    var cadena = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var longitudCadena = cadena.length;
    for ( var i = 0; i < 4; i++ ) {
      this.resultado += cadena.charAt(Math.floor(Math.random() * longitudCadena));
    }

    if (this.documento == "") {
      this.presentToast("Es necesario el número de documento")
    } else if (this.residuo == "") {
      this.presentToast("Es necesario el residuo")
    } else {
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'generate_code',
          id: this.id,
          documento: this.replace(this.documento, 1),
          codigo: this.resultado,
          residuo: this.residuo
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.presentAlert('El código es:',this.resultado);
          } else {
            loader.dismiss();
            this.presentToast('Documento no valido');
          }
        }, (err) => {
          if (err.status == 0) {
            loader.dismiss();
            this.presentToast('Fallo en la conexión');
            this.storage.clear();
            this.navController.navigateRoot(['/login']);
          } else if (err.status == 200) {
            loader.dismiss();
            this.presentToast('Documento no valido');
            this.storage.clear();
            this.navController.navigateRoot(['/login']);
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Ingresar código puntos'
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
            loader.dismiss();
            this.presentToast('Error');
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Ingresar código puntos'
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
  async presentAlert(a,b){
    const alert = await this.alertController.create({
      header: a,
      message: b,
      backdropDismiss: false,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navController.navigateRoot(['/administrativo-inicio']);
        }
      }]
    });
    await alert.present();
  }
  number(event){
    return (event.charCode > 47 && event.charCode < 58)
  }
}
