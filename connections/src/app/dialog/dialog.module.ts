import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './pages/dialog/dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { MessageComponent } from './components/message/message.component';
import { SharedModule } from '../shared/shared.module';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';

@NgModule({
  declarations: [DialogComponent, MessageComponent, DialogFormComponent],
  imports: [CommonModule, DialogRoutingModule, SharedModule],
})
export class DialogModule {}
