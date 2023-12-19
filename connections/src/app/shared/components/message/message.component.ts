import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Message } from '../../models/shared.model';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [SharedModule, DatePipe],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;

  @Input() username!: string;
}
