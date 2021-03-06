import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, IonSlides } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceData } from '../../providers/conference-data';
import { LoadingController, ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import comida from "../../../assets/data/data.json";
@Component({
  selector: 'app-media-manana',
  templateUrl: './media-manana.page.html',
  styleUrls: ['./media-manana.page.scss'],
})
export class MediaMananaPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slideNext: 1,
  };
  //ngAfterViewInit()----------------------------------------------------------------------------------
  editar1: boolean = true;
  editar2: boolean = true;
  comida: any[] = comida;
  programa: any;
  menjars: any;
  titulo: String;
  about: String;
  about2: String;
  about_kcal: number = 0;
  about2_kcal: number = 0;
  total: any;
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  constructor(private router: Router, public alertController: AlertController, public loadingController: LoadingController, private db: AngularFirestore, private authservice: AuthService, public confData: ConferenceData,) { }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value)
      ;
    this.slides.lockSwipes(false);
    if (ev.detail.value == "macros") {
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);

    } else if (ev.detail.value == "kcal") {
      this.slides.slideTo(0);
      this.slides.lockSwipes(true);

    }
  }

  ngOnInit() {
    this.slides.lockSwipes(true);

    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));

          this.programa = doc.get("Programa_Escollit")
          this.menjars = doc.get("Menjars");

          if (this.programa == "Tonificar") {
            this.Tonificar();
          }
          else if (this.programa == "Musculacion") {
            this.Musculacion();
          }
          else if (this.programa == "Adelgazar") {
            this.Adelgazar();
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
    this.Mostrar();
  }
  Mostrar() {
    this.descripciones1();

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Media_Ma??ana");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.about_kcal = doc.get("About");
          this.about2_kcal = doc.get("About2");
          this.total = doc.get("Total");



        } else {
          console.log("No such document!");
        }
      })
    })
  }
  descripciones1() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      var docRef = this.db.collection("users").doc(uid).collection("Comidas").doc("Media_Ma??ana");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.about = doc.get("About");
          this.about2 = doc.get("About2");



        } else {
          console.log("No such document!");
        }
      })
    })
  }
  total_kcal() {
    this.total = this.about_kcal + this.about2_kcal;
    if (this.about_kcal >= 0 && this.about2_kcal >= 0) {


    } else {
      this.presentAlert();

    }
  }
  Tonificar() {
    this.about = (comida.tonificar[1].about);
    this.about2 = (comida.tonificar[1].about2);
  }
  Adelgazar() {
    this.about = (comida.adelgazar[1].about);
    this.about2 = (comida.adelgazar[1].about2);

  }
  Musculacion() {
    this.about = (comida.muscular[1].about);
    this.about2 = (comida.muscular[1].about2);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: 'El valor no puede ser negativo',
      buttons: ['OK']
    });
    this.about_kcal = 0;
    this.about2_kcal = 0;
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
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
  guardarKcal() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Kcal").doc("Media_Ma??ana").update({

        Total: this.total,
        About: this.about_kcal,
        About2: this.about2_kcal
      })
    })
  }
  editarBase2() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Comidas").doc("Media_Ma??ana").update({


        About2: this.about2
      })
    })
    this.presentAlert1();

  }
  editarBase1() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Comidas").doc("Media_Ma??ana").update({

        About: this.about
      })
    })
    this.presentAlert1();

  }
  confirm2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.editarBase2())
      }, 2);
      this.editar2 = true;
    });
  }
  confirm1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.editarBase1())
      }, 2);
      this.editar1 = true;

    });
  }
  async presentAlert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Guardada!',
      message: 'Se ha guardado correctamente la comida',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  async error() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      message: 'No se ha podido guardar',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
