import { IQuote } from 'app/shared/model/quote.model';
import { IMTA } from 'app/shared/model/mta.model';
import { IEndorsement } from 'app/shared/model/endorsement.model';
import { IDocument } from 'app/shared/model/document.model';

export interface IPolicy {
  id?: number;
  startDate?: string;
  endDate?: string;
  premium?: string;
  deductible?: string;
  isActive?: boolean;
  timestamp?: string;
  quoteId?: IQuote;
  mTAS?: IMTA[];
  endorsements?: IEndorsement[];
  documents?: IDocument[];
}

export class Policy implements IPolicy {
  constructor(
    public id?: number,
    public startDate?: string,
    public endDate?: string,
    public premium?: string,
    public deductible?: string,
    public isActive?: boolean,
    public timestamp?: string,
    public quoteId?: IQuote,
    public mTAS?: IMTA[],
    public endorsements?: IEndorsement[],
    public documents?: IDocument[]
  ) {
    this.isActive = this.isActive || false;
  }
}
