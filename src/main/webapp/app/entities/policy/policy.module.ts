import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { PolicyComponent } from './policy.component';
import { PolicyDetailComponent } from './policy-detail.component';
import { PolicyUpdateComponent } from './policy-update.component';
import { PolicyDeleteDialogComponent } from './policy-delete-dialog.component';
import { policyRoute } from './policy.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild(policyRoute)],
  declarations: [PolicyComponent, PolicyDetailComponent, PolicyUpdateComponent, PolicyDeleteDialogComponent],
  entryComponents: [PolicyDeleteDialogComponent]
})
export class InsuranceClaimMicroservicePolicyModule {}
