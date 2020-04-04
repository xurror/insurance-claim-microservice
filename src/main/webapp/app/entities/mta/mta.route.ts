import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMTA, MTA } from 'app/shared/model/mta.model';
import { MTAService } from './mta.service';
import { MTAComponent } from './mta.component';
import { MTADetailComponent } from './mta-detail.component';
import { MTAUpdateComponent } from './mta-update.component';

@Injectable({ providedIn: 'root' })
export class MTAResolve implements Resolve<IMTA> {
  constructor(private service: MTAService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMTA> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((mTA: HttpResponse<MTA>) => {
          if (mTA.body) {
            return of(mTA.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MTA());
  }
}

export const mTARoute: Routes = [
  {
    path: '',
    component: MTAComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.mTA.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MTADetailComponent,
    resolve: {
      mTA: MTAResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.mTA.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MTAUpdateComponent,
    resolve: {
      mTA: MTAResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.mTA.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MTAUpdateComponent,
    resolve: {
      mTA: MTAResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'insuranceClaimMicroserviceApp.mTA.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
