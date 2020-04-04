import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentSchedule } from 'app/shared/model/payment-schedule.model';
import { PaymentScheduleService } from './payment-schedule.service';
import { PaymentScheduleDeleteDialogComponent } from './payment-schedule-delete-dialog.component';

@Component({
  selector: 'jhi-payment-schedule',
  templateUrl: './payment-schedule.component.html'
})
export class PaymentScheduleComponent implements OnInit, OnDestroy {
  paymentSchedules?: IPaymentSchedule[];
  eventSubscriber?: Subscription;

  constructor(
    protected paymentScheduleService: PaymentScheduleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.paymentScheduleService.query().subscribe((res: HttpResponse<IPaymentSchedule[]>) => (this.paymentSchedules = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPaymentSchedules();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPaymentSchedule): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPaymentSchedules(): void {
    this.eventSubscriber = this.eventManager.subscribe('paymentScheduleListModification', () => this.loadAll());
  }

  delete(paymentSchedule: IPaymentSchedule): void {
    const modalRef = this.modalService.open(PaymentScheduleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paymentSchedule = paymentSchedule;
  }
}
