import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { PolicyHolderUpdateComponent } from 'app/entities/policy-holder/policy-holder-update.component';
import { PolicyHolderService } from 'app/entities/policy-holder/policy-holder.service';
import { PolicyHolder } from 'app/shared/model/policy-holder.model';

describe('Component Tests', () => {
  describe('PolicyHolder Management Update Component', () => {
    let comp: PolicyHolderUpdateComponent;
    let fixture: ComponentFixture<PolicyHolderUpdateComponent>;
    let service: PolicyHolderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [PolicyHolderUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PolicyHolderUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PolicyHolderUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PolicyHolderService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PolicyHolder(123);
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
        const entity = new PolicyHolder();
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
