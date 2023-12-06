import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RegistrationRoutingModule, SharedModule],
})
export class RegistrationModule {}
