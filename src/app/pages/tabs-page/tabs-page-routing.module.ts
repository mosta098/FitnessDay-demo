import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs-page';
import { SchedulePage } from '../schedule/schedule';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
{
        path: 'speakers',
        children: [
        {
          path: '',
          loadChildren: () => import('../speaker-list/speaker-list.module').then(m => m.SpeakerListModule)
        },
        {
          path: 'session/:sessionId',
          loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
        },
        {
          path: 'speaker-details/:speakerId',
          loadChildren: () => import('../speaker-detail/speaker-detail.module').then(m => m.SpeakerDetailModule)
        }
      ]
    },{
      path: 'comidas',
      children: [
        {
          path: '',
          loadChildren: () => import('../comidas/comidas.module').then(m => m.ComidasPageModule)
        }
      ]
    },
      {
        path: 'ejercicios',
        children: [
          {
            path: '',
            loadChildren: () => import('../ejercicios/ejercicios.module').then(m => m.EjerciciosPageModule)
          }
        ]
      },
      {
        path: 'progress',
        children: [
          {
            path: '',
            loadChildren: () => import('../progress/progress.module').then(m => m.ProgressPageModule)
          }
        ]
      }, {
        path: 'calendario',
        children: [
          {
            path: '',
            loadChildren: () => import('../calendario/calendario.module').then(m => m.CalendarioPageModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
          }
        ]
      },      {
        path: 'schedule',
        children: [
          {
            path: '',
            component: SchedulePage,
          },
          {
            path: 'session/:sessionId',
            loadChildren: () => import('../session-detail/session-detail.module').then(m => m.SessionDetailModule)
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/app/tabs/speakers',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

