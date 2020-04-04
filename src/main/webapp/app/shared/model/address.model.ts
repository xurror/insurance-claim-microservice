import { ICustomer } from 'app/shared/model/customer.model';

export interface IAddress {
  id?: number;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  customer?: ICustomer;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public address?: string,
    public address2?: string,
    public city?: string,
    public state?: string,
    public zip?: string,
    public country?: string,
    public customer?: ICustomer
  ) {}
}
