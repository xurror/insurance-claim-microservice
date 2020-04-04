import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { MTAComponent } from 'app/entities/mta/mta.component';
import { MTAService } from 'app/entities/mta/mta.service';
import { MTA } from 'app/shared/model/mta.model';

describe('Component Tests', () => {
  describe('MTA Management Component', () => {
    let comp: MTAComponent;
    let fixture: ComponentFixture<MTAComponent>;
    let service: MTAService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [MTAComponent]
      })
        .overrideTemplate(MTAComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MTAComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MTAService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MTA(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mTAS && comp.mTAS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
