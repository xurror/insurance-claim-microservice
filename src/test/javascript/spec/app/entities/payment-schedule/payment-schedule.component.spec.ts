import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PaymentScheduleComponent } from 'app/entities/payment-schedule/payment-schedule.component';
import { PaymentScheduleService } from 'app/entities/payment-schedule/payment-schedule.service';
import { PaymentSchedule } from 'app/shared/model/payment-schedule.model';

describe('Component Tests', () => {
  describe('PaymentSchedule Management Component', () => {
    let comp: PaymentScheduleComponent;
    let fixture: ComponentFixture<PaymentScheduleComponent>;
    let service: PaymentScheduleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PaymentScheduleComponent]
      })
        .overrideTemplate(PaymentScheduleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentScheduleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PaymentScheduleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PaymentSchedule(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.paymentSchedules && comp.paymentSchedules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
