import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { InsuranceClaimMicroserviceTestModule } from '../../../test.module';
import { EndorsementUpdateComponent } from 'app/entities/endorsement/endorsement-update.component';
import { EndorsementService } from 'app/entities/endorsement/endorsement.service';
import { Endorsement } from 'app/shared/model/endorsement.model';

describe('Component Tests', () => {
  describe('Endorsement Management Update Component', () => {
    let comp: EndorsementUpdateComponent;
    let fixture: ComponentFixture<EndorsementUpdateComponent>;
    let service: EndorsementService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [InsuranceClaimMicroserviceTestModule],
        declarations: [EndorsementUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EndorsementUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EndorsementUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EndorsementService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Endorsement(123);
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
        const entity = new Endorsement();
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
