import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-generar-codigo-canjeo',
  templateUrl: './generar-codigo-canjeo.page.html',
  styleUrls: ['./generar-codigo-canjeo.page.scss'],
})
export class GenerarCodigoCanjeoPage implements OnInit {

  incentivos: any = [];
  datastorage: any;
  puntaje: string;
  id: string;
  resultado: string = "";
  incentivoo: string = "";
  public selectedIndex;

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    public navController: NavController,
    private loadingController: LoadingController,
    private accessProviders: AccessProviders
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.puntaje = this.datastorage.puntaje;
      this.id = this.datastorage.idPersona;
    });
    this.getIncentivos();

  }
  ionViewWillLeave(){
    this.reloadData();
  }
  inicio(){
    this.navController.navigateRoot(['/usuario-inicio']);
  }
  
  selectCard(idInce){
    this.incentivoo = idInce;
    this.selectedIndex = idInce;

  }

  async getIncentivos(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_incentivos'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.incentivos.push(datas);
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

  async generarCodigo() {
    this.resultado = "";


    var cadena = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var longitudCadena = cadena.length;
    for ( var i = 0; i < 4; i++ ) {
      this.resultado += cadena.charAt(Math.floor(Math.random() * longitudCadena));
    }

    if (this.incentivoo == "") {
      this.presentToast("Es necesario el incentivo");
    } else if (parseInt(this.puntaje) < parseInt(this.incentivos[parseInt(this.incentivoo)-1].valor)) {
      this.presentToast("El puntaje no es suficiente");
    } else {
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'generate_code_amount',
          id: this.id,
          codigo: this.resultado,
          incentivo: this.incentivoo
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.presentAlert('El código es:',this.resultado);
          } else {
            loader.dismiss();
            this.presentToast('Error');
            console.log(this.incentivoo);
          }
        }, (err) => {
          if (err.status == 0) {
            loader.dismiss();
            this.presentToast('Fallo en la conexión');
            this.storage.clear();
            this.navController.navigateRoot(['/login']);
          } else {
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Generar código canjeo'
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
          this.navController.navigateRoot(['/usuario-inicio']);
        }
      }]
    });
    await alert.present();
  }

}
