import { IPolicyHolder } from 'app/shared/model/policy-holder.model';

export interface IPaymentSchedule {
  id?: number;
  dueDate?: string;
  amount?: string;
  policyHolder?: IPolicyHolder;
}

export class PaymentSchedule implements IPaymentSchedule {
  constructor(public id?: number, public dueDate?: string, public amount?: string, public policyHolder?: IPolicyHolder) {}
}
