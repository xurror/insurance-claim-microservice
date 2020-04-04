import { IProduct } from 'app/shared/model/product.model';
import { IPolicyHolder } from 'app/shared/model/policy-holder.model';

export interface IQuote {
  id?: number;
  ref?: string;
  startDate?: string;
  endDate?: string;
  premium?: string;
  iPT?: string;
  products?: IProduct[];
  policyHolders?: IPolicyHolder[];
}

export class Quote implements IQuote {
  constructor(
    public id?: number,
    public ref?: string,
    public startDate?: string,
    public endDate?: string,
    public premium?: string,
    public iPT?: string,
    public products?: IProduct[],
    public policyHolders?: IPolicyHolder[]
  ) {}
}
