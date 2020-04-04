import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEndorsement, Endorsement } from 'app/shared/model/endorsement.model';
import { EndorsementService } from './endorsement.service';
import { EndorsementComponent } from './endorsement.component';
import { EndorsementDetailComponent } from './endorsement-detail.component';
import { EndorsementUpdateComponent } from './endorsement-update.component';

@Injectable({ providedIn: 'root' })
export class EndorsementResolve implements Resolve<IEndorsement> {
  constructor(private service: EndorsementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEndorsement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((endorsement: HttpResponse<Endorsement>) => {
          if (endorsement.body) {
            return of(endorsement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Endorsement());
  }
}

export const endorsementRoute: Routes = [
  {
    path: '',
    component: EndorsementComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.endorsement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EndorsementDetailComponent,
    resolve: {
      endorsement: EndorsementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.endorsement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EndorsementUpdateComponent,
    resolve: {
      endorsement: EndorsementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.endorsement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EndorsementUpdateComponent,
    resolve: {
      endorsement: EndorsementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.endorsement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
