import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { ConferenceData } from '../../providers/conference-data';
import { LoadingController, ToastController } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { element } from 'protractor';
@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.page.html',
  styleUrls: ['./comidas.page.scss'],
})
export class ComidasPage {
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  fruit: number;
  ShowReload: boolean = false;
  Dieta: boolean;
  speakers: any[] = [];
  Drop: boolean = false;
  tonificar: any[] = [];
  programa: any;
  show: boolean = true;
  showM: boolean = false;
  menjars: boolean;
  mylist: Array<object> = [];
  showI: boolean = false;
  titol: string;
  descripcio: string;
  numero_M: number;
  Comidas_predeterminadas: string;
  datoUsuario: any;
  kcals =[]
  desayuno:any;
  media_manana:any;
  comida:any;
  merienda:any;
  cena:any;
  Total:number;

  constructor(private router: Router, public alertController: AlertController, public loadingController: LoadingController, private db: AngularFirestore, private authservice: AuthService, public confData: ConferenceData,) { }

  ionViewWillEnter(){
    

  }
  ionViewDidEnter(){
    this.get_kcals();
  }
  get_kcals(){
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Desayuno");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.desayuno = doc.get("Total");
        } else {
          console.log("No such document!");
        }
      })
      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Media_Mañana");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.media_manana = doc.get("Total");
        } else {
          console.log("No such document!");
        }
      })
      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Comida");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.comida = doc.get("Total");
        } else {
          console.log("No such document!");
        }
      })
      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Merienda");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.merienda = doc.get("Total");
        } else {
          console.log("No such document!");
        }
      })
      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Cena");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.cena = doc.get("Total");
        } else {
          console.log("No such document!");
        }
        console.log(this.desayuno, this.media_manana, this.comida, this.merienda, this.cena + "ayeeeeeee")
        this.kcals.push(this.desayuno, this.media_manana, this.comida, this.merienda, this.cena)
        this.Total=this.desayuno+ this.media_manana+ this.comida+ this.merienda+ this.cena
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

          this.programa = doc.get("Programa_Escollit")
          this.menjars = doc.get("Menjars");
          if (this.menjars == true) {
            this.showM = true;
            this.show = false;
          } else {
            this.showM = false;
            this.show = true;
          }
          if (this.programa == "Tonificar") {
            this.confData.getTonificar().subscribe((speakers: any[]) => {
              this.speakers = speakers;
              this.Comidas_predeterminadas = "Dieta Tonificacion"
            });
          }
          else if (this.programa == "Musculacion") {
            this.confData.getMuscular().subscribe((speakers: any[]) => {
              this.speakers = speakers;
              this.Comidas_predeterminadas = "Dieta Muscular"
            });
          }
          else if (this.programa == "Adelgazar") {
            this.confData.getAdelgazar().subscribe((speakers: any[]) => {
              this.speakers = speakers;
              this.Comidas_predeterminadas = "Dieta Adelgazar"
            });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
    this.Mostrar();
    this.dieta();
    this.Mostrar_Kcal();

  }
  Mostrar_Kcal() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      var docRef = this.db.collection("users").doc(uid).collection("Kcal").doc("Desayuno");

      docRef.get().subscribe((doc) => {
        if (doc.exists) {


        } else {
          console.log("No such document!");
        }
      })
    })
  }
  console() {
    this.Drop = !this.Drop;
    if (this.Drop = false) {
      (console.log("nada"))
    } else {
      console.log("aye")
    }

  }

  reload() {
    this.presentLoading();
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
    window.location.reload()
  }
  test(speakers) {
    this.ShowReload = true
    this.speakers.splice(this.speakers.indexOf(speakers), 1)
    console.log(speakers)
  }
  dieta() {

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {

          this.Dieta = doc.get("Dieta")
          console.log(this.Dieta)

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
  }
  fet() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      /*
      const dbRef = firebase.database().ref("users");
      const newPicture = dbRef.child(uid);
      newPicture.update({
        Menjars: true,
      })*/
      // User logged in already or has just logged in.
      this.db.collection('users').doc(uid).update({

        Menjars: true,

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
        Menjars: false,
      })*/
      // User logged in already or has just logged in.
      this.db.collection('users').doc(uid).update({

        Menjars: false,

      })
    });
  }
  agregar_Menjar() {
    this.titol = (<HTMLInputElement>document.getElementById("nom")).value;
    this.descripcio = (<HTMLInputElement>document.getElementById("descripcion")).value;
    this.showI = false
    this.mostrar_Menjar();
    this.mostrar_BD()
  }
  mostrar_Menjar() {
    this.mylist.push({ Nom: this.titol, Descripcio: this.descripcio });
  }
  mostrar_BD() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          this.numero_M = doc.get("Menjar_P");
          console.log(this.numero_M)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        this.numero_M++;
        this.db.collection('users').doc(uid).collection("M_Personal").doc("Menjar " + this.numero_M).set({

          Nom: this.titol,
          Descripcio: this.descripcio

        })
        this.db.collection('users').doc(uid).update({

          Menjar_P: this.numero_M,

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
          this.numero_M = doc.get("Menjar_P");
          console.log(this.numero_M)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        for (let i = 1; i <= this.numero_M; i++) {
          const uid = user.uid;
          console.log(uid)

          var docRef = this.db.collection("users").doc(uid).collection("M_Personal").doc("Menjar " + i);

          docRef.get().subscribe((doc) => {
            if (doc.exists) {


              this.titol = doc.get("Nom");
              this.descripcio = doc.get("Descripcio");

              this.mylist.push({ Nom: this.titol, Descripcio: this.descripcio });

            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })

        }

      })
    })
  }
  borrar() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          this.numero_M = doc.get("Menjar_P");
          console.log(this.numero_M)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        for (let i = 0; i <= this.numero_M; i++) {



          this.db.collection('users').doc(uid).collection("M_Personal").doc("Menjar " + i).delete().then(() => {
            console.log("Document successfully deleted!");
          }).catch((error) => {
            console.error("Error removing document: ", error);
          });
        }
        this.db.collection('users').doc(uid).update({

          Menjar_P: 0,

        })

      })
    })
    this.mylist = [];
  }
  botoSkip() {
    this.slides.slideNext();
  }
  botoBack() {
    this.slides.slidePrev();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      message: 'Si seleccionas esta dieta, FitnessDay te va a programar una dieta preestablecida segun tu programa',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'SI',
          handler: () => {
            console.log('Confirm Okay');
            firebase.auth().onAuthStateChanged((user) => {
              const uid = user.uid;

              this.db.collection('users').doc(uid).update({

                Dieta: false,

              })
            });
            this.Dieta = false;
          }
        }
      ]
    });

    await alert.present();
  }
  async info() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Información',
      message: 'La sección comidas podras ver las dietas que necesitarias hacer diariamente dependiendo de tu programa, siempre pudiendo agregar o eliminar nuevas comidas que tu desees! Una vez completadas confirmalo con el boton HECHO',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          cssClass: 'aye',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }

      ]
    });

    await alert.present();
  }
  aye(){
    var container: HTMLDivElement;
    container.style.color="blue"
  }
}
