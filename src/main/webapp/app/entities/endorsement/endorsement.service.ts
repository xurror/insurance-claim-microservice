import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEndorsement } from 'app/shared/model/endorsement.model';

type EntityResponseType = HttpResponse<IEndorsement>;
type EntityArrayResponseType = HttpResponse<IEndorsement[]>;

@Injectable({ providedIn: 'root' })
export class EndorsementService {
  public resourceUrl = SERVER_API_URL + 'api/endorsements';

  constructor(protected http: HttpClient) {}

  create(endorsement: IEndorsement): Observable<EntityResponseType> {
    return this.http.post<IEndorsement>(this.resourceUrl, endorsement, { observe: 'response' });
  }

  update(endorsement: IEndorsement): Observable<EntityResponseType> {
    return this.http.put<IEndorsement>(this.resourceUrl, endorsement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEndorsement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEndorsement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
