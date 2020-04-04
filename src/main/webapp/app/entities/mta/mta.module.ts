import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { MTAComponent } from './mta.component';
import { MTADetailComponent } from './mta-detail.component';
import { MTAUpdateComponent } from './mta-update.component';
import { MTADeleteDialogComponent } from './mta-delete-dialog.component';
import { mTARoute } from './mta.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild(mTARoute)],
  declarations: [MTAComponent, MTADetailComponent, MTAUpdateComponent, MTADeleteDialogComponent],
  entryComponents: [MTADeleteDialogComponent]
})
export class InsuranceClaimMicroserviceMTAModule {}
