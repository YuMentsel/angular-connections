import { createReducer, on } from '@ngrx/store';
import { addProfileInfo } from '../actions/connections.action';
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
);
