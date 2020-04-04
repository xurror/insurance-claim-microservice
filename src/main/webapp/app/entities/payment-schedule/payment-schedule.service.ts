import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPaymentSchedule } from 'app/shared/model/payment-schedule.model';

type EntityResponseType = HttpResponse<IPaymentSchedule>;
type EntityArrayResponseType = HttpResponse<IPaymentSchedule[]>;

@Injectable({ providedIn: 'root' })
export class PaymentScheduleService {
  public resourceUrl = SERVER_API_URL + 'api/payment-schedules';

  constructor(protected http: HttpClient) {}

  create(paymentSchedule: IPaymentSchedule): Observable<EntityResponseType> {
    return this.http.post<IPaymentSchedule>(this.resourceUrl, paymentSchedule, { observe: 'response' });
  }

  update(paymentSchedule: IPaymentSchedule): Observable<EntityResponseType> {
    return this.http.put<IPaymentSchedule>(this.resourceUrl, paymentSchedule, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPaymentSchedule>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPaymentSchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
