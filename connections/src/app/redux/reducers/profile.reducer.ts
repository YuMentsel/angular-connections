import { createReducer, on } from '@ngrx/store';
import { ProfileInfo } from '../../shared/models/shared.model';
import {
  addProfileInfo,
  clearStore,
  deleteProfileInfo,
  updateProfileInfo,
} from '../actions/profile.action';
import { ProfileState } from '../models/profileState.model';

export const initialState: ProfileState = {
  profileInfo: null,
};

export const profileReducer = createReducer(
  initialState,
  on(
    addProfileInfo,
    (state, { info }): ProfileState => ({
      ...state,
      profileInfo: { ...info },
    }),
  ),
  on(
    updateProfileInfo,
    (state, { name }): ProfileState => ({
      ...state,
      profileInfo: { ...state.profileInfo, name } as ProfileInfo,
    }),
  ),
  on(
    deleteProfileInfo,
    (state): ProfileState => ({
      ...state,
      profileInfo: null,
    }),
  ),
  on(clearStore, (): ProfileState => initialState),
);
