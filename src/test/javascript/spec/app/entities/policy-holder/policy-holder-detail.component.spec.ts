import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyHolderDetailComponent } from 'app/entities/policy-holder/policy-holder-detail.component';
import { PolicyHolder } from 'app/shared/model/policy-holder.model';

describe('Component Tests', () => {
  describe('PolicyHolder Management Detail Component', () => {
    let comp: PolicyHolderDetailComponent;
    let fixture: ComponentFixture<PolicyHolderDetailComponent>;
    const route = ({ data: of({ policyHolder: new PolicyHolder(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyHolderDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PolicyHolderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PolicyHolderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load policyHolder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.policyHolder).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
