import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserOptions } from '../../interfaces/user-options';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  signup: UserOptions = { username: '', password: '' };
  username: string;
  email: string;
  password: string;
  constructor(private authService: AuthService,
    public userData: UserData, private google: GooglePlus, private authservice: AuthService, private AFauth: AngularFireAuth, public router: Router
  ) { }

  OnSubmitLogin() {
    this.authservice.login(this.email, this.password).then(res => {
      this.router.navigate(['/app/tabs/speakers']);
      this.userData.signup(this.signup.username);
    }).catch(err => alert("los datos son incorrectos o no existe usuario"))
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
  loginGoogle() {
    this.authService.loginWithGoogle().then(() => {
      
      
      this.userData.signup(this.signup.username);
    }).catch(err => {
      alert("Datos incorrectos o no existe usuario");
    })
  }
}
