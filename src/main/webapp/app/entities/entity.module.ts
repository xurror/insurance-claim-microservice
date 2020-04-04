import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        loadChildren: () => import('./customer/customer.module').then(m => m.InsuranceClaimMicroserviceCustomerModule)
      },
      {
        path: 'address',
        loadChildren: () => import('./address/address.module').then(m => m.InsuranceClaimMicroserviceAddressModule)
      },
      {
        path: 'claim',
        loadChildren: () => import('./claim/claim.module').then(m => m.InsuranceClaimMicroserviceClaimModule)
      },
      {
        path: 'payment-schedule',
        loadChildren: () =>
          import('./payment-schedule/payment-schedule.module').then(m => m.InsuranceClaimMicroservicePaymentScheduleModule)
      },
      {
        path: 'quote',
        loadChildren: () => import('./quote/quote.module').then(m => m.InsuranceClaimMicroserviceQuoteModule)
      },
      {
        path: 'mta',
        loadChildren: () => import('./mta/mta.module').then(m => m.InsuranceClaimMicroserviceMTAModule)
      },
      {
        path: 'policy',
        loadChildren: () => import('./policy/policy.module').then(m => m.InsuranceClaimMicroservicePolicyModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.InsuranceClaimMicroserviceProductModule)
      },
      {
        path: 'endorsement',
        loadChildren: () => import('./endorsement/endorsement.module').then(m => m.InsuranceClaimMicroserviceEndorsementModule)
      },
      {
        path: 'document',
        loadChildren: () => import('./document/document.module').then(m => m.InsuranceClaimMicroserviceDocumentModule)
      },
      {
        path: 'policy-holder',
        loadChildren: () => import('./policy-holder/policy-holder.module').then(m => m.InsuranceClaimMicroservicePolicyHolderModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class InsuranceClaimMicroserviceEntityModule {}
