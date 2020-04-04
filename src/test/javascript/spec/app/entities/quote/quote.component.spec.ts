import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { QuoteComponent } from 'app/entities/quote/quote.component';
import { QuoteService } from 'app/entities/quote/quote.service';
import { Quote } from 'app/shared/model/quote.model';

describe('Component Tests', () => {
  describe('Quote Management Component', () => {
    let comp: QuoteComponent;
    let fixture: ComponentFixture<QuoteComponent>;
    let service: QuoteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [QuoteComponent]
      })
        .overrideTemplate(QuoteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(QuoteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(QuoteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Quote(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.quotes && comp.quotes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
