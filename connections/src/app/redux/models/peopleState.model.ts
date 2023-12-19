import { Message } from '../../shared/models/shared.model';
import { Conversation, Person } from '../../main/models/people.model';

export interface PeopleState {
  people: Person[] | null;
  conversationsList: Conversation[] | null;
  dialog: { [key: string]: string };
  messages: { [key: string]: Message[] };
}
