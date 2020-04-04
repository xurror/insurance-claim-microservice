import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPaymentSchedule, PaymentSchedule } from 'app/shared/model/payment-schedule.model';
import { PaymentScheduleService } from './payment-schedule.service';
import { IPolicyHolder } from 'app/shared/model/policy-holder.model';
import { PolicyHolderService } from 'app/entities/policy-holder/policy-holder.service';

@Component({
  selector: 'jhi-payment-schedule-update',
  templateUrl: './payment-schedule-update.component.html'
})
export class PaymentScheduleUpdateComponent implements OnInit {
  isSaving = false;
  policyholders: IPolicyHolder[] = [];

  editForm = this.fb.group({
    id: [],
    dueDate: [null, [Validators.required]],
    amount: [null, [Validators.required]],
    policyHolder: []
  });

  constructor(
    protected paymentScheduleService: PaymentScheduleService,
    protected policyHolderService: PolicyHolderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentSchedule }) => {
      this.updateForm(paymentSchedule);

      this.policyHolderService.query().subscribe((res: HttpResponse<IPolicyHolder[]>) => (this.policyholders = res.body || []));
    });
  }

  updateForm(paymentSchedule: IPaymentSchedule): void {
    this.editForm.patchValue({
      id: paymentSchedule.id,
      dueDate: paymentSchedule.dueDate,
      amount: paymentSchedule.amount,
      policyHolder: paymentSchedule.policyHolder
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentSchedule = this.createFromForm();
    if (paymentSchedule.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentScheduleService.update(paymentSchedule));
    } else {
      this.subscribeToSaveResponse(this.paymentScheduleService.create(paymentSchedule));
    }
  }

  private createFromForm(): IPaymentSchedule {
    return {
      ...new PaymentSchedule(),
      id: this.editForm.get(['id'])!.value,
      dueDate: this.editForm.get(['dueDate'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      policyHolder: this.editForm.get(['policyHolder'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentSchedule>>): void {
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

  trackById(index: number, item: IPolicyHolder): any {
    return item.id;
  }
}
