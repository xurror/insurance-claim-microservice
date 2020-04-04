import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PaymentScheduleDetailComponent } from 'app/entities/payment-schedule/payment-schedule-detail.component';
import { PaymentSchedule } from 'app/shared/model/payment-schedule.model';

describe('Component Tests', () => {
  describe('PaymentSchedule Management Detail Component', () => {
    let comp: PaymentScheduleDetailComponent;
    let fixture: ComponentFixture<PaymentScheduleDetailComponent>;
    const route = ({ data: of({ paymentSchedule: new PaymentSchedule(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PaymentScheduleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PaymentScheduleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentScheduleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paymentSchedule on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paymentSchedule).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
