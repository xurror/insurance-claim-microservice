import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPolicyHolder, PolicyHolder } from 'app/shared/model/policy-holder.model';
import { PolicyHolderService } from './policy-holder.service';
import { PolicyHolderComponent } from './policy-holder.component';
import { PolicyHolderDetailComponent } from './policy-holder-detail.component';
import { PolicyHolderUpdateComponent } from './policy-holder-update.component';

@Injectable({ providedIn: 'root' })
export class PolicyHolderResolve implements Resolve<IPolicyHolder> {
  constructor(private service: PolicyHolderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPolicyHolder> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((policyHolder: HttpResponse<PolicyHolder>) => {
          if (policyHolder.body) {
            return of(policyHolder.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PolicyHolder());
  }
}

export const policyHolderRoute: Routes = [
  {
    path: '',
    component: PolicyHolderComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policyHolder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyHolderDetailComponent,
    resolve: {
      policyHolder: PolicyHolderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policyHolder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyHolderUpdateComponent,
    resolve: {
      policyHolder: PolicyHolderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policyHolder.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyHolderUpdateComponent,
    resolve: {
      policyHolder: PolicyHolderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policyHolder.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
