import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './pages/dialog/dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DialogFormComponent } from '../shared/components/dialog-form/dialog-form.component';
import { MessageComponent } from '../shared/components/message/message.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, DialogRoutingModule, SharedModule, DialogFormComponent, MessageComponent],
})
export class DialogModule {}
