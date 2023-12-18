import { createAction, props } from '@ngrx/store';
import { Group } from '../../main/models/groups.model';
import { Message } from '../../dialog/models/dialog.model';

export enum ActionTypes {
  addMessages = '[Messages] Add all',
  addGroups = '[Group] Add all',
  addGroup = '[Group] Add',
  deleteGroup = '[Group] Delete',
  updateCountdown = '[Countdown] Update',
}

export const addMessages = createAction(
  ActionTypes.addMessages,
  props<{ messages: Message[]; key: string; time: string }>(),
);

export const addGroups = createAction(ActionTypes.addGroups, props<{ groups: Group[] }>());

export const addGroup = createAction(ActionTypes.addGroup, props<{ newGroup: Group }>());

export const deleteGroup = createAction(ActionTypes.deleteGroup, props<{ groupId: string }>());

export const updateCountdown = createAction(
  ActionTypes.updateCountdown,
  props<{ [key: string]: number }>(),
);
