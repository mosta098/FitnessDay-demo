import { AfterViewInit, Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service";

import { AlertController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';

import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  username: string;
  email: string;
  programa: string;
  showS: boolean = false
  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userData: UserData, private db: AngularFirestore, private authservice: AuthService, public loadingController: LoadingController
  ) { }


  ngOnInit() {

    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));
          this.email = doc.get("email");
          this.username = doc.get("name");
          this.programa = doc.get("Programa_Escollit")
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
  }
  OnlogOut() {
    this.authservice.logout();
  }
  onChange($event) {
    console.log($event.target.value)
    var programa = $event.target.value;
    if (programa == "p") {
      this.programa = "Personalizado"
      this.presentLoading()
    }
    else if (programa == "m") {
      this.programa = "Musculacion"
      this.presentLoading()

    }
    else if (programa == "t") {
      this.programa = "Tonificar"
      this.presentLoading()

    }
    else if (programa == "a") {
      this.programa = "Adelgazar"
      this.presentLoading()

    }
    this.showS=false
    this.Canvi_BD();
  }
  Canvi_BD() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;


      /*const dbRef = firebase.database().ref("users");
      const newPicture = dbRef.child(uid);
      newPicture.update({
        Programa_Escollit:this.programa,
      })*/
      // User logged in already or has just logged in.
      this.db.collection('users').doc(uid).update({

       Programa_Escollit:this.programa,

      })
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Actualizando, por favor espere...',
      duration: 300
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
    window.location.reload();
  }
}


