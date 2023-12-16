import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './pages/dialog/dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, DialogRoutingModule],
})
export class DialogModule {}
