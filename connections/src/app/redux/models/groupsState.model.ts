import { Message } from '../../dialog/models/dialog.model';
import { Group } from '../../main/models/groups.model';

export interface GroupsState {
  groups: Group[];
  countdown: Countdown;
  dialog: { [key: string]: string };
  messages: { [key: string]: Message[] };
}

export interface Countdown {
  groups: number;
  people: number;
  [key: string]: number;
}
