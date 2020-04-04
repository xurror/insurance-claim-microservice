import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentSchedule } from 'app/shared/model/payment-schedule.model';

@Component({
  selector: 'jhi-payment-schedule-detail',
  templateUrl: './payment-schedule-detail.component.html'
})
export class PaymentScheduleDetailComponent implements OnInit {
  paymentSchedule: IPaymentSchedule | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentSchedule }) => (this.paymentSchedule = paymentSchedule));
  }

  previousState(): void {
    window.history.back();
  }
}
