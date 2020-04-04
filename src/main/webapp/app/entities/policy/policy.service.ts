import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPolicy } from 'app/shared/model/policy.model';

type EntityResponseType = HttpResponse<IPolicy>;
type EntityArrayResponseType = HttpResponse<IPolicy[]>;

@Injectable({ providedIn: 'root' })
export class PolicyService {
  public resourceUrl = SERVER_API_URL + 'api/policies';

  constructor(protected http: HttpClient) {}

  create(policy: IPolicy): Observable<EntityResponseType> {
    return this.http.post<IPolicy>(this.resourceUrl, policy, { observe: 'response' });
  }

  update(policy: IPolicy): Observable<EntityResponseType> {
    return this.http.put<IPolicy>(this.resourceUrl, policy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPolicy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPolicy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
