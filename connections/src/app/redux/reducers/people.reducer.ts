import { createReducer, on } from '@ngrx/store';
import {
  addConversation,
  addConversationsList,
  addPeople,
  addPeopleMessages,
  deleteFromConversationList,
} from '../actions/people.action';
import { PeopleState } from '../models/peopleState.model';

export const initialState: PeopleState = {
  people: null,
  conversationsList: null,
  messages: {},
  dialog: {},
};

export const peopleReducer = createReducer(
  initialState,
  on(addPeopleMessages, (state, { messages, key, time }): PeopleState => {
    return {
      ...state,
      messages: { ...state.messages, [key]: [...(state.messages[key] || []), ...messages] },
      dialog: { ...state.dialog, [key]: time || state.dialog[key] },
    };
  }),
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
  on(
    deleteFromConversationList,
    (state, { conversationId }): PeopleState => ({
      ...state,
      conversationsList:
        state.conversationsList?.filter((list) => list.id.S !== conversationId) || null,
    }),
  ),
  on(addConversation, (state, { conversation }): PeopleState => {
    const conversationsList = state.conversationsList
      ? [{ ...conversation }, ...state.conversationsList]
      : [{ ...conversation }];
    return { ...state, conversationsList };
  }),
);
