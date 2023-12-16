import { SField } from '../../shared/models/shared.model';

export class MyConversation {
  id: SField;

  companionID: SField;

  constructor(id: string, companionID: string) {
    this.id = { S: id };
    this.companionID = { S: companionID };
  }
}
