import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClaim, Claim } from 'app/shared/model/claim.model';
import { ClaimService } from './claim.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';

@Component({
  selector: 'jhi-claim-update',
  templateUrl: './claim-update.component.html'
})
export class ClaimUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    claimStatus: [],
    claimOutcomes: [],
    customer: []
  });

  constructor(
    protected claimService: ClaimService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ claim }) => {
      this.updateForm(claim);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));
    });
  }

  updateForm(claim: IClaim): void {
    this.editForm.patchValue({
      id: claim.id,
      date: claim.date,
      amount: claim.amount,
      claimStatus: claim.claimStatus,
      claimOutcomes: claim.claimOutcomes,
      customer: claim.customer
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const claim = this.createFromForm();
    if (claim.id !== undefined) {
      this.subscribeToSaveResponse(this.claimService.update(claim));
    } else {
      this.subscribeToSaveResponse(this.claimService.create(claim));
    }
  }

  private createFromForm(): IClaim {
    return {
      ...new Claim(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      claimStatus: this.editForm.get(['claimStatus'])!.value,
      claimOutcomes: this.editForm.get(['claimOutcomes'])!.value,
      customer: this.editForm.get(['customer'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClaim>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICustomer): any {
    return item.id;
  }
}
