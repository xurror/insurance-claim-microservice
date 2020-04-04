import { IAddress } from 'app/shared/model/address.model';
import { IPolicyHolder } from 'app/shared/model/policy-holder.model';
import { IClaim } from 'app/shared/model/claim.model';

export interface ICustomer {
  id?: number;
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  telephone?: string;
  sSN?: string;
  isPrimaryPolicyHolder?: boolean;
  gender?: string;
  maritalStatus?: string;
  isActive?: boolean;
  timestamp?: string;
  addresses?: IAddress[];
  policyHolders?: IPolicyHolder[];
  claims?: IClaim[];
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public dob?: string,
    public email?: string,
    public telephone?: string,
    public sSN?: string,
    public isPrimaryPolicyHolder?: boolean,
    public gender?: string,
    public maritalStatus?: string,
    public isActive?: boolean,
    public timestamp?: string,
    public addresses?: IAddress[],
    public policyHolders?: IPolicyHolder[],
    public claims?: IClaim[]
  ) {
    this.isPrimaryPolicyHolder = this.isPrimaryPolicyHolder || false;
    this.isActive = this.isActive || false;
  }
}
