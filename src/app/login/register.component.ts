import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  constructor( private usuarioService: UsuarioService,
               private router: Router ) { }

  ngOnInit() {
    init_plugins();

    this.myForm = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [ Validators.required, Validators.email ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2') });


    this.myForm.setValue({
      nombre: 'Test',
      email: 'Test@test.com',
      password: 'Test',
      password2: 'Test',
      condiciones: true
    });
  }

  registrarUsuario() {
    if ( this.myForm.invalid ) {
      return;
    }

    if ( !this.myForm.value.condiciones ) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    console.log(this.myForm.value);
    const usuario = new Usuario(
      this.myForm.value.nombre,
      this.myForm.value.email,
      this.myForm.value.password
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe( resp => this.router.navigate(['/login']));
  }

  sonIguales( campo1: string, campo2: string ) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return{
        sonIguales: true
      };
    };
  }

}
