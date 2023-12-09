import { createAction, props } from '@ngrx/store';
import { ProfileInfo } from '../../shared/models/shared.model';

export enum ActionTypes {
  profileInfo = '[Profile] Add',
}

export const addProfileInfo = createAction(ActionTypes.profileInfo, props<{ info: ProfileInfo }>());
