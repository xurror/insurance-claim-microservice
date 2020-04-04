import { IPolicy } from 'app/shared/model/policy.model';

export interface IMTA {
  id?: number;
  startDate?: string;
  endDate?: string;
  policy?: IPolicy;
}

export class MTA implements IMTA {
  constructor(public id?: number, public startDate?: string, public endDate?: string, public policy?: IPolicy) {}
}
