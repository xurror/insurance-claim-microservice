import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { PaymentScheduleComponent } from './payment-schedule.component';
import { PaymentScheduleDetailComponent } from './payment-schedule-detail.component';
import { PaymentScheduleUpdateComponent } from './payment-schedule-update.component';
import { PaymentScheduleDeleteDialogComponent } from './payment-schedule-delete-dialog.component';
import { paymentScheduleRoute } from './payment-schedule.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild(paymentScheduleRoute)],
  declarations: [
    PaymentScheduleComponent,
    PaymentScheduleDetailComponent,
    PaymentScheduleUpdateComponent,
    PaymentScheduleDeleteDialogComponent
  ],
  entryComponents: [PaymentScheduleDeleteDialogComponent]
})
export class InsuranceClaimMicroservicePaymentScheduleModule {}
