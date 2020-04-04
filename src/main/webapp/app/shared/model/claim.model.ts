import { ICustomer } from 'app/shared/model/customer.model';
import { ClaimStatus } from 'app/shared/model/enumerations/claim-status.model';
import { ClaimOutcomes } from 'app/shared/model/enumerations/claim-outcomes.model';

export interface IClaim {
  id?: number;
  date?: string;
  amount?: string;
  claimStatus?: ClaimStatus;
  claimOutcomes?: ClaimOutcomes;
  customer?: ICustomer;
}

export class Claim implements IClaim {
  constructor(
    public id?: number,
    public date?: string,
    public amount?: string,
    public claimStatus?: ClaimStatus,
    public claimOutcomes?: ClaimOutcomes,
    public customer?: ICustomer
  ) {}
}
