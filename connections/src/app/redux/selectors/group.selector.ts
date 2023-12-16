import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';

const selectGroupsState = createFeatureSelector<GroupsState>('groups');

export const selectGroups = createSelector(selectGroupsState, (state) => state.groups);

export const selectGroupCountdown = createSelector(
  selectGroupsState,
  (state) => state.countdown.groups,
);

export const selectPeopleCountdown = createSelector(
  selectGroupsState,
  (state) => state.countdown.people,
);
