import { createReducer, on } from '@ngrx/store';
import { addConversation, addConversationsList, addPeople } from '../actions/people.action';
import { PeopleState } from '../models/peopleState.model';

export const initialState: PeopleState = {
  people: [],
  conversationsList: null,
};

export const peopleReducer = createReducer(
  initialState,
  on(
    addPeople,
    (state, { people }): PeopleState => ({
      ...state,
      people: [...people],
    }),
  ),
  on(
    addConversationsList,
    (state, { conversationsList }): PeopleState => ({
      ...state,
      conversationsList: [...conversationsList],
    }),
  ),
  on(addConversation, (state, { conversation }): PeopleState => {
    const conversationsList = state.conversationsList
      ? [{ ...conversation }, ...state.conversationsList]
      : [{ ...conversation }];
    return { ...state, conversationsList };
  }),
);
