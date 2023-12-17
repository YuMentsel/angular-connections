import { Component, Input } from '@angular/core';
import { Message } from '../../models/dialog.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;
}
