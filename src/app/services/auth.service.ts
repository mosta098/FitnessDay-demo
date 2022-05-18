
import { Injectable } from '@angular/core';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { UserData } from '../providers/user-data';
import { UserOptions } from '../interfaces/user-options';
import { environment } from '../../environments/environment';
import { FirebaseApp } from '@angular/fire';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  picture: string;
  name: string;
  email: string;
  nivel:number;
  
  constructor(private platform: Platform,private google: GooglePlus,private userData: UserData, private AFauth: AngularFireAuth,private router: Router, private db: AngularFirestore, public alertController: AlertController) { }


  async loginWithGoogle() {




    /*return this.google.login({}).then(result=>{
       const user_data_google = result;
       this.AFauth.auth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accesToken))
     })*/



    if (this.platform.is('cordova')) {
      this.nativeGoogleLogin();
    } else {
      this.webGoogleLogin();
    }

  }
  async webGoogleLogin() {
    const res = await this.AFauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
     const user = res.user;
     console.log(user.uid);
     
 
     
       var docRef = this.db.collection("users").doc(user.uid);
 
       docRef.get().subscribe((doc) => {
           if (doc.exists) {
               console.log("Document data:", doc.get("nivel"));
               this.nivel=doc.get("nivel");
               this.router.navigate([`/app/tabs/calendario`]);
           } else {
               // doc.data() will be undefined in this case
               console.log("No such document!");
               this.db.collection("users").doc(user.uid).set({
      
                 email:user.email,
                 id: user.uid,
                 name: user.displayName,
                 pes_Inicial: 0,
                 pes_Actual: 0,
                 pes_Objectiu:0,
                 IMC_Inicial: 0,
                 IMC_Actual: 0,
                 IMC_Objectiu:0,
                 Programa_Escollit: "",
                 Altura: 0,
                 mides: "",
                 dia:1,
                 Menjars:false,
                 Exercicis:false,
                 Entrenos_P:0,
                 Menjar_P:0,
                 Dieta: false,
                 Dark:true
                 
           
             })
             
             /*const dbRef = firebase.database().ref("users");  //users
       firebase.auth().onAuthStateChanged(() => {
         const newPicture = dbRef.child(user.uid);
         newPicture.update({
                 email:user.email,
                 id: user.uid,
                 name: user.displayName,
                 pes_Inicial: 0,
                 pes_Actual: 0,
                 pes_Objectiu:0,
                 IMC_Inicial: 0,
                 IMC_Actual: 0,
                 IMC_Objectiu:0,
                 Programa_Escollit: "",
                 Altura: 0,
                 mides: "",
                 dia:1,
                 Menjars:false,
                 Exercicis:false,
                 Entrenos_P:0,
                 Menjar_P:0
                 
 
         })
       })
 */
firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;
        var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").set({
  
        
  
      })
    })
       this.router.navigate([`../program-selector`]);
           }
       })
       
      
  } 
  async nativeGoogleLogin() {
   /* return this.google.login({}).then(result=>{
      const user_data_google = result;
      return this.AFauth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(null,user_data_google.accessToken))
    })*/
    try {
      const gplusUser = await this.google.login({
        'webClientId': environment.googleWebClientId,
        'offline': true,
        'scopes': 'profile email',
      }) 
      const user= (await this.AFauth.signInWithCredential(
        firebase.auth.GoogleAuthProvider.credential(null,gplusUser.accessToken)
      )).user;                                                                             /*(await this.AFauth.sign(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))).user;*/
      var docRef = this.db.collection("users").doc(user.uid);
 
      docRef.get().subscribe((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.get("nivel"));
              this.nivel=doc.get("nivel");
              this.router.navigate([`/app/tabs/calendario`]);
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
              this.db.collection("users").doc(user.uid).set({
     
                email:user.email,
                id: user.uid,
                name: user.displayName,
                pes_Inicial: 0,
                pes_Actual: 0,
                pes_Objectiu:0,
                IMC_Inicial: 0,
                IMC_Actual: 0,
                IMC_Objectiu:0,
                Programa_Escollit: "",
                Altura: 0,
                mides: "",
                dia:1,
                Menjars:false,
                Exercicis:false,
                Entrenos_P:0,
                Menjar_P:0,
                Dieta: false,
                Dark:true
                
          
            })
            
            /*const dbRef = firebase.database().ref("users");  //users
      firebase.auth().onAuthStateChanged(() => {
        const newPicture = dbRef.child(user.uid);
        newPicture.update({
                email:user.email,
                id: user.uid,
                name: user.displayName,
                pes_Inicial: 0,
                pes_Actual: 0,
                pes_Objectiu:0,
                IMC_Inicial: 0,
                IMC_Actual: 0,
                IMC_Objectiu:0,
                Programa_Escollit: "",
                Altura: 0,
                mides: "",
                dia:1,
                Menjars:false,
                Exercicis:false,
                Entrenos_P:0,
                Menjar_P:0
                

        })
      })
*/
firebase.auth().onAuthStateChanged((user) => {
       const uid = user.uid;
       var docRef = this.db.collection("users").doc(uid);
     this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").set({
 
       
 
     })
   })
      this.router.navigate([`../program-selector`]);
          }
      })
      
    
    } catch(err){
      console.log(err)

    } 
  }
             
  
  login(email: string, password: string) {

    return new Promise((resolve, rejected) => {

      firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

        resolve(res)

      }).catch(err => rejected(err));

    })


  }
  logout() {
    this.userData.logout();
    this.google.logout();
    firebase.auth().signOut().then(() => {
      this.presentAlert();
      this.router.navigate([`\login`]);
    })
  }
  

  register(email: string, password: string, name: string) {
    
    
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;
        var docRef = this.db.collection("users").doc(uid);
      this.db.collection('users').doc(uid).collection("Medidas").doc("Medida").set({
  
        
  
      })
    })
    /*
      const dbRef = firebase.database().ref("users");  //users
      firebase.auth().onAuthStateChanged((user) => {
        const uid = user.uid;
        const newPicture = dbRef.child(uid);
        newPicture.update({
          name: name,
          email:email,
          id:uid,
          pes_Inicial: 0,
          pes_Actual: 0,
          pes_Objectiu:0,
          IMC_Inicial: 0,
          IMC_Actual: 0,
          IMC_Objectiu:0,
          Programa_Escollit: "",
          Altura: 0,
          mides: "",
          dia:1,
          Menjars:false,
          Exercicis:false,
          Entrenos_P:0,
          Menjar_P:0
        })
      })*/
      firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res)
        const uid = res.user.uid;
        this.db.collection('users').doc(uid).set({

          name: name,
          email:email,
          id:uid,
          pes_Inicial: 0,
          pes_Actual: 0,
          pes_Objectiu:0,
          IMC_Inicial: 0,
          IMC_Actual: 0,
          IMC_Objectiu:0,
          Programa_Escollit: "",
          Altura: 0,
          mides: "",
          dia:1,
          Menjars:false,
          Exercicis:false,
          Entrenos_P:0,
          Menjar_P:0,
          Dieta: false,
          Dark:true
        })
       
        
        
        this.router.navigate([`../program-selector`]);
      }).catch(err => reject(err))
    })
    
    
    

  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Sesion cerrada correctamente',
      buttons: ['Vale']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
