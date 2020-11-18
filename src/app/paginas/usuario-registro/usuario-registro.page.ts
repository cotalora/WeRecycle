import { AccessProviders } from './../../proveedores/access-providers';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-usuario-registro',
  templateUrl: './usuario-registro.page.html',
  styleUrls: ['./usuario-registro.page.scss'],
})
export class UsuarioRegistroPage implements OnInit {

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

  disabledButton;
  
  countSpecialCharacters: number = 0;
  detecAr: boolean = false;

  msgVal: string = "";
  valContrasena: boolean = false;

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
    public navController: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
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

  login() {
    this.navController.navigateRoot(['/login']);
  }
  ionViewDidEnter(){
    this.disabledButton = false;

    this.nombreDepartamentos = [];
    this.nombreMunicipios = [];
    this.tipoDocumentos = [];
    this.getTipoDocumento();
    this.getDepartamento();
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
          this.presentToast('Revise su conexión');
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
          this.presentToast('Revise su conexión');
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
      },(err) => {
        if (err.status == 200) {
          this.presentToast('Seleccione un departamento');
        } else if (err.status == 0) {
          this.presentToast('Revise su conexión');
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
 




  async tryRegister(){
    this.countSpecialCharacters = 0;
    this.detecAr = false;
    for (let index = 0; index < this.contrasena.length; index++) {
      this.contrasena.charAt(index);
      if (this.contrasena.charAt(index) != ('@' || '-' || '*' || '?' || '!' || '#' || '$' || '/' || '(' || ')' || '{'
      || '}' || '_' || ' ')) {
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
      this.presentToast("El número de documento debe ser inferior a 10 dígitos")
    } else if (this.codigo.length < 4) {
      this.presentToast("El código debe ser mayor a 4 dígitos")
    } else if (this.correo == "") {
      this.presentToast("Es necesario su correo")
    } else if (this.correo.indexOf('@ucundinamarca.edu.co',0) < 3) {
      this.presentToast("El correo debe ser institucional")
    } else if (this.contrasena == "") {
      this.presentToast("Es necesaria la contraseña")
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
    } else if (this.countSpecialCharacters == this.contrasena.length) {
      this.valContrasena = true;
      this.msgVal = "Necesita characteres especiales - * ? ! @ # $ / () {} _";
    } else if (this.contrasena.length < 12) {
      this.msgVal = "La contraseña debe tener 12 o más caracteres";
    } else if (this.contrasena.length > 64) {
      this.msgVal = "La contraseña debe tener menos de 64 caracteres";
    } else if (this.confirmaContrasena != this.contrasena) {
      this.presentToast("La contraseña no coincide")
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
    } else {
      this.disabledButton = true;
      const loader = await this.loadingController.create({
        message: 'Por favor espere...'
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
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
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.navController.navigateRoot(['/login']);
            
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        },(err) => {
            loader.dismiss();
            if (err.status == 0) {
              this.disabledButton = false;
              this.presentToast('Revise su conexión');
            } else if (err.status == 200) {
              this.disabledButton = false;
              this.navController.navigateRoot(['/login']);
              this.presentToast('Registro existo');
              this.pApellido = "";
              this.sApellido = "";
              this.pNombre = "";
              this.sNombre = "";
              this.tipDoc = "";
              this.numDoc = "";
              this.codigo = "";
              this.correo = "";
              this.contrasena = "";
              this.confirmaContrasena = "";
              this.departamento = "";
              this.municipio = "";
              this.direccion = "";
              this.fechaNacimiento = "";
              this.genero = "";
              return new Promise(resolve => {
                let body = {
                  aksi: 'log_error',
                  codigo: err.status,
                  fuente: 'Registro usuario'
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
              this.disabledButton = false;
              this.presentAlert('Error ' + err.status);
              return new Promise(resolve => {
                let body = {
                  aksi: 'log_error',
                  codigo: err.status,
                  fuente: 'Registro usuario'
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
  async politic(){
    const alert = await this.alertController.create({
      header: 'Política de tratamiento de datos.',
      message: "<div style='overflow-y:auto;max-height:240px;'><strong>POLÍTICA DE PRIVACIDAD</strong><p>La presente Política de Privacidad establece los términos en que WeRecycle usa y protege la información que es proporcionada por sus usuarios al momento de utilizar esta aplicación móvil. Esta compañía está comprometida con la seguridad de los datos de sus usuarios. Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.</p><strong>Información que es recogida</strong><p>WeRecycle podrá recoger información personal por ejemplo: Nombre,  información de contacto como  su dirección de correo electrónico e información demográfica. Esta información no se utilizará con fines comerciales ya que no es el fin último del servicio, se utilizará únicamente con fines estadísticos y/o de estudio.</p><strong>Uso de la información recogida</strong><p>WeRecycle emplea la información con el fin de proporcionar el mejor servicio posible, particularmente en el mantenimiento de los registros e historial de usuarios.  Es posible que en escenarios específicos se envíen correos electrónicos con el propósito de informar al usuario de movimientos de interés al interior de su perfil en la aplicación <br> WeRecycle está altamente comprometido en el mantenimiento seguro de su información. Usamos los sistemas más avanzados y los actualizamos constantemente para asegurarnos que no exista ningún acceso no autorizado.</p><strong>Control de su información personal</strong><p>WeRecycle se acoge a las disposiciones de la ley 1581 de 2012 del estado colombiano referente al tratamiento de datos personales. En cualquier momento usted puede restringir la recopilación o el uso de la información personal que es proporcionada a nuestro aplicativo.  Así mismo, con el propósito de garantizar la integridad y evitar el posible hurto de la información de los usuarios, WeRecycle emplea técnicas de encriptación para los datos de carácter sensible según las disposiciones de ley. Esta compañía no venderá, cederá ni distribuirá la información personal que es recopilada sin su consentimiento, salvo que sea requerido por un juez con un orden judicial. WeRecycle Se reserva el derecho de cambiar los términos de la presente Política de Privacidad en cualquier momento.</p></div>",
      backdropDismiss: false,
      buttons: [
        {
          text: 'No'
        }, {
          text: 'Sí',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(a){
    const alert = await this.alertController.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cerrar',
          handler: (blah) => {
            console.log('Cancelación confirmada: blah')
          }
        }, {
          text: 'Intentar de nuevo',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });
    await alert.present();
  }
}
