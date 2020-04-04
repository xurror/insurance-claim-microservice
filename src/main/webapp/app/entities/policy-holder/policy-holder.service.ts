import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPolicyHolder } from 'app/shared/model/policy-holder.model';

type EntityResponseType = HttpResponse<IPolicyHolder>;
type EntityArrayResponseType = HttpResponse<IPolicyHolder[]>;

@Injectable({ providedIn: 'root' })
export class PolicyHolderService {
  public resourceUrl = SERVER_API_URL + 'api/policy-holders';

  constructor(protected http: HttpClient) {}

  create(policyHolder: IPolicyHolder): Observable<EntityResponseType> {
    return this.http.post<IPolicyHolder>(this.resourceUrl, policyHolder, { observe: 'response' });
  }

  update(policyHolder: IPolicyHolder): Observable<EntityResponseType> {
    return this.http.put<IPolicyHolder>(this.resourceUrl, policyHolder, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPolicyHolder>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPolicyHolder[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
