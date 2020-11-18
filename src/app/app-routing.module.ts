import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)},
  { path: 'usuario-registro', loadChildren: () => import('./paginas/usuario-registro/usuario-registro.module').then( m => m.UsuarioRegistroPageModule)},
  { path: 'usuario-inicio', loadChildren: () => import('./paginas/usuario-inicio/usuario-inicio.module').then( m => m.UsuarioInicioPageModule)},
  { path: 'administrativo-inicio', loadChildren: () => import('./paginas/administrativo-inicio/administrativo-inicio.module').then( m => m.AdministrativoInicioPageModule)},
  { path: 'usuario-detalle', loadChildren: () => import('./paginas/usuario-detalle/usuario-detalle.module').then( m => m.UsuarioDetallePageModule)},
  { path: 'recuperar', loadChildren: () => import('./paginas/recuperar/recuperar.module').then( m => m.RecuperarPageModule)},
  { path: 'token-correo/:id', loadChildren: () => import('./paginas/token-correo/token-correo.module').then( m => m.TokenCorreoPageModule)},
  { path: 'cambio-contrasena/:id', loadChildren: () => import('./paginas/cambio-contrasena/cambio-contrasena.module').then( m => m.CambioContrasenaPageModule)},
  { path: 'ingresar-codigo-puntos', loadChildren: () => import('./paginas/ingresar-codigo-puntos/ingresar-codigo-puntos.module').then( m => m.IngresarCodigoPuntosPageModule)},
  { path: 'ingresar-codigo-usuario', loadChildren: () => import('./paginas/ingresar-codigo-usuario/ingresar-codigo-usuario.module').then( m => m.IngresarCodigoUsuarioPageModule)},
  { path: 'generar-codigo-canjeo', loadChildren: () => import('./paginas/generar-codigo-canjeo/generar-codigo-canjeo.module').then( m => m.GenerarCodigoCanjeoPageModule)},
  { path: 'ingresar-codigo-canjeo', loadChildren: () => import('./paginas/ingresar-codigo-canjeo/ingresar-codigo-canjeo.module').then( m => m.IngresarCodigoCanjeoPageModule)},
  { path: 'administrador-inicio', loadChildren: () => import('./paginas/administrador-inicio/administrador-inicio.module').then( m => m.AdministradorInicioPageModule)},
  { path: 'log-usuario-crud', loadChildren: () => import('./paginas/log-usuario-crud/log-usuario-crud.module').then( m => m.LogUsuarioCrudPageModule)},
  { path: 'log-codigos-canjeo', loadChildren: () => import('./paginas/log-codigos-canjeo/log-codigos-canjeo.module').then( m => m.LogCodigosCanjeoPageModule)},
  { path: 'log-codigos-suma-puntos', loadChildren: () => import('./paginas/log-codigos-suma-puntos/log-codigos-suma-puntos.module').then( m => m.LogCodigosSumaPuntosPageModule)},
  { path: 'administrador-detalle', loadChildren: () => import('./paginas/administrador-detalle/administrador-detalle.module').then( m => m.AdministradorDetallePageModule)},
  { path: 'administrativo-registro', loadChildren: () => import('./paginas/administrativo-registro/administrativo-registro.module').then( m => m.AdministrativoRegistroPageModule)},
  { path: 'log-administrativo-crud', loadChildren: () => import('./paginas/log-administrativo-crud/log-administrativo-crud.module').then( m => m.LogAdministrativoCrudPageModule)},
  { path: 'administrativo-detalle', loadChildren: () => import('./paginas/administrativo-detalle/administrativo-detalle.module').then( m => m.AdministrativoDetallePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
