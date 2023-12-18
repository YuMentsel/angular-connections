import { SField } from '../../shared/models/shared.model';

export interface Group {
  id: SField;
  name: SField;
  createdAt: SField;
  createdBy: SField;
}

export interface GroupName {
  name: string;
}

export interface GroupId {
  groupID: string;
}

export interface ConfirmDialogData {
  message: string;
  buttonText: {
    yes: string;
    cancel: string;
  };
  id: string;
}
