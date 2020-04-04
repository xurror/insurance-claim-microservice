import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IQuote } from 'app/shared/model/quote.model';

type EntityResponseType = HttpResponse<IQuote>;
type EntityArrayResponseType = HttpResponse<IQuote[]>;

@Injectable({ providedIn: 'root' })
export class QuoteService {
  public resourceUrl = SERVER_API_URL + 'api/quotes';

  constructor(protected http: HttpClient) {}

  create(quote: IQuote): Observable<EntityResponseType> {
    return this.http.post<IQuote>(this.resourceUrl, quote, { observe: 'response' });
  }

  update(quote: IQuote): Observable<EntityResponseType> {
    return this.http.put<IQuote>(this.resourceUrl, quote, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuote>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuote[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
