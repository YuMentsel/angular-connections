import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleState } from '../models/peopleState.model';

const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeople = createSelector(selectPeopleState, (state) => state.people);

export const selectConversationsList = createSelector(
  selectPeopleState,
  (state) => state.conversationsList,
);
