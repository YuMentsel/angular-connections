import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
