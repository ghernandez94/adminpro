import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;

  constructor(private router: Router,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  ingresar( myForm: NgForm ) {

    if (myForm.invalid) {
      return;
    }

    const usuario: Usuario = new Usuario(null, myForm.value.email, myForm.value.password);
    this.usuarioService.login( usuario, this.recuerdame )
      .subscribe( resp => this.router.navigate(['dashboard']) );
  }

  googleInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '839019677534-ifp7ktrhpfs4n11t2u2q93epnv11ra93.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })
      .then( resp => {
          this.auth2 = resp;
          this.attachSignin(document.getElementById('btnGoogle'));
        }
      )
      .catch( err => console.log('Ocurrió un error en la autenticación con Google', err) );
    });

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token)
        .subscribe( resp => window.location.href = '/dashboard' );
    });
  }
}
