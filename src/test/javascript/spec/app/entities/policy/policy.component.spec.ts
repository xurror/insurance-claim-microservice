import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyComponent } from 'app/entities/policy/policy.component';
import { PolicyService } from 'app/entities/policy/policy.service';
import { Policy } from 'app/shared/model/policy.model';

describe('Component Tests', () => {
  describe('Policy Management Component', () => {
    let comp: PolicyComponent;
    let fixture: ComponentFixture<PolicyComponent>;
    let service: PolicyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyComponent]
      })
        .overrideTemplate(PolicyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Policy(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.policies && comp.policies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
