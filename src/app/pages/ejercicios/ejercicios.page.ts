import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import tonificar from "../../files/tonificacion.json";
import tonificar2 from "../../files/tonificacion2.json";
import tonificar3 from "../../files/tonificacion3.json";
import adelgazar from "../../files/adelgazar.json";
import adelgazar2 from "../../files/adelgazar2.json";
import adelgazar3 from "../../files/adelgazar3.json";
import musculacion from "../../files/musculacion.json";
import musculacion2 from "../../files/musculacion2.json";
import musculacion3 from "../../files/musculacion3.json";

import ejercicios_p from "../../files/personalizado.json";
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss'],
})
export class EjerciciosPage implements OnInit {
  ejerciciosList:[];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slideNext: 1,
  };
  name_N: String;
  duracion_N: String;
  series_N: String;
  email: any;
  ejercicios: boolean;
  show: boolean = true;
  showM: boolean = false;
  showN: boolean = true;
  numero_entrenos: number;
  programa: String;
  showC: boolean = false;
  showB: boolean = true;
  showI: boolean = false;
  mylist: Array<object> = [];
  nom: String;
  duracion: String;
  series: String;
  Entr_predeterminados: string;
  playing: boolean = false;
  exercicis: boolean;

  constructor(private route: ActivatedRoute, public loadingController: LoadingController, private ngZone: NgZone, @Inject(DOCUMENT) private _document: Document, private db: AngularFirestore, public toastController: ToastController, private authservice: AuthService, private router: Router) {

  }

  ionViewWillEnter() {
    this.Mostrar();
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));

          this.exercicis = doc.get("Exercicis");
          if (this.exercicis = true) {
            this.showM = false;
            this.show = true;
          } else {
            this.showM = false;
            this.show = true;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! AAA");
        }
      })
    })
  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));

          this.programa = doc.get("Programa_Escollit");
          this.numero_entrenos = doc.get("Entrenos_P");
          if (this.programa == "Personalizado") {
            this.showB = true;
            this.ejerciciosList = ejercicios_p;
            this.showN = false;
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! AAA");
        }
      })
    })

    /*this.ejerciciosList.filter*/
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));

          this.programa = doc.get("Programa_Escollit")
          this.ejercicios = doc.get("Exercicis");

          if (this.programa == "Tonificar") {
            this.ejerciciosList = tonificar2;
            this.Entr_predeterminados = "Entr. Tonificar"
          }
          else if (this.programa == "Adelgazar") {
            this.ejerciciosList = adelgazar2;
            this.Entr_predeterminados = "Entr. Adelgazar"
          } else if (this.programa == "Musculacion") {
            this.ejerciciosList = musculacion2;
            this.Entr_predeterminados = "Entr. Musculacion"
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! A");
        }
      })
    })

  }

  onChange($event) {
    if (this.ejerciciosList == tonificar2 || this.ejerciciosList == tonificar || this.ejerciciosList == tonificar3) {


      var nivel = $event.target.value;
      if (nivel == "p") {
        this.ejerciciosList = tonificar
      }
      else if (nivel == "m") {
        this.ejerciciosList = tonificar2
      }
      else if (nivel == "pro") {
        this.ejerciciosList = tonificar3

      }
    } else if (this.ejerciciosList == musculacion2 || this.ejerciciosList == musculacion || this.ejerciciosList == musculacion3) {
      var nivel = $event.target.value;
      if (nivel == "p") {
        this.ejerciciosList = musculacion
        this.presentLoading()
      }
      else if (nivel == "m") {
        this.ejerciciosList = musculacion2
        this.presentLoading()

      }
      else if (nivel == "pro") {
        this.ejerciciosList = musculacion3
        this.presentLoading()

      }
    }
    else if (this.ejerciciosList == adelgazar2 || this.ejerciciosList == adelgazar || this.ejerciciosList == adelgazar3) {
      var nivel = $event.target.value;
      if (nivel == "p") {
        this.ejerciciosList = adelgazar
        this.presentLoading()

      }
      else if (nivel == "m") {
        this.ejerciciosList = adelgazar2
        this.presentLoading()

      }
      else if (nivel == "pro") {
        this.ejerciciosList = adelgazar3
        this.presentLoading()


      }
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 100
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  fet() {

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      /*
      const dbRef = firebase.database().ref("users");
      const newPicture = dbRef.child(uid);
      newPicture.update({
        Exercicis: true,
      })*/
      // User logged in already or has just logged in.
      this.db.collection('users').doc(uid).update({

        Exercicis: true,

      })
    });
    this.showM = true;
    this.show = false;

  }
  no_fet() {
    this.showM = false;
    this.show = true;
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;


      /*const dbRef = firebase.database().ref("users");
      const newPicture = dbRef.child(uid);
      newPicture.update({
        Exercicis: false,
      })*/
      // User logged in already or has just logged in.
      this.db.collection('users').doc(uid).update({

        Exercicis: false,

      })
    });
  }
  fet_ex() {
    this.presentToast();
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hecho!',
      duration: 500
    });
    toast.present();
  }
  agregar() {
    this.showI = true
  }
  borrar() {

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      // User logged in already or has just logged in.



      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          this.numero_entrenos = doc.get("Entrenos_P");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }

        for (let i = 0; i <= this.numero_entrenos; i++) {



          this.db.collection('users').doc(uid).collection("E_Personal").doc("Entrenamiento " + i).delete().then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        }
        //borra entrenos p

        this.db.collection('users').doc(uid).update({

          Entrenos_P: 0,


        })
      });
    })
    this.mylist = [];


  }
  mostrar_Entrenament() {
    this.mylist.push({ name: this.name_N, duracion: this.duracion_N, sets: this.series_N });
    this.showI = false;
    this.mostrar_BD();
  }
  kcal(){
    this.mylist=this.ejerciciosList
    this.mylist.push({kcal:"aa"})
    console.log(this.mylist)
  }
  mostrar_BD() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          this.numero_entrenos = doc.get("Entrenos_P");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! A");
        }
        this.numero_entrenos++;
        this.db.collection('users').doc(uid).collection("E_Personal").doc("Entrenamiento " + this.numero_entrenos).set({

          Name: this.name_N,
          Duracion: this.duracion_N,
          Series: this.series_N

        })
        this.db.collection('users').doc(uid).update({

          Entrenos_P: this.numero_entrenos,

        })

      })

    })
  }
  Mostrar() {
    this.mylist = [];

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          this.numero_entrenos = doc.get("Entrenos_P");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document! A");
        }
        for (let i = 1; i <= this.numero_entrenos; i++) {
          const uid = user.uid;
          console.log(uid)

          var docRef = this.db.collection("users").doc(uid).collection("E_Personal").doc("Entrenamiento " + i);

          docRef.get().subscribe((doc) => {
            if (doc.exists) {


              this.name_N = doc.get("Name");
              this.duracion_N = doc.get("Duracion");
              this.series_N = doc.get("Series");

              this.mylist.push({ name: this.name_N, duracion: this.duracion_N, sets: this.series_N });

            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })

        }

      })
    })
  }
}
