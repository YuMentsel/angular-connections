import { Message } from '../../shared/models/shared.model';
import { Group } from '../../main/models/groups.model';

export interface GroupsState {
  groups: Group[] | null;
  countdown: Countdown;
  dialog: { [key: string]: string };
  messages: { [key: string]: Message[] };
}

export interface Countdown {
  [key: string]: number;
}
