import { createReducer, on } from '@ngrx/store';
import { GroupsState } from '../models/groupsState.model';
import {
  updateCountdown,
  addGroup,
  addGroups,
  deleteGroup,
  addMessages,
} from '../actions/groups.action';

export const initialState: GroupsState = {
  groups: [],
  messages: {},
  countdown: { groups: 0, people: 0 },
  dialog: {},
};

export const groupsReducer = createReducer(
  initialState,
  on(
    addMessages,
    (state, { messages, key, time }): GroupsState => ({
      ...state,
      messages: { ...state.messages, [key]: [...(state.messages[key] || []), ...messages] },
      dialog: { ...state.dialog, [key]: time },
    }),
  ),
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
      groups: [{ ...newGroup }, ...state.groups],
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
