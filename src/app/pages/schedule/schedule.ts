import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController, Config } from '@ionic/angular';

import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;
  frase:String;
  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config
  ) { }

  ngOnInit() {
    var array = [
      ["El momento que da más miedo es siempre justo antes de empezar.",],
      ["El éxito en la vida no se mide por lo que logras sino por los obstáculos que superas."],
      ["Mañana es una excusa maravillosa, ¿No crees?"],
      ["Intenta ser un Arco iris en el día nublado de alguien"],
      ["Esperar ser otra persona es una pérdida de tiempo."],
      ["Existe el mañana por alguna razón."],
      ["Cuando te das cuenta que estás procrastinando preguntarte: ¿ Dé qué estoy intentando huir?"],
      ["Deséalo, espéralo, suéñalo, pero por todos los medios… ¡Hazlo!"],
      ["Cuando me dices que no puedo lo único que escucho es “Bla, bla, bla…"],
      ["Cualquier cosa que te plante la vida florecela con gracia."],
      ["Eres suficiente tal y como eres"],
      ["Debes hacer las cosas que crees que no puedes hacer."],
      ["Tu mejor profesor es tu mayor error."],
      ["Las cosas buenas llegan a los que saben esperar."],
      ["No es la más inteligente de las especies la que sobrevive ni la más fuerte, sino la que sabe adaptarse al cambio."],
      ["No busques el momento perfecto, solo busca el momento y hazlo perfecto."],
      ["Si te sientes perdido en el mundo es porque todavía no has salido a buscarte."],
      ["Todo error deja una enseñanza, toda enseñanza deja una experiencia, y toda experiencia deja una huella."],
      ["No importa lo que pase, siempre tendrás una historia que contar."],
      ["Encuentra lo que te hace feliz y ve hacia ello."],
      ["Queda terminantemente prohibido levantarse sin ilusiones."],
      ["Las dificultades no existen para hacerte renunciar sino para hacerte más fuerte"],
      ["Una persona que nunca se equivocó nunca intentó nada nuevo."],
      ["Dale a cada día la posibilidad de ser el mejor día de tu vida."],
      ["Los retos son lo que hacen la vida interesante, y superarlos es lo que hace que la vida tenga un significado."],
      ["Aunque te sientas perdido y sin fuerzas recuerda que cada día puede ser el comienzo de algo maravilloso. No te rindas."],
      ["Aquél que lo piensa mucho antes de dar un paso, se pasará toda su vida en un solo pie."],
      ["Lo único imposible es aquello que no intentas."],
      ["Ser fuerte no empieza en el gimnasio. Empieza en tu cabeza."],
      ["La disciplina es el puente entre tus metas y tus logros."],
      ["Sueña sin miedos, vive sin límites."],
      ["Sigue corriendo, no dejes que tus excusas te alcancen."],
      ["Si la montaña que subes parece cada vez más imponente es que la cima está cada vez más cerca."],
      ["No será fácil pero merecerá la pena."],
      ["Si buscas resultados distintos, no hagas siempre lo mismo."],
      ["Mientras más fuertes sean tus pruebas, más grandes serán tus victorias."],
      ["Si el plan no funciona, cambia el plan, pero no cambies la meta."],
      ["Una idea siempre comienza con una simple ejecución."],
      ["La diferencia entre donde estuviste ayer y donde estarás mañana es lo que pienses digas y hagas hoy."],
      ["Trabaja en silencio, haz que el éxito haga todo el ruido."],
      ["La felicidad no es por casualidad si no por decisión."],
      ["Si te cansas, aprende a descansar, no a renunciar"],
      ["Pregúntate si lo que estás haciendo hoy te acerca al lugar en el que quieres estar mañana."],
      ["No te conformes con lo que necesitas, lucha por lo que te mereces."],
      ["¿Quieres renunciar? Pues entonces es el momento de insistir más."],
      ["Si no puedes dejar de pensar en algo, no dejes de trabajar en ello."],
      ["Trabajar duro te llevará a la cima, disfrutar el camino te llevará más lejos."],
      ["Trabaja de manera inteligente, no de manera dura."],
      ["Trabajar duro por algo que no te interesa se llama estrés. Trabajar duro por algo que amas se llama pasión."],
      ["Céntrate hacia dónde quieres ir, no en lo que temes."],
      ["A la cima no se llega superando a los demás sino superándote a ti mismo."],
      ["Las palabras convencen, el ejemplo arrastra."],
      ["No hagas lo que los demás hacen. Haz lo que los demás quisieran hacer y no se atreven."],
  ];
  var randomItem = array[Math.random() * array.length | 0];
  
  // take only the element with index 0
  this.frase=randomItem[0];
  }
  
}
