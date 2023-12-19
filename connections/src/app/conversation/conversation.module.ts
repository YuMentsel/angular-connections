import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from '../shared/components/message/message.component';
import { DialogFormComponent } from '../shared/components/dialog-form/dialog-form.component';

@NgModule({
  declarations: [ConversationComponent],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    SharedModule,
    DialogFormComponent,
    MessageComponent,
  ],
})
export class ConversationModule {}
