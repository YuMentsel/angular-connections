import { createAction, props } from '@ngrx/store';
import { ProfileField, ProfileInfo } from '../../shared/models/shared.model';

export enum ActionTypes {
  addProfileInfo = '[Profile] Add',
  updateProfileInfo = '[Profile] Update',
  deleteProfileInfo = '[Profile] Delete',
}

export const addProfileInfo = createAction(
  ActionTypes.addProfileInfo,
  props<{ info: ProfileInfo }>(),
);

export const updateProfileInfo = createAction(
  ActionTypes.updateProfileInfo,
  props<{ name: ProfileField }>(),
);

export const deleteProfileInfo = createAction(ActionTypes.deleteProfileInfo);
