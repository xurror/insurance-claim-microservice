import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { ClaimComponent } from 'app/entities/claim/claim.component';
import { ClaimService } from 'app/entities/claim/claim.service';
import { Claim } from 'app/shared/model/claim.model';

describe('Component Tests', () => {
  describe('Claim Management Component', () => {
    let comp: ClaimComponent;
    let fixture: ComponentFixture<ClaimComponent>;
    let service: ClaimService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [ClaimComponent]
      })
        .overrideTemplate(ClaimComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClaimComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClaimService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Claim(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.claims && comp.claims[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
