import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  imports: [CommonModule, RouterModule, SharedModule],
  declarations: [HeaderComponent, NotFoundComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
