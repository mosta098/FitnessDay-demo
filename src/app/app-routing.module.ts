import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),canActivate:  [AuthGuard]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule),canActivate:  [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule),canActivate:  [AuthGuard]
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'progress',
    loadChildren: () => import('./pages/progress/progress.module').then( m => m.ProgressPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./pages/calendario/calendario.module').then( m => m.CalendarioPageModule),canActivate: [AuthGuard]
  },
  {
    path: 'program-selector',
    loadChildren: () => import('./program-selector/program-selector.module').then( m => m.ProgramSelectorPageModule)
  },
  {
    path: 'ejercicios',
    loadChildren: () => import('./pages/ejercicios/ejercicios.module').then( m => m.EjerciciosPageModule)
  },
  {
    path: 'imc',
    loadChildren: () => import('./pages/imc/imc.module').then( m => m.IMCPageModule)
  },
  {
    path: 'peso',
    loadChildren: () => import('./pages/peso/peso.module').then( m => m.PesoPageModule)
  },  {
    path: 'speaker-detail',
    loadChildren: () => import('./pages/speaker-detail/speaker-detail.module').then( m => m.SpeakerDetailModule)
  },
  {
    path: 'comidas',
    loadChildren: () => import('./pages/comidas/comidas.module').then( m => m.ComidasPageModule)
  },
  {
    path: 'kcal',
    loadChildren: () => import('./pages/kcal/kcal.module').then( m => m.KcalPageModule)
  },
  {
    path: 'desayuno',
    loadChildren: () => import('./pages/desayuno/desayuno.module').then( m => m.DesayunoPageModule)
  },
  {
    path: 'media-manana',
    loadChildren: () => import('./pages/media-manana/media-manana.module').then( m => m.MediaMananaPageModule)
  },
  {
    path: 'comida',
    loadChildren: () => import('./pages/comida/comida.module').then( m => m.ComidaPageModule)
  },
  {
    path: 'merienda',
    loadChildren: () => import('./pages/merienda/merienda.module').then( m => m.MeriendaPageModule)
  },
  {
    path: 'cena',
    loadChildren: () => import('./pages/cena/cena.module').then( m => m.CenaPageModule)
  },


  


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
