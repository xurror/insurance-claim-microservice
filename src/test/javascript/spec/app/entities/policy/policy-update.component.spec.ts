import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyUpdateComponent } from 'app/entities/policy/policy-update.component';
import { PolicyService } from 'app/entities/policy/policy.service';
import { Policy } from 'app/shared/model/policy.model';

describe('Component Tests', () => {
  describe('Policy Management Update Component', () => {
    let comp: PolicyUpdateComponent;
    let fixture: ComponentFixture<PolicyUpdateComponent>;
    let service: PolicyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Policy(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Policy();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
