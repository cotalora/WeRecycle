import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessProviders } from './../../proveedores/access-providers';
import { LoadingController, ToastController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-ingresar-codigo-canjeo',
  templateUrl: './ingresar-codigo-canjeo.page.html',
  styleUrls: ['./ingresar-codigo-canjeo.page.scss'],
})
export class IngresarCodigoCanjeoPage implements OnInit {

  incentivos: any = [];
  codigo: string = "";
  documento: string = "";

  datastorage: any;
  id: string;
  token0: string;
  token1: string;
  token2: string;
  token3: string;

  constructor(
    private router: Router,
    private accessProviders: AccessProviders,
    private storage: Storage,
    private loadingController: LoadingController,
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
    this.navController.navigateRoot(['/administrativo-inicio']);
  }

  replace(input: string, key: number) : string {
    return input.replace(/([a-z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 97) % 26 + 97)
      ).replace(/([A-Z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 65) % 26 + 65))
      .replace(/([0-9])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 40) % 26 + 40));
  }

  async ingresarCodigo(){
    this.codigo = (this.token0+this.token1+this.token2+this.token3);
    if (this.token0 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token1 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token2 == "") {
      this.presentToast('Falta un dígito');
    } else if (this.token3 == "") {
      this.presentToast('Falta un dígito');
    } else if(this.documento == ""){
      this.presentToast("Es necesario el incentivo")
    } else {
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'enter_code_cant',
          codigo: this.codigo,
          documento: this.replace(this.documento, 1),
          id: this.id
        }
        this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
          if (res.success == true) {
            loader.dismiss();
            this.presentToast('Incentivo hecho');
            this.navController.navigateRoot(['/administrativo-inicio']);
          } else {
            loader.dismiss();
            this.presentToast('Código o documento invalido');
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
                fuente: 'Ingresar código canjeo'
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
  number(event){
    return (event.charCode > 47 && event.charCode < 58)
  }
}
