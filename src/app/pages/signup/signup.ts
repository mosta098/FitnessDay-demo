import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;
  public email: string="";

  public password: string="";
  public name: string="";
  constructor(
    public router: Router,
    public userData: UserData,private auth : AuthService
  ) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.signup(this.signup.username);
    }
  }
  OnSubmitRegister(){
    this.submitted = true;
    this.auth.register(this.email, this.password, this.name).then(()=>{
      
      this.userData.signup(this.signup.username);
    }).catch(err=> alert("ja esta registrat o correu invalid"))
  }
      
  loginGoogle(){

    this.auth.loginWithGoogle().then( ()=>{
      this.userData.signup(this.signup.username);
      this.router.navigate(['/app/tabs/speakers']);
    }).catch(err=>{
      alert("Datos incorrectos o no existe usuario");
    })
  }
}
