import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { PolicyHolderComponent } from './policy-holder.component';
import { PolicyHolderDetailComponent } from './policy-holder-detail.component';
import { PolicyHolderUpdateComponent } from './policy-holder-update.component';
import { PolicyHolderDeleteDialogComponent } from './policy-holder-delete-dialog.component';
import { policyHolderRoute } from './policy-holder.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild(policyHolderRoute)],
  declarations: [PolicyHolderComponent, PolicyHolderDetailComponent, PolicyHolderUpdateComponent, PolicyHolderDeleteDialogComponent],
  entryComponents: [PolicyHolderDeleteDialogComponent]
})
export class InsuranceClaimMicroservicePolicyHolderModule {}
