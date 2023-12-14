import { createReducer, on } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';
import { addGroup, addGroups, deleteGroup } from '../actions/groups.action';

export const initialState: GroupsState = {
  groups: [],
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
);
