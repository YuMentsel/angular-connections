import { createAction, props } from '@ngrx/store';
import { SField, ProfileInfo } from '../../shared/models/shared.model';

export enum ActionTypes {
  addProfileInfo = '[Profile] Add',
  updateProfileInfo = '[Profile] Update',
  deleteProfileInfo = '[Profile] Delete',
  clearStore = '[Store] Clear Store',
}

export const clearStore = createAction(ActionTypes.clearStore);

export const addProfileInfo = createAction(
  ActionTypes.addProfileInfo,
  props<{ info: ProfileInfo }>(),
);

export const updateProfileInfo = createAction(
  ActionTypes.updateProfileInfo,
  props<{ name: SField }>(),
);

export const deleteProfileInfo = createAction(ActionTypes.deleteProfileInfo);
