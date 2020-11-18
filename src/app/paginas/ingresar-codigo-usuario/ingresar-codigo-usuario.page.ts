import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ingresar-codigo-usuario',
  templateUrl: './ingresar-codigo-usuario.page.html',
  styleUrls: ['./ingresar-codigo-usuario.page.scss'],
})
export class IngresarCodigoUsuarioPage implements OnInit {

  codigo: string = "";
  token0: string;
  token1: string;
  token2: string;
  token3: string;
  datastorage: any;
  id: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accessProviders: AccessProviders,
    private loadingController: LoadingController,
    private storage: Storage,
    public navController: NavController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.id = this.datastorage.idPersona;
    });
  }

  ionViewWillLeave(){
    this.reloadData();
  }
  press(event,field,back){
    
    if ((event.keyCode != 8) && ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123))) {
      field.setFocus();
    } else if(event.keyCode == 8) {
      back.setFocus();
    }
  }
  pressto(event){
    return ((event.keyCode > 47 && event.keyCode < 58) || (event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123));
  }
  inicio(){
    this.navController.navigateRoot(['/usuario-inicio']);
  }
  async ingresarCodigo() {
    this.codigo = (this.token0+this.token1+this.token2+this.token3);
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
        message: 'Por favor espere...'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'enter_code',
          id: this.id,
          codigo: this.codigo
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.presentToast('Puntos añadidos');
            this.inicio();
          } else {
            loader.dismiss();
            this.presentToast('Código invalido');
          }
        }, (err) => {
          if (err.status == 0) {
            loader.dismiss();
            this.presentToast('Fallo en la conexión');
            this.storage.clear();
          } else {
            return new Promise(resolve => {
              let body = {
                aksi: 'log_error',
                codigo: err.status,
                fuente: 'Ingresar codugo usuario'
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
      },(err) => {
        loader.dismiss();
        if (err.status == 0) {
          this.presentToast('Fallo en la conexión');
          this.navController.navigateRoot(['/login']);
          this.storage.clear();
        } else if (err.status == 200) {
          this.presentToast('Correo o contraseña incorrecta');
        } else {
          this.presentToast('Error ' + err.status);
        }
      });
    });
  }
}
