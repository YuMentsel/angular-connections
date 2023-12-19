import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileInfo } from '../../shared/models/shared.model';
import { ProfileState } from '../models/profileState.model';

export const selectProfile = createFeatureSelector<ProfileState>('profile');

export const selectProfileInfo = createSelector(
  selectProfile,
  (state: ProfileState): ProfileInfo | null => state.profileInfo,
);
