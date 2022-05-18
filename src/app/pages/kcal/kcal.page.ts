import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-kcal',
  templateUrl: './kcal.page.html',
  styleUrls: ['./kcal.page.scss'],
})
export class KcalPage implements OnInit {
  years: number;
  peso: number;
  genero: String;
  ejercicio_value: number;
  ejercicio: number;
  altura: number;
  resultado:number ;
  showProgressBar: boolean = false;
  datoUsuario: any;
  constructor(public alertController: AlertController,private db: AngularFirestore, private authservice: AuthService) { }

  ngOnInit() {
  }
  onChangeGenero($event) {
    this.genero = $event.target.value;

  }
 
  onChangeEjercicio($event) {
    this.ejercicio_value = $event.target.value;
    if (this.ejercicio_value == 0) {
      this.ejercicio = 1.2;
    }
    else if (this.ejercicio_value == 1) {
      this.ejercicio = 1.375;
    }
    else if (this.ejercicio_value == 2) {
      this.ejercicio = 1.55;
    }
    else if (this.ejercicio_value == 3) {
      this.ejercicio = 1.725;
    }
    else if (this.ejercicio_value == 4) {
      this.ejercicio = 1.9;
    }
  }
  calculo(resultado) {
    console.log(this.years, this.peso, this.genero, this.ejercicio, this.altura)
    if (this.years < 1 || this.peso < 1 || this.genero == undefined || this.ejercicio == undefined || this.altura < 1) {
      alert("Llena correctamente los campos")
    } else {

      if (this.genero == "Hombre") {
        resultado = (66 + (13.7 * this.peso)) + ((5 * this.altura) - (6.8 * this.years)) * this.ejercicio;
        console.log(resultado);
        this.resultado = Math.round(resultado*100)/100;
      } else if (this.genero == "Mujer") {
        resultado = (665 + (9.6 * this.peso)) + ((1.8 * this.altura) - (4.7 * this.years)) * this.ejercicio;
        console.log(resultado)
        this.resultado = Math.round(resultado*100)/100;
      }

    }
  }
  guardarKcal() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        this.db.collection('users').doc(uid).update({

          Kcal: this.resultado
        })

      } else {
      }
    })

  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Guardar',
      message: 'Desea guardar estas kcal como rutina diaria?',
      buttons: [
        {
          text: 'No',
          role: 'No',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.guardarKcal();
          }
        }
      ]
    });

    await alert.present();
  }
}
