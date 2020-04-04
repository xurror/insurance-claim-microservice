import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class InsuranceClaimMicroserviceHomeModule {}
