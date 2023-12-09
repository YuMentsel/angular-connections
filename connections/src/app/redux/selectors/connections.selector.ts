import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileInfo } from '../../shared/models/shared.model';
import { ConnectionsState } from '../models/state.model';

export const selectConnections = createFeatureSelector<ConnectionsState>('connections');

export const selectProfileInfo = createSelector(
  selectConnections,
  (state: ConnectionsState): ProfileInfo | null => state.profileInfo,
);
