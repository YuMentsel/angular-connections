import { createAction, props } from '@ngrx/store';
import { Person } from '../../main/models/people.model';

export enum ActionTypes {
  addPeople = '[Group] Add people',
}

export const addPeople = createAction(ActionTypes.addPeople, props<{ people: Person[] }>());
