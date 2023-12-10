import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
