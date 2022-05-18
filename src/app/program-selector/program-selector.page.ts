import {  OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, IonSlides, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-program-selector',
  templateUrl: './program-selector.page.html',
  styleUrls: ['./program-selector.page.scss'],
})
export class ProgramSelectorPage {
  titol: string = '';
  rutina:string="";
  descripcion:string="";
  @ViewChild('mySlider', { static: true }) slides: IonSlides;
  // Optional parameters to pass to the swiper instance.
  // See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slideNext:1,
  };
  constructor(public alertController: AlertController,private router :Router,public toastController: ToastController,private db: AngularFirestore, private authservice:AuthService) {}

  botoSkip(){
    this.slides.slideNext();
  }
  
  botoSkipPrograma(){
    if(this.titol==""){
      this.presentAlert();
    }else{
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;

      if (user) {
        /*const dbRef = firebase.database().ref("users");
        const newPicture = dbRef.child(uid);
        newPicture.update({
          Programa_Escollit: this.titol
        })*/
        // User logged in already or has just logged in.
        this.db.collection('users').doc(uid).update({

          Programa_Escollit: this.titol
        })

      } else {
        // User not logged in or has just logged out.
      }
    });
    
  }this.router.navigate([`../app/tabs/progress`]);
  this.presentAlert2();
  }
  async openToast() {  
    const toast = await this.toastController.create({  
      message: 'Rutina para perder de peso. Este programa hara que pierdas calorias cada dia, lo que significa, tendrás que hacer mucho cardio y una alimentación de bajo en calorias.',   
      duration: 10000  
    });  
    toast.present();  
  }
  onChange($event){
    console.log($event.target.value);
    var programa=$event.target.value;
    if (programa=="t") {
      this.titol="Tonificar"
      this.P_tonificar();
    }else if(programa=="a"){
      this.titol="Adelgazar"
      this.P_adelgazar();
    }else if(programa=="m"){
      this.titol="Musculación"
      this.P_muscular();
    }else if(programa=="p"){
      this.titol="Personalizado"
      this.P_personalizado();
    }
    }
    P_tonificar(){
      this.rutina='<ion-item><ion-label><ion-img class="logo" style="width: 150px;height: 200px; display: block;margin-left: auto;margin-right: auto; margin-bottom: 0;" size="small" src="../../../assets/tonificar.jpg"></ion-img></ion-label></ion-item>'
      document.getElementById("rutina").innerHTML=this.rutina;
      this.descripcion="Tonificar consiste en eliminar la grasa que recubre el músculo, algo que se puede conseguir gracias a ejercicios de fuerza y flexibilidad, sin que el cuerpo gane volumen. Para que puedas elegir la que más se adapte a tus condiciones, aquí te dejamos cuáles son las mejores actividades para tonificar los músculos.";
    }  
    P_adelgazar(){
      this.rutina='<ion-item><ion-label><ion-img class="logo" style="width: 150px;height: 200px; display: block;margin-left: auto;margin-right: auto; margin-bottom: 0;" size="small" src="../../../assets/adelgazar.jpg"></ion-img></ion-label></ion-item>'
      document.getElementById("rutina").innerHTML=this.rutina;
      this.descripcion='Rutina para perder de peso. Este programa hara que pierdas calorias cada dia, lo que significa, tendrás que hacer mucho cardio y una alimentación de bajo en calorias.';
    }
    P_muscular(){
      this.rutina='<ion-item><ion-label><ion-img class="logo" style="width: 150px;height: 200px; display: block;margin-left: auto;margin-right: auto; margin-bottom: 0;" size="small" src="../../../assets/muscular.jpg"></ion-img></ion-label></ion-item>'
      document.getElementById("rutina").innerHTML=this.rutina;
      this.descripcion="Por un lado, el aumento de masa muscular consiste en el aumento tanto en peso como en volumen de tus músculos. Esto se consigue con la hipertrofia muscular, que es el incremento en tamaño de cualquier tejido muscular porque crece su volumen."
    }
    P_personalizado(){
      this.rutina='<ion-item><ion-label><ion-img class="logo" style="width: 150px;height: 200px; display: block;margin-left: auto;margin-right: auto; margin-bottom: 0;" size="small" src="../../../assets/personalizado.jpg"></ion-img></ion-label></ion-item>'
      document.getElementById("rutina").innerHTML=this.rutina;
      this.descripcion="Tienes un programa para ti? No te preocupes esta app te ayudarà a hacerlo, solo que tendrás que anotar todos las rutinas y dietas que tu consideres."
    }

    async presentAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta',
        message: 'Escoje tu programa!',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
    async presentAlert2() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Comenzemos',
        message: 'En este apartado podras anotar tus datos generales como el peso estatura y medidas. Anota lo que necesitas!',
        buttons: ['OK']
      });
  
      await alert.present();
  
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
}

