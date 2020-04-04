import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyDetailComponent } from 'app/entities/policy/policy-detail.component';
import { Policy } from 'app/shared/model/policy.model';

describe('Component Tests', () => {
  describe('Policy Management Detail Component', () => {
    let comp: PolicyDetailComponent;
    let fixture: ComponentFixture<PolicyDetailComponent>;
    const route = ({ data: of({ policy: new Policy(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load policy on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policy).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
