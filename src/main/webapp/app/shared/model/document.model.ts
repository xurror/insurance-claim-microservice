import { IPolicy } from 'app/shared/model/policy.model';

export interface IDocument {
  id?: number;
  ref?: string;
  policy?: IPolicy;
}

export class Document implements IDocument {
  constructor(public id?: number, public ref?: string, public policy?: IPolicy) {}
}
