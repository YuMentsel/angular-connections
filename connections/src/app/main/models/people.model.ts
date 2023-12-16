import { SField } from '../../shared/models/shared.model';

export interface Person {
  uid: SField;
  name: SField;
}

export interface Conversation {
  id: SField;
  companionID: SField;
}

export interface ConversationID {
  conversationID: string;
}

export interface CompanionID {
  companion: string;
}
