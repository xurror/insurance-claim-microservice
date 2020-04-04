import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InsuranceClaimMicroserviceSharedModule } from 'app/shared/shared.module';

import { ConfigurationComponent } from './configuration.component';

import { configurationRoute } from './configuration.route';

@NgModule({
  imports: [InsuranceClaimMicroserviceSharedModule, RouterModule.forChild([configurationRoute])],
  declarations: [ConfigurationComponent]
})
export class ConfigurationModule {}
