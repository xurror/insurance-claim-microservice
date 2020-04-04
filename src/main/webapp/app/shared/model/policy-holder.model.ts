import { IPaymentSchedule } from 'app/shared/model/payment-schedule.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IQuote } from 'app/shared/model/quote.model';

export interface IPolicyHolder {
  id?: number;
  paymentSchedules?: IPaymentSchedule[];
  customer?: ICustomer;
  quote?: IQuote;
}

export class PolicyHolder implements IPolicyHolder {
  constructor(public id?: number, public paymentSchedules?: IPaymentSchedule[], public customer?: ICustomer, public quote?: IQuote) {}
}
