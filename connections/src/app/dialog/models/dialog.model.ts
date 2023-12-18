import { SField } from '../../shared/models/shared.model';

export interface DialogBody {
  groupID: string;
  since: number;
}

export interface MessageBody {
  groupID: string;
  message: string;
}

export interface Message {
  authorID: SField;
  message: SField;
  createdAt: SField;
}
