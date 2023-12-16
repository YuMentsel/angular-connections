import { Group } from '../../main/models/groups.model';

export interface GroupsState {
  groups: Group[];
  countdown: Countdown;
}

export interface Countdown {
  groups: number;
  people: number;
}
