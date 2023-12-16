import { createReducer, on } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';
import { updateCountdown, addGroup, addGroups, deleteGroup } from '../actions/groups.action';

export const initialState: GroupsState = {
  groups: [],
  countdown: { groups: 0, people: 0 },
};

export const groupsReducer = createReducer(
  initialState,
  on(
    addGroups,
    (state, { groups }): GroupsState => ({
      ...state,
      groups: [...groups],
    }),
  ),
  on(
    addGroup,
    (state, { newGroup }): GroupsState => ({
      ...state,
      groups: [newGroup, ...state.groups],
    }),
  ),
  on(
    deleteGroup,
    (state, { groupId }): GroupsState => ({
      ...state,
      groups: state.groups.filter((group) => group.id.S !== groupId),
    }),
  ),
  on(
    updateCountdown,
    (state, action): GroupsState => ({
      ...state,
      countdown: { ...state.countdown, ...action },
    }),
  ),
);
