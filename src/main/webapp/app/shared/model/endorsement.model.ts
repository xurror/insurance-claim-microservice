import { IPolicy } from 'app/shared/model/policy.model';

export interface IEndorsement {
  id?: number;
  ref?: string;
  description?: string;
  policy?: IPolicy;
}

export class Endorsement implements IEndorsement {
  constructor(public id?: number, public ref?: string, public description?: string, public policy?: IPolicy) {}
}
