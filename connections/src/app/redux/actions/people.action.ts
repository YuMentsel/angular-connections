import { createAction, props } from '@ngrx/store';
import { Conversation, Person } from '../../main/models/people.model';

export enum ActionTypes {
  addPeople = '[People] Add people',
  addConversationsList = '[People] Add conversations list',
  addConversation = '[People] Add conversation',
}

export const addPeople = createAction(ActionTypes.addPeople, props<{ people: Person[] }>());

export const addConversationsList = createAction(
  ActionTypes.addConversationsList,
  props<{ conversationsList: Conversation[] }>(),
);

export const addConversation = createAction(
  ActionTypes.addConversation,
  props<{ conversation: Conversation }>(),
);
