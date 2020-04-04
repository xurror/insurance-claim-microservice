import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentSchedule } from 'app/shared/model/payment-schedule.model';
import { PaymentScheduleService } from './payment-schedule.service';

@Component({
  templateUrl: './payment-schedule-delete-dialog.component.html'
})
export class PaymentScheduleDeleteDialogComponent {
  paymentSchedule?: IPaymentSchedule;

  constructor(
    protected paymentScheduleService: PaymentScheduleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentScheduleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('paymentScheduleListModification');
      this.activeModal.close();
    });
  }
}
