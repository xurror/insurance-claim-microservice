import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMTA } from 'app/shared/model/mta.model';

type EntityResponseType = HttpResponse<IMTA>;
type EntityArrayResponseType = HttpResponse<IMTA[]>;

@Injectable({ providedIn: 'root' })
export class MTAService {
  public resourceUrl = SERVER_API_URL + 'api/mtas';

  constructor(protected http: HttpClient) {}

  create(mTA: IMTA): Observable<EntityResponseType> {
    return this.http.post<IMTA>(this.resourceUrl, mTA, { observe: 'response' });
  }

  update(mTA: IMTA): Observable<EntityResponseType> {
    return this.http.put<IMTA>(this.resourceUrl, mTA, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMTA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMTA[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
