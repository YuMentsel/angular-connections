import { Conversation, Person } from '../../main/models/people.model';

export interface PeopleState {
  people: Person[];
  conversationsList: Conversation[] | null;
}
