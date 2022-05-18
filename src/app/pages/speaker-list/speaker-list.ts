import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { ConferenceData } from '../../providers/conference-data';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'page-speaker-list',
  templateUrl: 'speaker-list.html',
  styleUrls: ['./speaker-list.scss'],
})
export class SpeakerListPage {
  speakers: any[] = [];
  tonificar: any[] = [];
  programa: any;
  show: boolean = true;
  showM: boolean = false;
  menjars: boolean;
  cedula: string;
  mylist: Array<object> = [];
  showI: boolean = false;
  titol: string;
  descripcio: string;
  numero_M: number;
  Comidas_predeterminadas:string;

  constructor(private router: Router,public confData: ConferenceData, private db: AngularFirestore, private authservice: AuthService) { }

  ionViewDidEnter() {
    
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
              this.Comidas_predeterminadas="Dieta Tonificacion"
            });
          }
          else if (this.programa == "Musculacion") {
            this.confData.getMuscular().subscribe((speakers: any[]) => {
              this.speakers = speakers;
              this.Comidas_predeterminadas="Dieta Muscular"
            });
          }
          else if (this.programa == "Adelgazar") {
            this.confData.getAdelgazar().subscribe((speakers: any[]) => {
              this.speakers = speakers;
              this.Comidas_predeterminadas="Dieta Adelgazar"
            });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    })
    this.Mostrar()

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
    this.showI=false
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
    this.mylist=[];
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
    this.mylist=[];
  }
  reload(){
    
    this.router.navigateByUrl(this.router.url)
  }
}

