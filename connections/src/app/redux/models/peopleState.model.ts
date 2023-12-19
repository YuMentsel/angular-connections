import { Message } from '../../shared/models/shared.model';
import { Conversation, Person } from '../../main/models/people.model';

export interface PeopleState {
  people: Person[];
  conversationsList: Conversation[] | null;
  dialog: { [key: string]: string };
  messages: { [key: string]: Message[] };
}
