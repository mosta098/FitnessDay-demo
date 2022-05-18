import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

export var data: any;
export var options: any;
export var chart: any;
export var dia: any;
export var peso: any;
export var pesoInicial: any;
export var j: any;
export var i: number = 0;
declare var google: any;


@Component({
  selector: 'app-peso',
  templateUrl: './peso.page.html',
  styleUrls: ['./peso.page.scss'],
})
export class PesoPage implements OnInit {
  peso_actual: number;
  peso_objetivo: number;
  peso_inicial: number;
  show: boolean = false;
  show2: boolean = false;
  show3: boolean = false;
  peso_array: Array<object> = [];
  dia: any;
  ;

  constructor(private db: AngularFirestore, public loadingController: LoadingController, private authservice: AuthService, public toastController: ToastController) { }
  ionViewWillEnter() { 
    firebase.auth().onAuthStateChanged(user => {
      const uid = user.uid;
      console.log(uid)

      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.get("email"));
          this.peso_actual = doc.get("pes_Actual");
          this.peso_inicial = doc.get("pes_Inicial");
          pesoInicial = doc.get("pes_Inicial");
          this.peso_objetivo = doc.get("pes_Objectiu");
          dia = doc.get("dia");
          this.dia = doc.get("dia");
          if (this.peso_actual == this.peso_objetivo) {
            this.presentToast2();
          } else {

          }
          if (this.peso_actual == 0 && this.peso_inicial == 0 && this.peso_objetivo == 0) {
            this.presentToast();
          } else {

          }
          if (this.peso_actual == this.peso_objetivo) {
            document.getElementById("peso_actual").setAttribute("color", "success")
          } else {


          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        firebase.auth().onAuthStateChanged((user) => {
          const uid = user.uid;
          for (j = 1; j <= dia; j++) {

            var docRef = this.db.collection('users').doc(uid).collection("Historial").doc("" + j)


            docRef.get().subscribe((doc) => {
              if (doc.exists) {


                peso = doc.get("Peso");
                dia = doc.get("Dia");
                this.DB_peso();
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }

            })
          }
          google.charts.load('current', { 'packages': ['corechart'] });
          google.charts.setOnLoadCallback(this.drawChart);
        })

      })
    })
  }
  ngOnInit() {


    

  }
  Show() {
    this.show = true;
  }
  Show2() {
    this.show2 = true;
  }
  Show3() {
    this.show3 = true;
  }
  Peso_actual() {


    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          pes_Actual: this.peso_actual
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          pes_Actual: this.peso_actual
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      var docRef = this.db.collection("users").doc(uid);

      this.db.collection('users').doc(uid).collection("Historial").doc("" + this.dia).set({

        Peso: this.peso_actual,
        Dia: this.dia,



      })
    })

    this.show2 = false;
  }
  Peso_inicial() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          pes_Inicial: this.peso_inicial
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          pes_Inicial: this.peso_inicial
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    this.show = false;
  }
  Peso_objetivo() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          pes_Objectiu: this.peso_objetivo
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          pes_Objectiu: this.peso_objetivo
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    this.show3 = false;
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Pulse en editar para modificar el peso',
      duration: 5000
    });
    toast.present();
  }
  async presentToast2() {
    const toast = await this.toastController.create({
      message: 'Felicidades tu peso equivale a tu objetivo',
      duration: 5000
    });
    toast.present();
  }



  drawChart() {
    data = google.visualization.arrayToDataTable([
      ['Dia', 'Peso'],
      ['0', pesoInicial],

    ]);




    options = {
      title: 'Peso',
      hAxis: { title: 'Dia', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 }
    };

    chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);







  }
  DB_peso() {
    i++;
    data.addRows([
      ["" + dia, peso],
    ]);

    chart.draw(data, options);

  }
  updateChart() {

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
}
