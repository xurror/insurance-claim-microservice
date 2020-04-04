import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPolicy, Policy } from 'app/shared/model/policy.model';
import { PolicyService } from './policy.service';
import { IQuote } from 'app/shared/model/quote.model';
import { QuoteService } from 'app/entities/quote/quote.service';

@Component({
  selector: 'jhi-policy-update',
  templateUrl: './policy-update.component.html'
})
export class PolicyUpdateComponent implements OnInit {
  isSaving = false;
  quoteids: IQuote[] = [];

  editForm = this.fb.group({
    id: [],
    startDate: [null, [Validators.required]],
    endDate: [null, [Validators.required]],
    premium: [null, [Validators.required]],
    deductible: [null, [Validators.required]],
    isActive: [null, [Validators.required]],
    timestamp: [null, [Validators.required]],
    quoteId: []
  });

  constructor(
    protected policyService: PolicyService,
    protected quoteService: QuoteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ policy }) => {
      this.updateForm(policy);

      this.quoteService
        .query({ filter: 'policy-is-null' })
        .pipe(
          map((res: HttpResponse<IQuote[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IQuote[]) => {
          if (!policy.quoteId || !policy.quoteId.id) {
            this.quoteids = resBody;
          } else {
            this.quoteService
              .find(policy.quoteId.id)
              .pipe(
                map((subRes: HttpResponse<IQuote>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IQuote[]) => (this.quoteids = concatRes));
          }
        });
    });
  }

  updateForm(policy: IPolicy): void {
    this.editForm.patchValue({
      id: policy.id,
      startDate: policy.startDate,
      endDate: policy.endDate,
      premium: policy.premium,
      deductible: policy.deductible,
      isActive: policy.isActive,
      timestamp: policy.timestamp,
      quoteId: policy.quoteId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const policy = this.createFromForm();
    if (policy.id !== undefined) {
      this.subscribeToSaveResponse(this.policyService.update(policy));
    } else {
      this.subscribeToSaveResponse(this.policyService.create(policy));
    }
  }

  private createFromForm(): IPolicy {
    return {
      ...new Policy(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value,
      endDate: this.editForm.get(['endDate'])!.value,
      premium: this.editForm.get(['premium'])!.value,
      deductible: this.editForm.get(['deductible'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      timestamp: this.editForm.get(['timestamp'])!.value,
      quoteId: this.editForm.get(['quoteId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPolicy>>): void {
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

  trackById(index: number, item: IQuote): any {
    return item.id;
  }
}
