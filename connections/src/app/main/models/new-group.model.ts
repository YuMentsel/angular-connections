import { SField } from '../../shared/models/shared.model';

export class NewGroup {
  id: SField;

  name: SField;

  createdAt: SField;

  createdBy: SField;

  constructor(name: string, id: string) {
    this.id = { S: id };
    this.name = { S: name };
    this.createdAt = { S: Date.now().toString() };
    this.createdBy = { S: this.getCreatedBy() };
  }

  getCreatedBy(): string {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token).uid : '';
  }
}
