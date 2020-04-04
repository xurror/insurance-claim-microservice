import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { ClaimComponent } from './claim.component';
import { ClaimDetailComponent } from './claim-detail.component';
import { ClaimUpdateComponent } from './claim-update.component';
import { ClaimDeleteDialogComponent } from './claim-delete-dialog.component';
import { claimRoute } from './claim.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild(claimRoute)],
  declarations: [ClaimComponent, ClaimDetailComponent, ClaimUpdateComponent, ClaimDeleteDialogComponent],
  entryComponents: [ClaimDeleteDialogComponent]
})
export class InsuranceClaimMicroserviceClaimModule {}
