import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})

export class ProgressPage implements OnInit {
  peso_actual: number;
  kcal;
  imc_actual: number;
  altura: number;
  show: boolean = false;
  hombro: String;
  cuello: String;
  brazo: String;
  antebrazo: String;
  cadera: String;
  cintura: String;
  pecho: String;
  muslos: String;
  gemelos: String;
  
  show_hombro: boolean = false;
  show_cuello: boolean = false;
  show_brazo: boolean = false;
  show_antebrazo: boolean = false;
  show_cadera: boolean = false;
  show_cintura: boolean = false;
  show_pecho: boolean = false;
  show_muslos: boolean = false;
  show_gemelos: boolean = false;

  customPickerOptions: any;
  customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];

  constructor(private db: AngularFirestore, private authservice: AuthService, public toastController: ToastController) {
    this.customPickerOptions = {
      buttons: [{
        text: 'Guardar',
        handler: () => console.log('Clicked Save!')
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    }
  }
  ionViewWillEnter() {
    this.Mostrar();
    this.ngOnInit();
  }
  Mostrar() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      



      var docRef = this.db.collection("users").doc(uid).collection("Medidas").doc("Medida");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.hombro = doc.get("medida_hombro")
          this.cuello = doc.get("medida_cuello")
          this.brazo = doc.get("medida_brazo")
          this.antebrazo = doc.get("medida_antebrazo")
          this.cadera = doc.get("medida_cadera")
          this.cintura = doc.get("medida_cintura")
          this.pecho = doc.get("medida_pecho")
          this.muslos = doc.get("medida_muslos")
          this.gemelos = doc.get("medida_gemelos")






        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })



    })
  }
  ngOnInit() {
    ///google
   
   






    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));
          this.peso_actual = doc.get("pes_Actual");
          this.altura = doc.get("Altura");
          this.kcal=doc.get("Kcal");
          this.imc_actual = doc.get("IMC_Actual");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
  }
  Show() {
    this.show = true;
  }
  Altura() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        this.db.collection('users').doc(uid).update({

          Altura: this.altura
        })

      } else {
      }
    });
    this.show = false;
    this.presentToast();
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Recuerda actualizar la pagina del IMC para actualizarlo',
      duration: 3000
    });
    toast.present();
  }
  A_Hombro() {
    this.show_hombro = false;
    this.A_Hombro_BD()
  }
  A_Hombro_BD() {
    console.log(this.hombro);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_hombro: this.hombro

      })
    })
  }
  A_Cuello() {
    this.show_cuello = false;
    this.A_Cuello_BD()
  }
  A_Cuello_BD() {
    console.log(this.cuello);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_cuello: this.cuello

      })
    })

  }
  A_Brazo() {
    this.show_brazo = false;
    this.A_Brazo_BD()
  }
  A_Brazo_BD() {
    console.log(this.brazo);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_brazo: this.brazo

      })
    })

  }
  A_Antebrazo() {
    this.show_antebrazo = false;
    this.A_Antebrazo_BD()
  }
  A_Antebrazo_BD() {
    console.log(this.antebrazo);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_antebrazo: this.antebrazo

      })
    })

  }
  A_Cadera() {
    this.show_cadera = false;
    this.A_Cadera_BD()
  }
  A_Cadera_BD() {
    console.log(this.cadera);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_cadera: this.cadera

      })
    })

  }
  A_Cintura() {
    this.show_cintura = false;
    this.A_Cintura_BD()
  }
  A_Cintura_BD() {
    console.log(this.cintura);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_cintura: this.cintura

      })
    })

  }
  A_Pecho() {
    this.show_pecho = false;
    this.A_Pecho_BD()
  }
  A_Pecho_BD() {
    console.log(this.pecho);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_pecho: this.pecho

      })
    })

  }
  A_Muslos() {
    this.show_muslos = false;
    this.A_Muslos_BD()
  }
  A_Muslos_BD() {
    console.log(this.pecho);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_muslos: this.muslos

      })
    })

  }
  A_Gemelos() {
    this.show_gemelos = false;
    this.A_Gemelos_BD()
  }
  A_Gemelos_BD() {
    console.log(this.gemelos);

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").update({

        medida_gemelos: this.gemelos

      })
    })

  }


}
