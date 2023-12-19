import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleState } from '../models/peopleState.model';

const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeople = createSelector(selectPeopleState, (state) => state.people);

export const selectConversationsList = createSelector(
  selectPeopleState,
  (state) => state.conversationsList,
);

export const selectPeopleLoadingTime = (key: string) =>
  createSelector(selectPeopleState, (state) => state.dialog[key]);

export const selectPeopleMessages = (key: string) =>
  createSelector(selectPeopleState, (state) => state.messages[key]);
