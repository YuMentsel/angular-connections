import { SField } from '../../shared/models/shared.model';

export interface Groups {
  $metadata: string;
  Count: number;
  Items: Group[];
  ScannedCount: number;
}

export interface Metadata {
  attempts: number;
  httpStatusCode: number;
  requestId: string;
  totalRetryDelay: number;
}

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
