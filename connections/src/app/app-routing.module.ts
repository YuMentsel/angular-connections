import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { connectionsGuard } from './shared/guards/connections.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    canActivate: [connectionsGuard],
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./registration/registration.module').then((m) => m.RegistrationModule),
    canActivate: [authGuard],
  },
  {
    path: 'signin',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [connectionsGuard],
  },
  {
    path: 'group/:id',
    loadChildren: () => import('./dialog/dialog.module').then((m) => m.DialogModule),
    canActivate: [connectionsGuard],
  },
  {
    path: 'conversation/:id',
    loadChildren: () =>
      import('./conversation/conversation.module').then((m) => m.ConversationModule),
    canActivate: [connectionsGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
