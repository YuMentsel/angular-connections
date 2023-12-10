import { createReducer, on } from '@ngrx/store';
import { ProfileInfo } from '../../shared/models/shared.model';
import {
  addProfileInfo,
  deleteProfileInfo,
  updateProfileInfo,
} from '../actions/connections.action';
import { ConnectionsState } from '../models/state.model';

export const initialState: ConnectionsState = {
  profileInfo: null,
};

export const connectionsReducer = createReducer(
  initialState,
  on(
    addProfileInfo,
    (state, { info }): ConnectionsState => ({
      ...state,
      profileInfo: { ...info },
    }),
  ),
  on(
    updateProfileInfo,
    (state, { name }): ConnectionsState => ({
      ...state,
      profileInfo: { ...state.profileInfo, name } as ProfileInfo,
    }),
  ),
  on(
    deleteProfileInfo,
    (state): ConnectionsState => ({
      ...state,
      profileInfo: null,
    }),
  ),
);
