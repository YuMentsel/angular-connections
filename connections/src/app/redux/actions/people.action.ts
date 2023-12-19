import { createAction, props } from '@ngrx/store';
import { Message } from '../../shared/models/shared.model';
import { Conversation, Person } from '../../main/models/people.model';

export enum ActionTypes {
  addPeople = '[People] Add people',
  addConversation = '[People] Add conversation',
  addConversationsList = '[People List] Add conversations list',
  deleteFromConversationList = '[People List] Delete conversations list',
  addPeopleMessages = '[People Messages] Add messages',
}

export const addPeopleMessages = createAction(
  ActionTypes.addPeopleMessages,
  props<{ messages: Message[]; key: string; time: string }>(),
);

export const addPeople = createAction(ActionTypes.addPeople, props<{ people: Person[] }>());

export const addConversationsList = createAction(
  ActionTypes.addConversationsList,
  props<{ conversationsList: Conversation[] }>(),
);

export const deleteFromConversationList = createAction(
  ActionTypes.deleteFromConversationList,
  props<{ conversationId: string }>(),
);

export const addConversation = createAction(
  ActionTypes.addConversation,
  props<{ conversation: Conversation }>(),
);
