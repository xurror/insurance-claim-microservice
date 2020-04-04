import { IQuote } from 'app/shared/model/quote.model';

export interface IProduct {
  id?: number;
  name?: string;
  code?: string;
  description?: string;
  category?: string;
  timestamp?: string;
  isActive?: string;
  quote?: IQuote;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public description?: string,
    public category?: string,
    public timestamp?: string,
    public isActive?: string,
    public quote?: IQuote
  ) {}
}
