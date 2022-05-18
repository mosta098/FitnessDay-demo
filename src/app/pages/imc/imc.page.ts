import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.page.html',
  styleUrls: ['./imc.page.scss'],
})
export class IMCPage implements OnInit {
  peso_actual: number;
  imc_actual:number;
  imc_inicial:number;
  imc_objetivo:number;
  altura:number;
  numb:number
  show:boolean=false;
  constructor(private db: AngularFirestore, private authservice:AuthService,public toastController: ToastController) { }
  ionViewWillEnter() {
    
    firebase.auth().onAuthStateChanged(user => {
      const uid=user.uid;
      console.log(uid)
    
      var docRef = this.db.collection("users").doc(uid);

      docRef.get().subscribe((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.get("email"));
              this.peso_actual=doc.get("pes_Actual");
              this.altura=doc.get("Altura");
              this.imc_actual=doc.get("IMC_Actual");
              this.imc_inicial=doc.get("IMC_Inicial");
              this.imc_objetivo=doc.get("IMC_Objectiu");
              
              this.calculoIMC(this.peso_actual,this.altura);
              if (this.imc_inicial==0) {
                this.imc_inicial=this.imc_actual;
                this.imc_Inicial();
              }else{
                
              }
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      })
    })
  }
  ngOnInit() {
  }
  imc_Inicial() {
    
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        console.log(this.imc_actual+" ayeee");
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          
          
          IMC_Inicial: this.imc_actual
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          IMC_Inicial: this.imc_actual
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
  
  }
  calculoIMC(peso,altura) {
      console.log("peso "+peso,"altura " +altura);
      altura=altura*altura;
      this.imc_actual=peso/altura;
      this.imc_actual=this.imc_actual*10000;
       var numb = this.imc_actual.toFixed(2);
       
      this.imc_actual=parseInt(numb);
      console.log(this.imc_actual);
      if (this.imc_actual==this.imc_objetivo) {
        this.presentToast();
      } else {
        
      }
      this.modificacion_Imc();
  }
  modificacion_Imc() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          IMC_Actual: this.imc_actual
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          IMC_Actual: this.imc_actual
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    
  }
  modificacion_Imc_Objectiu() {
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          IMC_Objectiu: this.imc_objetivo
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          IMC_Objectiu: this.imc_objetivo
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    this.show=false;
  }
  doRefresh(event) {
    console.log('Begin async operation');
    
    setTimeout(() => {window.location.reload() 
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  Show(){
    this.show=true;
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Felicidades tu IMC equivale a tu objetivo!!!',
      duration: 3000
    });
    toast.present();
  }
}
