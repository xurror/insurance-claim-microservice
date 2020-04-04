import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyHolderComponent } from 'app/entities/policy-holder/policy-holder.component';
import { PolicyHolderService } from 'app/entities/policy-holder/policy-holder.service';
import { PolicyHolder } from 'app/shared/model/policy-holder.model';

describe('Component Tests', () => {
  describe('PolicyHolder Management Component', () => {
    let comp: PolicyHolderComponent;
    let fixture: ComponentFixture<PolicyHolderComponent>;
    let service: PolicyHolderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyHolderComponent]
      })
        .overrideTemplate(PolicyHolderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyHolderComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyHolderService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PolicyHolder(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.policyHolders && comp.policyHolders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
