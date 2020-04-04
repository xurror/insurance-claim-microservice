import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPolicyHolder, PolicyHolder } from 'app/shared/model/policy-holder.model';
import { PolicyHolderService } from './policy-holder.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer/customer.service';
import { IQuote } from 'app/shared/model/quote.model';
import { QuoteService } from 'app/entities/quote/quote.service';

type SelectableEntity = ICustomer | IQuote;

@Component({
  selector: 'jhi-policy-holder-update',
  templateUrl: './policy-holder-update.component.html'
})
export class PolicyHolderUpdateComponent implements OnInit {
  isSaving = false;
  customers: ICustomer[] = [];
  quotes: IQuote[] = [];

  editForm = this.fb.group({
    id: [],
    customer: [],
    quote: []
  });

  constructor(
    protected policyHolderService: PolicyHolderService,
    protected customerService: CustomerService,
    protected quoteService: QuoteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ policyHolder }) => {
      this.updateForm(policyHolder);

      this.customerService.query().subscribe((res: HttpResponse<ICustomer[]>) => (this.customers = res.body || []));

      this.quoteService.query().subscribe((res: HttpResponse<IQuote[]>) => (this.quotes = res.body || []));
    });
  }

  updateForm(policyHolder: IPolicyHolder): void {
    this.editForm.patchValue({
      id: policyHolder.id,
      customer: policyHolder.customer,
      quote: policyHolder.quote
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const policyHolder = this.createFromForm();
    if (policyHolder.id !== undefined) {
      this.subscribeToSaveResponse(this.policyHolderService.update(policyHolder));
    } else {
      this.subscribeToSaveResponse(this.policyHolderService.create(policyHolder));
    }
  }

  private createFromForm(): IPolicyHolder {
    return {
      ...new PolicyHolder(),
      id: this.editForm.get(['id'])!.value,
      customer: this.editForm.get(['customer'])!.value,
      quote: this.editForm.get(['quote'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicyHolder>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
