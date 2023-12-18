import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';

const selectGroupsState = createFeatureSelector<GroupsState>('groups');

export const selectGroups = createSelector(selectGroupsState, (state) => state.groups);

export const selectMessages = (key: string) =>
  createSelector(selectGroupsState, (state) => state.messages[key]);

export const selectGroupCountdown = createSelector(
  selectGroupsState,
  (state) => state.countdown.groups,
);

export const selectPeopleCountdown = createSelector(
  selectGroupsState,
  (state) => state.countdown.people,
);

export const selectDialogCountdown = (key: string) =>
  createSelector(selectGroupsState, (state) => state.countdown[key]);

export const selectDialogLoadingTime = (key: string) =>
  createSelector(selectGroupsState, (state) => state.dialog[key]);
