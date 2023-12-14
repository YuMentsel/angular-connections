import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';

const selectGroupsState = createFeatureSelector<GroupsState>('groups');

export const selectGroups = createSelector(selectGroupsState, (state) => state.groups);
