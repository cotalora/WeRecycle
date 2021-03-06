import { AccessProviders } from './../../proveedores/access-providers';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-administrativo-detalle',
  templateUrl: './administrativo-detalle.page.html',
  styleUrls: ['./administrativo-detalle.page.scss'],
})
export class AdministrativoDetallePage implements OnInit {

  id: string;

  pApellido: string = "";
  sApellido: string = "";
  pNombre: string = "";
  sNombre: string = "";
  tipDoc: string = "";
  numDoc: string = "";
  codigo: string = "";
  correo: string = "";
  contrasena: string = "";
  confirmaContrasena: string = "";
  departamento: string = "";
  municipio: string = "";
  direccion: string = "";
  fechaNacimiento
  genero: string = "";

  public correoAux: string = "";

  countSpecialCharacters: number = 0;
  detecAr: boolean = false;

  datastorage: any;
  nombreDepartamentos: any = [];
  nombreMunicipios: any = [];
  tipoDocumentos: any = [];

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private accessProviders: AccessProviders,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.id = this.datastorage.idPersona;
      this.loadUser();
    });
    
  }

  ionViewWillLeave(){
    this.reloadData();
  }
  ionViewDidEnter(){

    this.nombreDepartamentos = [];
    this.nombreMunicipios = [];
    this.tipoDocumentos = [];
    this.getTipoDocumento();
    this.getDepartamento();
  }

  goToInicio(){
    this.navController.navigateRoot(['/administrativo-inicio']);
  }

  async getDepartamento(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_departamentos'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.nombreDepartamentos.push(datas);
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

  async getTipoDocumento(){
    return new Promise(resolve => {
      let body = {
        aksi: 'load_tipoDocumento'
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        for (let datas of res.result){
          this.tipoDocumentos.push(datas);
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

  async getMunicipio(a){
    this.nombreMunicipios = [];
    return new Promise(resolve => {
      let body = {
        aksi: 'load_municipios',
        idDepartamento: a
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {  
          for (let datas of res.result){
            this.nombreMunicipios.push(datas);
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

  async disableCount(a) {
    const loader = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    loader.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'disable_count_administrativo',
        id: a
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        if (res.success == true) {
          loader.dismiss();
          this.presentToast('Se inhabilitó la cuenta');
          this.ionViewDidEnter();
          this.storage.clear();
          this.navController.navigateRoot(['/login']);
        } else {
          loader.dismiss();
          this.presentToast('Error al inhabilitar');
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

  replace(input: string, key: number) : string {
    return input.replace(/([a-z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 97) % 26 + 97)
      ).replace(/([A-Z])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 65) % 26 + 65))
      .replace(/([0-9])/g, 
      ($1) => String.fromCharCode(($1.charCodeAt(0) + key + 26 - 40) % 26 + 40));
  }

  async loadUser(){
    const loader = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    loader.present();
    return new Promise(resolve => {
      let body = {
        aksi: 'load_data',
        id: this.id
      }
      this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
        this.pApellido = res.result.pApellido;
        this.sApellido = res.result.sApellido;
        this.pNombre = res.result.pNombre;
        this.sNombre = res.result.sNombre;
        this.tipDoc = res.result.tipDoc;
        this.numDoc = this.replace(res.result.numDoc,-1);
        this.codigo = this.replace(res.result.codigo,-1);
        this.correo = this.replace(res.result.correo,-1);
        this.departamento = res.result.departamento;
        this.municipio = res.result.municipio;
        this.direccion = this.replace(res.result.direccion,-1);
        this.fechaNacimiento = res.result.fechaNacimiento;
        this.genero = res.result.genero;
        this.correoAux = this.correo;
        loader.dismiss();
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



  async tryUpdate(){
    this.countSpecialCharacters = 0;
    for (let index = 0; index < this.contrasena.length; index++) {
      this.contrasena.charAt(index);
      console.log(this.contrasena.charAt(index) + "[" + index + "]")
      if (this.contrasena.charAt(index) != ('@' || '-' || '*' || '?' || '!' || '#' || '$' || '/' || '(' || ')' || '{'
      || '}' || '=' || '.' || ',' || ';' || ':')) {
        this.countSpecialCharacters = this.countSpecialCharacters + 1;
      }
    }

    if(this.pApellido == "") {
      this.presentToast("Es necesario su primer apellido")
    } else if (this.pNombre == "") {
      this.presentToast("Es necesario su primer nombre")
    } else if (this.tipDoc == "") {
      this.presentToast("Es necesario el tipo de documento")
    } else if (this.numDoc == "") {
      this.presentToast("Es necesario su número de documento")
    } else if (this.numDoc.length > 10) {
      this.presentToast("El número de documento debe ser inferior a 10 dígitos")
    } else if (this.numDoc.length < 4) {
      this.presentToast("El número de documento debe ser mayor a 4 dígitos")
    } else if (this.codigo == "") {
      this.presentToast("Es necesario su código")
    } else if (this.codigo.length > 10) {
      this.presentToast("El código debe ser inferior a 10 dígitos")
    } else if (this.codigo.length < 4) {
      this.presentToast("El código debe ser mayor a 4 dígitos")
    } else if (this.correo == "") {
      this.presentToast("Es necesario su correo")
    } else if (this.correo.indexOf('@ucundinamarca.edu.co',0) < 3) {
      this.presentToast("El correo debe ser institucional")
    } else if (this.departamento == "") {
      this.presentToast("Es necesario el departamento")
    } else if (this.municipio == "") {
      this.presentToast("Es necesario el municipio")
    } else if (this.direccion == "") {
      this.presentToast("Es necesaria la dirección")
    } else if (this.fechaNacimiento == "") {
      this.presentToast("Es necesaria la fecha de nacimiento")
    } else if (this.genero == "") {
      this.presentToast("Es necesario el género")
    } else if ((this.countSpecialCharacters == this.contrasena.length) && (this.contrasena != "")) {
      this.presentToast("Necesita characteres especiales - * ? ! @ # $ / () {} = . , ; :");
    } else if ((this.contrasena.length < 12)  && (this.contrasena != "") && (this.contrasena.length > 64)) {
      this.presentToast("La contraseña debe tener entre 12 y 64 caracteres");
    } else if (this.contrasena.indexOf('12345',0) >= 0 && this.contrasena.indexOf('12345',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('qwert',0) >= 0 && this.contrasena.indexOf('qwert',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('contras',0) >= 0 && this.contrasena.indexOf('contras',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('abc',0) >= 0 && this.contrasena.indexOf('abc',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('1111',0) >= 0 && this.contrasena.indexOf('1111',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('0000',0) >= 0 && this.contrasena.indexOf('0000',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('2222',0) >= 0 && this.contrasena.indexOf('2222',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('3333',0) >= 0 && this.contrasena.indexOf('3333',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('4444',0) >= 0 && this.contrasena.indexOf('4444',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('5555',0) >= 0 && this.contrasena.indexOf('5555',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('6666',0) >= 0 && this.contrasena.indexOf('6666',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('7777',0) >= 0 && this.contrasena.indexOf('7777',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('8888',0) >= 0 && this.contrasena.indexOf('8888',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else if (this.contrasena.indexOf('9999',0) >= 0 && this.contrasena.indexOf('9999',0) < 4) {
      this.presentToast("Contraseña invalida");
    } else {
      if (this.correoAux != this.correo) {
        this.changeEmail();
      } else {
        const loader = await this.loadingController.create({
          message: 'Por favor espere...'
        });
        loader.present();
  
        return new Promise(resolve => {
          let body = {
            aksi: 'proses_update_administrativo',
            id: this.id,
            auxCorreo: this.replace(this.correoAux,1),
            pApellido: this.pApellido,
            sApellido: this.sApellido,
            pNombre: this.pNombre,
            sNombre: this.sNombre,
            tipDoc: this.tipDoc,
            numDoc: this.replace(this.numDoc, 1),
            codigo: this.replace(this.codigo, 1),
            correo: this.replace(this.correo, 1),
            contrasena: this.contrasena,
            departamento: this.departamento,
            municipio: this.municipio,
            direccion: this.replace(this.direccion, 1),
            fechaNacimiento: this.fechaNacimiento,
            genero: this.genero
          }
          this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
            if (res.success == true) {
              loader.dismiss();
              this.presentToast(res.msg);
              this.router.navigate(['/administrativo-inicio']);
            } else {
              loader.dismiss();
              this.presentToast(res.msg);
            }
          },err => {
              loader.dismiss();
              if (err.status == 0) {
                this.presentToast('Fallo en la conexión');
                this.storage.clear();
                this.navController.navigateRoot(['/login']);
              } else if (err.status == 200) {
                this.router.navigate(['/administrativo-inicio']);
                this.presentToast('Actualización exitosa');
                this.pApellido = "";
                this.sApellido = "";
                this.pNombre = "";
                this.sNombre = "";
                this.tipDoc = "";
                this.numDoc = "";
                this.codigo = "";
                this.correo = "";
                this.contrasena = "";
                this.departamento = "";
                this.municipio = "";
                this.direccion = "";
                this.fechaNacimiento = "";
                this.genero = "";
                return new Promise(resolve => {
                  let body = {
                    aksi: 'log_error',
                    codigo: err.status,
                    fuente: 'Detalle administrativo'
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
                    fuente: 'Detalle administrativo'
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
  }

  async presentToast(a) {
    const toast = await this.toastController.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }
  async presentAlert(a){
    const alert = await this.alertController.create({
      header: '¿Está seguro?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'No'
        }, {
          text: 'Sí',
          handler: () => {
            this.disableCount(a);
          }
        }
      ]
    });
    await alert.present();
  }

  async changeEmail(){
    const alert = await this.alertController.create({
      header: 'Escriba su contraseña',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        }, {
          text: 'Aceptar',
          handler: data => {
            return new Promise(resolve => {
              let body = {
                aksi: 'validate_pass',
                id: this.id,
                pass: data.name
              }
              this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
                if (res.success == true) {
                  return new Promise(resolve => {
                    let body = {
                      aksi: 'proses_update_administrativo',
                      id: this.id,
                      auxCorreo: this.replace(this.correoAux,1),
                      pApellido: this.pApellido,
                      sApellido: this.sApellido,
                      pNombre: this.pNombre,
                      sNombre: this.sNombre,
                      tipDoc: this.tipDoc,
                      numDoc: this.replace(this.numDoc, 1),
                      codigo: this.replace(this.codigo, 1),
                      correo: this.replace(this.correo, 1),
                      contrasena: this.contrasena,
                      departamento: this.departamento,
                      municipio: this.municipio,
                      direccion: this.replace(this.direccion, 1),
                      fechaNacimiento: this.fechaNacimiento,
                      genero: this.genero
                    }
                    this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
                      if (res.success == true) {
                        this.presentToast(res.msg);
                        this.router.navigate(['/administrativo-inicio']);
                      } else {
                        this.presentToast(res.msg);
                      }
                    },err => {
                        if (err.status == 0) {
                          this.presentToast('Fallo en la conexión');
                          this.storage.clear();
                          this.navController.navigateRoot(['/login']);
                        } else if (err.status == 200) {
                          this.router.navigate(['/administrativo-inicio']);
                          this.presentToast('Actualización exitosa');
                          this.pApellido = "";
                          this.sApellido = "";
                          this.pNombre = "";
                          this.sNombre = "";
                          this.tipDoc = "";
                          this.numDoc = "";
                          this.codigo = "";
                          this.correo = "";
                          this.contrasena = "";
                          this.departamento = "";
                          this.municipio = "";
                          this.direccion = "";
                          this.fechaNacimiento = "";
                          this.genero = "";
                        } else {
                          return new Promise(resolve => {
                            let body = {
                              aksi: 'log_error',
                              codigo: err.status,
                              fuente: 'Detalle administrativo'
                            }
                            this.accessProviders.postData(body, 'proses_api.php').subscribe((res:any) => {
                              if (res.success == true) {
                              }
                            });
                          });
                        }
                    });
                  });
                } else {
                  this.presentToast('Contraseña equivocada');
                }
              });
            });
          }
        }
      ]
    });
    await alert.present();
  }


  email(event){
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 46)
  }
  letter(event){
    return ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || event.charCode == 8 || event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250 || event.charCode == 241 || event.charCode == 209)
  }
  number(event){
    return (event.charCode > 47 && event.charCode < 58)
  }
  direc(event){
    return ((event.charCode > 64 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 47 && event.charCode < 58) 
    || event.charCode == 32 || event.charCode == 45 || event.charCode == 35  || event.charCode == 225 || event.charCode == 233 || event.charCode == 237 || event.charCode == 243 || event.charCode == 250)
  }
  pass(event) {
    return ((event.charCode > 63 && event.charCode < 91) || (event.charCode > 96 && event.charCode < 123) || (event.charCode > 47 && event.charCode < 58)
    || event.charCode == 45 || event.charCode == 42 || event.charCode == 63 || event.charCode == 33 || event.charCode == 35 || event.charCode == 36
    || event.charCode == 47 || event.charCode == 40 || event.charCode == 41 || event.charCode == 123 || event.charCode == 125 || event.charCode == 95
    || event.charCode == 209 || event.charCode == 241) 
  }
}
