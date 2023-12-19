import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Message } from '../../models/shared.model';
import { SharedModule } from '../../shared.module';
import { NameByIdPipe } from '../../pipes/name-by-id.pipe';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [SharedModule, DatePipe, NameByIdPipe, CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message!: Message;
}
