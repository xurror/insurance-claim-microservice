import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPolicy, Policy } from 'app/shared/model/policy.model';
import { PolicyService } from './policy.service';
import { PolicyComponent } from './policy.component';
import { PolicyDetailComponent } from './policy-detail.component';
import { PolicyUpdateComponent } from './policy-update.component';

@Injectable({ providedIn: 'root' })
export class PolicyResolve implements Resolve<IPolicy> {
  constructor(private service: PolicyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPolicy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((policy: HttpResponse<Policy>) => {
          if (policy.body) {
            return of(policy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Policy());
  }
}

export const policyRoute: Routes = [
  {
    path: '',
    component: PolicyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PolicyDetailComponent,
    resolve: {
      policy: PolicyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PolicyUpdateComponent,
    resolve: {
      policy: PolicyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PolicyUpdateComponent,
    resolve: {
      policy: PolicyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.policy.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
