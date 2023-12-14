import { createAction, props } from '@ngrx/store';
import { Group } from '../../main/models/groups.model';

export enum ActionTypes {
  addGroups = '[Group] Add all',
  addGroup = '[Group] Add',
  deleteGroup = '[Group] Delete',
}

export const addGroups = createAction(ActionTypes.addGroups, props<{ groups: Group[] }>());

export const addGroup = createAction(ActionTypes.addGroup, props<{ newGroup: Group }>());

export const deleteGroup = createAction(ActionTypes.deleteGroup, props<{ groupId: string }>());
