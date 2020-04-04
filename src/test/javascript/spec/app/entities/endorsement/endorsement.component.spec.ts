import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { EndorsementComponent } from 'app/entities/endorsement/endorsement.component';
import { EndorsementService } from 'app/entities/endorsement/endorsement.service';
import { Endorsement } from 'app/shared/model/endorsement.model';

describe('Component Tests', () => {
  describe('Endorsement Management Component', () => {
    let comp: EndorsementComponent;
    let fixture: ComponentFixture<EndorsementComponent>;
    let service: EndorsementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [EndorsementComponent]
      })
        .overrideTemplate(EndorsementComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EndorsementComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EndorsementService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Endorsement(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.endorsements && comp.endorsements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
